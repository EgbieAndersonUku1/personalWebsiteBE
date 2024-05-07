import repositories          from "../../repositories.js";
import { showSpinner }       from "./utils/toggler.js";
import ProjectPaginator      from "./utils/paginator.js";
import { handleButtonInteraction, displayResults } from "./utils/buttonHandler.js";


const buttonsDivElement    = document.querySelector(".sidebar-btns");
const cardsContainer       = document.querySelector("#project-sidebar .container .cards");
const loadResultBtn        = document.querySelector(".load-results-btn");
const loadMoreBtnElement   = document.querySelector(".load-more-btn");
const notFoundElement      = document.querySelector(".not-found");
const resetBtnElement      = document.querySelector(".reset-btn");
const searchForm           = document.querySelector(".search-form");
const spinner              = document.querySelector(".spinner");


const TIME_IN_MILLISECONDS = 1000;

// Initialise the classes
const projectLoader  = new ProjectPaginator();

// Add the eventListeners to their representive targets
loadResultBtn.addEventListener("click", handleLoadBtnClick);
resetBtnElement.addEventListener("click", handleResetBtn);
searchForm.addEventListener("submit", handleForm);



/**
 * Handles the click event on the load button.
 * @param {Event} e - The click event object.
 */
function handleLoadBtnClick(e) {
    e.preventDefault();
    handleButtonInteraction(loadResultBtn, spinner, projectLoader, TIME_IN_MILLISECONDS);
}



/**
 * Handles the click event on the reset button.
 * @param {Event} e - The click event object.
 */
function handleResetBtn() {
    showSpinner(spinner, TIME_IN_MILLISECONDS);
}


/**
 * Filters projects by name based on a search string.
 * @param {Array} projects - An array of project objects to filter.
 * @param {string} searchName - The search string to filter projects by name.
 * @returns {Array} - An array of filtered project objects.
 */
function filterProjectByName(projects, searchName) {
    if (!searchName) {
        return projects;
    }
    return projects.filter(project => project.name.toLowerCase().includes(searchName.toLowerCase()));
}


/**
 * Filters projects by selected languages.
 * @param {Array} projects - An array of project objects to filter.
 * @param {Array} selectedLanguages - An array of selected languages to filter projects by.
 * @returns {Array} - An array of filtered project objects.
 */
function filterProjectByLanguage(projects, selectedLanguages) {

    if (selectedLanguages.length === 0) {
        return projects
    }
    return projects.filter(project => {
        return selectedLanguages.some(language => {
            return language && project.languages.some(lang => lang.toLowerCase().includes(language.toLowerCase()));
        });
    });
}


/**
 * Filters projects based on the presence of a website.
 * @param {Array} projects - An array of project objects to filter.
 * @param {string} hasWebsite - A string indicating the presence of a website ("true", "false", or "both").
 * @returns {Array} - An array of filtered project objects.
 */
function filterProjectByWebsite(projects, hasWebsite) {
    if (hasWebsite.toLowerCase() === "both") {
        return projects.filter(project => project.hasWebsite === true || project.hasWebsite === false);
    } else {
        const hasWebsiteBoolean = hasWebsite === 'true';
        return projects.filter(project => project.hasWebsite === hasWebsiteBoolean);
    }
}


/**
 * Filters projects based on keywords/tags.
 * @param {Array} projects - An array of project objects to filter.
 * @param {Array} keywords - An array of keywords/tags to filter by.
 * @returns {Array} - An array of filtered project objects.
 * @throws {Error} - If keywords parameter is not an array.
 */
function filterByKeywords(projects, keywords) {
    const EMPTY_STRING = '';
 
    if (!(Array.isArray(keywords))) {
        throw new Error("The keywords must be a list");
    } else if (keywords[0] === EMPTY_STRING) {
        return projects;
    }

    return projects.filter(project => {
        return keywords.some(keyword => {
            return project.tags.some(tag => tag.toLowerCase().trim() === keyword.toLowerCase().trim())
        })
    })
}




/**
 * Filters projects based on date range.
 * @param {Array} projects - An array of project objects to filter.
 * @param {string} fromDate - The start date of the date range (in ISO 8601 format).
 * @param {string} toDate - The end date of the date range (in ISO 8601 format).
 * @returns {Array} - An array of filtered project objects.
 */
function filterProjectsByDate(projects, fromDate, toDate) {

    if (!(fromDate) || (!(toDate))) {
        return projects;
    }
    return projects.filter(project => {
        const projectDate = new Date(project.dateCreated);
        const startDate = new Date(fromDate); 
        const endDate = new Date(toDate); 
        return projectDate >= startDate && projectDate <= endDate;
    });
}


/**
 * Sorts projects based on date.
 * @param {Array} projects - An array of project objects to sort.
 * @param {string} sortProjectBy - The sorting order. Must be either "latest" or "oldest".
 * @returns {Array} - An array of sorted project objects.
 * @throws {Error} - If an invalid sorting order is provided.
 */
