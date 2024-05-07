import { showSpinner } from "./toggler.js";

const cardsContainer     = document.querySelector("#project-sidebar .container");
const resultStringElement = document.querySelector(".result");


function handleButtonInteraction(buttonElement, spinnerElement, projectLoader, TIME_IN_MILLISECONDS) {

    const LOW_OPACITY  = 0.6;
    const HIGH_OPACITY = 1;
    const SCALE_DOWN   = 'scale(.98)';
    const SCALE_UP     = 'scale(1)';

    const ButtonAttributes = {
        COLLASPSE: "Collapse",
        LOAD: "Load",
        LOAD_MORE: "Load more",
    }

    buttonElement.style.transform = SCALE_DOWN;
    buttonElement.style.opacity = LOW_OPACITY;

    setTimeout(() => {
        buttonElement.style.transform = SCALE_UP;
        buttonElement.style.opacity = HIGH_OPACITY;
    }, TIME_IN_MILLISECONDS)

    showSpinner(spinnerElement, TIME_IN_MILLISECONDS);

    if (buttonElement.textContent === ButtonAttributes.COLLASPSE) {
        projectLoader.loadLess();
    } else {
        projectLoader.loadMore();
    }

    if (projectLoader.perPage === projectLoader.setDefaultPerPage) {
        buttonElement.textContent = ButtonAttributes.LOAD;
    } else if (projectLoader.areAllProjectsDisplayed()) {
        buttonElement.textContent = ButtonAttributes.COLLASPSE;
    } else {
        buttonElement.textContent = ButtonAttributes.LOAD_MORE;
    }

    setTimeout(() => {
        cardsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        projectLoader.showProjects();
        displayResults(projectLoader);
    }, TIME_IN_MILLISECONDS)
}


function displayResults(projectLoader) {
    resultStringElement.innerHTML = `<p class="result">Showing <span class="bold">${projectLoader.totalRepositoriesLoaded}</span> out of <span class="bold">${projectLoader.numOfRepositories}</span></p>`;


}
export {
    handleButtonInteraction,
    displayResults
}
