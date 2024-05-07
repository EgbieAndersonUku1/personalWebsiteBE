import { getRepositories } from "../buildProjectCards.js";


/**
 * Class representing a loader for displaying projects per page.
 * @class ProjectPaginator
 */
class ProjectPaginator {
    /**
     * Constructor for ProjectPaginator class.
     * @param {number} perPage - Number of projects to display per page.
     */
    constructor(perPage=5, defaultPerPage=5) {
        this.setDefaultPerPage              = defaultPerPage;
        this.perPage                        = perPage; 
        this._totalNumOfRepositories        = 0;   
        this._totalNumOfRepositoriesLoaded  = 0;   
    }

    /**
     * The total number of repositories/projects
     */
    get numOfRepositories() {
        return this._totalNumOfRepositories;
    }

    /**
     * Get the total number of repositories loaded by the user so far.
     * This count is updated each time the user interacts with the "load more" button
     * on the frontend to load additional repositories.
     * @returns {number} The total number of repositories loaded.
     */
    get totalRepositoriesLoaded() {
        return this._totalNumOfRepositoriesLoaded;
    }

    /**
     * Reset the counters for the total number of repositories and loaded repositories.
     * This method sets both counters to zero, indicating that no repositories have been loaded.
     */
    reset() {
        this._totalNumOfRepositories       = 0;
        this._totalNumOfRepositoriesLoaded = 0;
    }

    /**
     * Set the projects to be displayed.
     * @param {Array} projects - Array of projects to be displayed.
     */
    setProjectsRepo(projects) {

        if (!(Array.isArray(projects))) {
            throw new Error("The projects must be a list");
        }
        this.projects               = projects;
        this._totalNumOfRepositories =  this.projects.length;
    }

    /**
     * Set the number of projects to display per page.
     * @param {number} perPage - The number of projects to display per page.
     */
    setProjectPerPage(perPage) {
        this.perPage = perPage;
    }
 
    /**
     * Set the default number of projects to display per page.
     * @param {number} defaultPerPage - The default number of projects per page.
     */
    setDefaultProjectPerPage(defaultPerPage) {
        this.setDefaultPerPage = defaultPerPage;
    }

    /**
     * Display the projects based on the current number per page.
     * This method retrieves the required number of repositories to be displayed,
     * updates the total number of repositories loaded, and invokes the function
     * to fetch and display the repositories on the frontend.
     */
    showProjects() {
        const numOfRepositories = this.projects.slice(0, this.perPage);
        this._totalNumOfRepositoriesLoaded = numOfRepositories.length;
        getRepositories(numOfRepositories);
    }


    /**
     * Increase the number of projects to display per page.
     * This method increments the current number of projects per page
     * by the existing value of perPage, effectively doubling the number
     * of projects to be displayed.
     */
    loadMore() {
        this.perPage += this.perPage;
    }


    /**
     * Reset the number of projects to display per page to the default value.
     * This method sets the number of projects per page back to the default value
     * specified when the `ProjectPaginator` instance was created.
     */
    loadLess() {
        this.perPage = this.setDefaultPerPage;
    }

    /**
     * Check if all projects have been displayed.
     * @returns {boolean} True if all projects are displayed, false otherwise.
     * This method determines whether all projects in the list have been displayed based on the current
     * number of projects per page and the total number of projects available.
    */
    areAllProjectsDisplayed() {
        return this.perPage >= this.projects.length;
    }

}


export default ProjectPaginator;