function sortProjectByDate(projects, sortProjectBy) {

    const sortOrder = {
        LATEST : "latest",
        OLDEST : "oldest",
    }
    const lowerCaseSortProjectBy = sortProjectBy.toLowerCase();
    
    if (lowerCaseSortProjectBy === sortOrder.LATEST) {
        return sortByDateLatestToOldest(projects);
    } else if (lowerCaseSortProjectBy === sortOrder.OLDEST) {
        return sortByDateOldestToLatest(projects);
    } else {
        throw new Error("Invalid sort order. Please provide 'latest' or 'oldest'.");
    }
}



/**
 * Sorts an array of projects from latest to oldest based on date.
 * @param {Array} projects - An array of project objects to sort.
 * @returns {Array} - An array of sorted project objects from latest to oldest date.
 */
function sortByDateLatestToOldest(projects) {
    return projects.slice().sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
}

/**
 * Sorts an array of projects from oldest to latest based on date.
 * @param {Array} projects - An array of project objects to sort.
 * @returns {Array} - An array of sorted project objects from oldest to latest date.
 */
function sortByDateOldestToLatest(projects) {
    return projects.slice().sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
}



/**
 * Filters an array of projects based on their status.
 * @param {Array} projects - An array of project objects to filter.
 * @param {string} status - The status to filter projects by.
 * @returns {Array} - An array of projects filtered by the specified status.
 */
function filterByProjectStatus(projects, status) {
    const STATUS = "status";
    if (status === STATUS) {
        return projects;
    }
    return projects.filter((project) => {
        return project.projectStatus && project.projectStatus.toLowerCase() === status.toLowerCase()
    });
}



/**
 * Checks if the provided dates are valid.
 * @param {Date} fromDate - The start date.
 * @param {Date} toDate - The end date.
 * @returns {boolean} - True if the dates are valid, false otherwise.
 */
function isDatesValid(fromDate, toDate) {
    if (fromDate > toDate) {
        alert("The from date cannot be greater to the date")
    } else if (!(fromDate) && toDate) {
        alert("The from date cannot be empty if the to date is selected")
    } else if (!(toDate) && fromDate) {
        alert("The to date cannot be empty if the from date is selected")
    }
}


/**
 * Handles form submission for filtering and displaying projects.
 * @param {Event} e - The form submission event.
 */
function handleForm(e) {
    e.preventDefault();

    // Copy the repositories array
    let projects = [...repositories];
   
    const buttonLabel = "Load";

    // Get form data
    const formData = new FormData(searchForm);
    
    // Extract form data
    const keywords = formData.get("keywords").split(",");
    const fromDate = formData.get("from-date");
    const toDate   = formData.get("to-date");

    
    isDatesValid(fromDate, toDate);
    
    // Filter projects based on form data
    projects = filterProjectByName(projects, formData.get("name"));
    projects = filterProjectByLanguage(projects, formData.getAll("languages"));
    projects = filterProjectByWebsite(projects, formData.get("has-website"));
    projects = filterByKeywords(projects, keywords)
    projects = filterProjectsByDate(projects, fromDate, toDate); 
    projects = sortProjectByDate(projects, formData.get("sortProjectsBy"));
    projects = filterByProjectStatus(projects, formData.get("projectStatus"));
     
    loadResultBtn.textContent = buttonLabel;

    projectLoader.setProjectPerPage(parseInt(formData.get("result-per-page")));
    projectLoader.setProjectsRepo(projects);

   
    displayProjects(projects);
}


/**
 * Displays the projects on the page and handles UI updates based on the provided project data.
 * @param {Array} projects - The array of projects to be displayed.
 */
function displayProjects(projects) {
    const TIME_IN_MILLISECONDS = 2000;

    showSpinner(spinner, TIME_IN_MILLISECONDS);
    
    // Clear previous content before adding any new one
    cardsContainer.innerHTML = "";

    if (projects.length > 0) {
 
        projectLoader.showProjects();
        displayResults(projectLoader);
        displayLoadResultBtn();
        toggleNotFoundImage(false);
    } else {
        toggleNotFoundImage(true);
        projectLoader.reset();
        displayResults(projectLoader);
    }
}


/**
 * Displays the load result button and hides the load more button.
 */
function displayLoadResultBtn() {
    loadResultBtn.style.display = "block";
    loadMoreBtnElement.style.display = "none";
}


/**
 * Toggles the visibility of the not found image based on the provided boolean value.
 * @param {boolean} show - Indicates whether to show (true) or hide (false) the not found image.
 */
function toggleNotFoundImage(show) {
    switch (show) {
        case true:
            notFoundElement.style.display = "flex";
            buttonsDivElement.style.display = "none";
            break;
        case false:
            notFoundElement.style.display = "none";
            buttonsDivElement.style.display = "flex";
            break;
    }
}

