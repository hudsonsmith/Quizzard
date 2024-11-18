import * as constants from "./constants.js";
import {loadQuizzes} from "./quizCreationWorkflow.js";

// Open quiz and edit the main content to reflect page changes.
export const openQuiz = (uuid) => {
    // Hide the current splash screen.
    const splashScreen = constants.SPLASH_SCREEN;
    splashScreen.style.display = "none";

    // Fetch the quiz from the local storage.
    const quiz = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_QUIZZES_KEY))[uuid];

    // Create new div that will replace the splash screen.
    // REMINDER TO SELF: REMEMBER THIS VAR NAME!
    console.log(constants.QUIZ_PAGE);
    constants.QUIZ_PAGE.style.display = "block";

    constants.QUIZ_PAGE.querySelector("#quiz-page-name").innerText = quiz["name"];
    constants.QUIZ_PAGE.querySelector("#quiz-page-questions").innerText = "questions here."
    constants.QUIZ_PAGE.setAttribute("data-current-quiz-uuid", uuid);

    console.log(quiz);
}


// Wrapper around openQuiz, so that openQuiz can be called from the code, and
// openQuizEvent can get the uuid and pass it to openquiz, so it doesn't get angry.
export const openQuizEvent = (event) => {
    openQuiz(event.target.getAttribute("uuid"));
}

export const backToHome = () => {
    constants.QUIZ_PAGE.style.display = "none";
    constants.SPLASH_SCREEN.style.display = "";
}

export const deleteQuiz = (event) => {
    event.preventDefault();
    constants.DELETE_QUIZ_MODAL.setAttribute("active", "false");

    let data = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_QUIZZES_KEY));

    const current_uuid = constants.QUIZ_PAGE.getAttribute("data-current-quiz-uuid");
    delete data[current_uuid];

    localStorage.setItem(constants.LOCAL_STORAGE_QUIZZES_KEY, JSON.stringify(data));
    loadQuizzes();
    backToHome();
}
