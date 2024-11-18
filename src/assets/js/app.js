// Just for testing.
// TODO: REMOVE
// localStorage.clear();


import * as constants from "./constants.js";
import * as pages from "./pages.js"
import * as quizzes from "./quizCreationWorkflow.js";

// Set the base structure if one doesn't exist already.
if (! localStorage.getItem(constants.LOCAL_STORAGE_QUIZZES_KEY)) {
    localStorage.setItem(constants.LOCAL_STORAGE_QUIZZES_KEY, JSON.stringify({}))
}


// Listen to the form.
constants.NEW_QUIZ_FORM.addEventListener("submit", (event) => {
    // Prevent it from submitting to the server.
    event.preventDefault();

    // Get the fields from the form.
    let name = constants.NEW_QUIZ_FORM.elements["name"].value;

    let quizData = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_QUIZZES_KEY));

    // Store the data in localstorage
    // Just test data for now.
    // Edit: During writing this, I decided that the keys should be uuids,
    // to avoid conflicts between naming quizzes.
    //
    //
    // `${uuid}`: {
    //   "name": `${quizName}`,
    //   "questions": ["hey"]
    // }
    const uuid = crypto.randomUUID();


    quizData[uuid] = {"name": name, "questions": ["hey"]};

    console.log(quizData);

    localStorage.setItem(constants.LOCAL_STORAGE_QUIZZES_KEY, JSON.stringify(quizData));

    quizzes.appendToQuizList(uuid);

    constants.NEW_QUIZ_MODAL.setAttribute("active", "false");
    pages.openQuiz(uuid);
});


// Button on the quiz layout page.
constants.BACK_TO_HOME_BUTTON.addEventListener("click", (event) => {
    pages.backToHome();
});


constants.DELETE_QUIZ_BUTTON.addEventListener("click", (event) => {
    constants.DELETE_QUIZ_MODAL.setAttribute("active", "true");
});


constants.DELETE_QUIZ_FORM.addEventListener("submit", pages.deleteQuiz);

document.addEventListener("DOMContentLoaded", () => {
    quizzes.loadQuizzes();
});

