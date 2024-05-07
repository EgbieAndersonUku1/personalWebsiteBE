const cardsContainer  = document.querySelector("#project-sidebar .container .cards");


/**
 * Renders git repository cards based on the provided repository data.
 * 
 * @param {Array} repositories An array containing data of git repositories to be rendered as cards.
 */
function getRepositories(repositories) {
    createGitCardsElement(repositories);
}


/**
 * Creates and renders git repository cards based on the provided repository data.
 * 
 * @param {Array} repositories An array containing data of git repositories to be 
 * rendered as cards.
 */
function createGitCardsElement(repositories) {

    // Create a document fragment to improve performance when appending multiple elements
    const fragment = document.createDocumentFragment();
  
    repositories.forEach((repository) => {
        const card = createCardStructure(repository);
        fragment.appendChild(card);
    });
   
    // Create an H2 element for displaying a title above the cards
    const cardH1Tag       = document.createElement("h2");
    cardH1Tag.textContent = "Projects";
    cardH1Tag.classList.add("center", "padding-top-lg");
   

    cardsContainer.appendChild(cardH1Tag);
    cardsContainer.appendChild(fragment);
}


/**
 * Creates the structure of a card element for the provided repository data.
 * 
 * @param {Object} repository An object containing data of a git repository.
 * @returns {HTMLElement} The card element structure representing the repository.
 */
function createCardStructure(repository) {
    // Clear existing content in the cards container
    cardsContainer.innerHTML = "";

    // Create the main card element and its components
    const card   = document.createElement("div");
    const body   = document.createElement("div");
    const footer = document.createElement("div");

    // Create header, body header, footer header, and body footer components
    const cardHead         = createCardHeader(repository);
    const cardBodyHeader   = createCardBodyHeader(repository);
    const cardFooterHeader = createCardFooterHeader(repository);
    const cardFooterBody   = createCardBodyFooter(repository);

   
    card.className = "card";

    // Append header, body, and footer components to the card
    card.appendChild(cardHead);
    body.appendChild(cardBodyHeader);
    footer.appendChild(cardFooterHeader);
    footer.appendChild(cardFooterBody);
    body.appendChild(footer);
    card.appendChild(body);

    return card;
}


/**
 * Creates the header component of a card element for the provided repository data.
 * 
 * @param {Object} repository An object containing data of a git repository.
 * @returns {HTMLElement} The header component representing the repository image.
 */
function createCardHeader(repository) {
    // Create the header element and the image element
    const head = document.createElement("div");
    const img  = document.createElement("img");

    head.className = "head";

    // Set attributes for the image element
    img.alt = "The image for the repository";
    img.src = repository.image;

    head.appendChild(img);

    return head;
}


/**
 * Creates the body header component of a card element for the provided repository data.
 * 
 * @param {Object} repository An object containing data of a git repository.
 * @returns {HTMLElement} The body header component representing the repository name and description.
 */
function createCardBodyHeader(repository) {

    // Create the header element, heading element, and paragraph element
    const head  = document.createElement("div");
    const h1    = document.createElement("h1");
    const pTag  = document.createElement("p");

    // Set class names for the elements
    head.className = "about-project";
    h1.className   = "padding-bottom-xsm";

    // Fill in the attributes from the repository data
    h1.textContent   = repository.name;
    pTag.textContent = repository.description;

    head.appendChild(h1);
    head.appendChild(pTag);

    return head;
}


/**
 * Creates the footer header component of a card element for the provided repository data.
 * 
 * @param {Object} repository An object containing data of a git repository.
 * @returns {HTMLElement} The footer header component representing the technologies used 
 * in the repository.
 */
function createCardFooterHeader(repository) {

    // Create a document fragment to improve performance when appending multiple elements
    const fragment = document.createDocumentFragment();

    // Create the header div, heading element, and unordered list element
    const headDiv = document.createElement("div");
    const h1      = document.createElement("h1");
    const ul      = document.createElement("ul");

    // Set class names for the elements
    headDiv.className = "head";
    h1.className      = "padding-top-xsm";
    h1.textContent    = "Technologies Used";
    ul.className      = "ul-technologies";

    repository.languages.forEach((language) => {
        const li = document.createElement("li");
        li.textContent = language;
        fragment.appendChild(li);
    });

   
    ul.appendChild(fragment);

    headDiv.appendChild(h1);
    headDiv.appendChild(ul);

    return headDiv;
}


/**
 * Creates the footer body component of a card element for the provided repository data.
 * 
 * @param {Object} repository An object containing data of a git repository.
 * @returns {HTMLElement} The footer body component representing the actions related to the repository.
 */
function createCardBodyFooter(repository) {

    // Create the body div and buttons div elements
    const bodyDiv        = document.createElement("div");
    const buttonsDiv     = document.createElement("div");
    buttonsDiv.className = "buttons";

    // Create the heading element for the body
    const h1       = document.createElement("h1");
    h1.className   = "padding-top-xsm";
    h1.textContent = "View";

    // Create the anchor tag for viewing the GitHub code
    const gitRepoAnchorTag       = document.createElement("a");
    gitRepoAnchorTag.textContent = "View Github code";
    gitRepoAnchorTag.href        = repository.gitLink;
    gitRepoAnchorTag.target      = "_blank";
    gitRepoAnchorTag.rel         = "noopener noreferrer";

    gitRepoAnchorTag.classList.add("button-md", "view-repo", "green-bg", "color-white", "card-btn");
  
    // Append the heading to the body div
    bodyDiv.appendChild(h1);
   
    // Append the GitHub anchor tag to the buttons div
    buttonsDiv.appendChild(gitRepoAnchorTag);

    const visitSiteAnchorTag = createWebsiteAnchorTag(repository);
    buttonsDiv.appendChild(visitSiteAnchorTag);

    // Append the buttons div to the body div
    bodyDiv.appendChild(buttonsDiv);

    return bodyDiv;
}

/**
 * Creates an anchor tag for the repository's website, if available.
 * 
 * @param {Object} repository An object containing data of a git repository.
 * @returns {HTMLAnchorElement} The anchor tag for visiting the repository's website.
 */
function createWebsiteAnchorTag(repository) {

    const visitSiteAnchorTag  = document.createElement("a");
    visitSiteAnchorTag.target = "_blank";
    visitSiteAnchorTag.rel    = "noopener noreferrer";

    visitSiteAnchorTag.classList.add("button-md", "view-repo", "primary-color", 
                                     "color-white", "card-btn", "has-site");
  
    switch(true) {
        case repository.hasWebsite === true:
            visitSiteAnchorTag.href        = repository.websiteUrl;
            visitSiteAnchorTag.textContent = "Visit site";
            break;
        case repository.hasWebsite === false:
            visitSiteAnchorTag.textContent = "No website available";
            visitSiteAnchorTag.classList.add("red-bg", "no-site");
    }

    return visitSiteAnchorTag;
}

export {
    getRepositories,
}



