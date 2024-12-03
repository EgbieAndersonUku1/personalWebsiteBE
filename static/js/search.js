import repositories          from "./repositories.js";
import { showSpinner }       from "./utils/toggler.js";
import ProjectPaginator      from "./utils/paginator.js";
import { handleButtonInteraction, displayResults } from "./utils/buttonHandler.js";


const buttonsDivElement    = document.querySelector(".sidebar-btns");
const cardsContainer       = document.querySelector("#project-sidebar .container .cards");
const loadResultBtn        = document.querySelector(".load-results-btn");
const loadMoreBtnElement   = document.querySelector(".load-more-btn");
const notFoundElement      = document.querySelector(".not-found");
const resetBtnElement      = document.querySelector(".reset-btn");
const searchForm           = document.getElementById("search-form");
const spinner              = document.querySelector(".spinner");

console.log(searchForm);
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

 
    const buttonLabel = "Load";

    // Get form data
    const formData = new FormData(searchForm);
    
    // Extract form data
    const keywords = formData.get("keywords").split(",");
    const fromDate = formData.get("from-date");
    const toDate   = formData.get("to-date");

    isDatesValid(fromDate, toDate);
    
    // Filter projects based on form data
    const name       = formData.get("name");
    const language   = formData.getAll("languages");
    const hasWebsite =  formData.get("has-website");
   
    const sortProjectBy  = formData.get("sortProjectsBy");
    const projectStatus  = formData.get("projectStatus");
    const perPage        = parseInt(formData.get("result-per-page"));
     
    loadResultBtn.textContent = buttonLabel;

    projectLoader.setProjectPerPage(perPage);
    // projectLoader.setProjectsRepo(projects);
    console.log(name);
    console.log(keywords);
    console.log(language);
    console.log(hasWebsite);
    console.log(sortProjectBy);
    console.log(projectStatus);
    console.log(perPage);
   
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

