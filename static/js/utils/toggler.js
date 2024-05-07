import isElementValid from "./validator.js";

/**
 * Represents a SidebarToggler that manages the state of a sidebar and its toggle button.
 * This class allows easy control over the visibility of a sidebar element and updates the 
 * toggle button text accordingly. It provides methods to set the sidebar element, toggle 
 * button element, and display messages for both open and close states of the sidebar.
 * 
 * CSS Requirement: Make sure you have a CSS class named "show" with the CSS instructions embedded 
 * how to handle the opening/closing of the sidebar.
 */
class SidebarToggler {

    /**
     * Creates an instance of SidebarToggler.
     */
    constructor() {
        this._sidebarElement      = null;
        this._toggleButtonElement = null;
        this._openButtonMsg       = "Close";
        this._closeButtonMsg      = "Open";
        this._isOpen              = false;
    }

    /**
     * Gets the current state of the sidebar.
     * @returns {boolean} True if the sidebar is open, false if it is closed.
     */
    get isOpen() {
        return this._isOpen;
    }
    
    /**
     * Sets the sidebar element to be controlled.
     * @param {HTMLElement} sidebarElement The sidebar element.
     */
    setSideBarElement(sidebarElement) {
        this._isValid(sidebarElement, "sidebarElement");
        this._sidebarElement = sidebarElement;
    }

    /**
     * Sets the toggle button element to toggle the sidebar visibility.
     * @param {HTMLElement} toggleButtonElement The toggle button element.
     */
    setToggleButtonElement(toggleButtonElement) {
        this._isValid(toggleButtonElement, "toggleButtonElement");
        this._toggleButtonElement = toggleButtonElement;
    }

    /**
     * Sets the display message for the toggle button when the sidebar is open.
     * @param {string} [msg="Close"] The message displayed on the toggle button when the sidebar is open.
     */
    setToggleButtonOpenDisplayMessage(msg = "Close") {
        this._openButtonMsg = msg;
    }

    /**
     * Sets the display message for the toggle button when the sidebar is closed.
     * @param {string} [msg="Open"] The message displayed on the toggle button when the sidebar is closed.
     */
    setToggleButtonCloseDisplayMessage(msg = "Open") {
        this._closeButtonMsg = msg;
    }

    /**
     * Toggles the visibility of the sidebar and updates the toggle button text accordingly.
     * For this to work, there must already be a CSS class named "show" to handle sidebar visibility.
     */
    toggleSidebar() {
        if (!this._isOpen) {
            this._sidebarElement.classList.add("show");
            this._toggleButtonElement.textContent = this._openButtonMsg;
        } else {
            this._sidebarElement.classList.remove("show");
            this._toggleButtonElement.textContent = this._closeButtonMsg;
        }
        this._isOpen = !this._isOpen;
    }

    /**
     * Validates whether an element is present.
     * @param {HTMLElement} element The element to validate.
     * @param {string} name The name of the element.
     * @private
     */
    _isValid(element, name) {
        if (!element) {
            throw new Error(`The ${name} element was not found!`);
        }
    }

    /**
     * Resets the sidebar state to closed.
     * This method sets the isOpen property to false, indicating that the sidebar is closed.
     */
    reset() {
        this._isOpen = false;
    }
}


/**
 * Displays a spinner element for a specified duration.
 * 
 * @param {HTMLElement} spinnerElement The spinner element to display.
 * @param {number} [duration=3000] The duration in milliseconds for which the spinner should be displayed. 
 * Default is 3000 milliseconds (3 seconds).
 * @throws {Error} If the spinner element is not a valid HTML element.
 */
function showSpinner(spinnerElement, duration=3000) {
    isElementValid(spinnerElement);
  
    spinnerElement.style.display = 'block';
    setTimeout(() => {
        spinnerElement.style.display = 'none';
    }, duration); 
}

  

export {
    showSpinner,
    SidebarToggler,
}