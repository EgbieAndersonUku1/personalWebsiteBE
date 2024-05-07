const questions = [...document.querySelectorAll("section .questions .question")];



// Add click event listeners to each question element
questions.forEach((question) => {
    question.addEventListener("click", () => {
        const answer = question.querySelector(".answer-container");
        const imgCaret = question.querySelector("img");

        // Scroll to bring the clicked question into view
        question.scrollIntoView({ behavior: 'smooth' });

        toggleAnswer(answer, imgCaret);
    });
});


/**
 * Toggles the visibility of the answer and updates the caret image accordingly.
 * @param {HTMLElement} answer - The answer element to toggle.
 * @param {HTMLImageElement} imgCaret - The caret image element to update.
 */
function toggleAnswer(answer, imgCaret) {
    if (answer.style.display === "block") {
        answer.style.display = "none";
        imgCaret.src = "static/img/icons/svg/caret-right.svg";
        imgCaret.alt = "The caret is open";
    } else {
        answer.style.display = "block";
        imgCaret.src = "static/img/icons/svg/caret-down.svg";
        imgCaret.alt = "The caret is closed";
    }
}



