// Just for testing.
// TODO: REMOVE
// localStorage.clear();

// ====================================================
// Constants
// ====================================================
// This one is pretty simple, it's just the name of the
// localStorage key that holds the quiz hashTable.
import * as constants from "./constants.js";

// Set the base structure if one doesn't exist already.
// Important, because if the localStorage is initially empty
// Or the user clears cache, etc, it's gonna need a base structure.
if (! localStorage.getItem(constants.LOCAL_STORAGE_QUIZZES_KEY)) {
    localStorage.setItem(constants.LOCAL_STORAGE_QUIZZES_KEY, JSON.stringify({}))
}


// Open quiz and edit the main content to reflect page changes.
const openQuiz = (uuid) => {
    // Hide the current splash screen.
    const splashScreen = constants.SPLASH_SCREEN;
    splashScreen.style.display = "none";

    // Fetch the quiz from the local storage.
    const quiz = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_QUIZZES_KEY))[uuid];

    // Create new div that will replace the splash screen.
    // REMINDER TO SELF: REMEMBER THIS VAR NAME!
    console.log(constants.QUIZ_PAGE);
    quizPage.style.display = "block";

    constants.QUIZ_PAGE.querySelector("#quiz-page-name").innerText = quiz["name"];
    constants.QUIZ_PAGE.querySelector("#quiz-page-questions").innerText = "questions here."

    console.log(quiz);
}


// Wrapper around openQuiz, so that openQuiz can be called from the code, and
// openQuizEvent can get the uuid and pass it to openquiz, so it doesn't get angry.
const openQuizEvent = (event) => {
    openQuiz(event.target.getAttribute("uuid"));
}

// Method that adds new quizzes to the quiz list.
// Just a little fake event listener that gets called 
// after the form is submitted.
const appendToQuizList = (uuid) => {
    // The quiz sidebar.
    const domSidebar = constants.QUIZ_LIST;

    // Local storage JSON stuff.
    // ^ lol, this is the most unhelpful comment ever.
    //
    // Let me explain what it does.
    // Gets the quizData localStorageKey (made it a param because I
    // might change key name in localStorage later).
    // Then, it parses the JSON string into an object.
    const quizData = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_QUIZZES_KEY))[uuid];


    /* Create new quiz "thing," I'm really unsure what to call this,
    but I know that it will appear in the sidebar, and that the user should
    be able to click it, *BUT* I don't want to make it a button, because
    I would have to remove the styles and stuff.
    For now, I'll just do a paragraph with an onclick 

    TLDR: JUST ADDING THE QUIZ TO THE SIDEBAR FOR THE USER TO SEE.
        */

    const newSelector = document.createElement("li");
    
    // Add properties that will passed onclick.
    newSelector.setAttribute("uuid", uuid);

    // Set the text.
    newSelector.textContent = quizData["name"];

    // Add an event listener.
    newSelector.addEventListener("click", openQuizEvent);

    // Finally append it.
    domSidebar.append(newSelector);
}



// Get the element.
const newQuizForm = constants.NEW_QUIZ_FORM;

// Listen to the form.
newQuizForm.addEventListener("submit", (event) => {
    // Prevent it from submitting to the server.
    event.preventDefault();

    // Get the fields from the form.
    let name = newQuizForm.elements["name"].value;

    // If the name is empty.
    // Wait, OMG CTA-MODAL already handles this.
    //
    // if (! name.trim()) {
    // alert("Name cannot be empty!");
    // }

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

    appendToQuizList(uuid);

    constants.NEW_QUIZ_MODAL.setAttribute("active", "false");
    openQuiz(uuid);
});


const backToHome = () => {
    constants.QUIZ_PAGE.style.display = "none";
    constants.SPLASH_SCREEN.style.display = "";
}

// Load the quizzes into the list element.
const loadQuizzes = () => {
    const quizzes = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_QUIZZES_KEY));

    for (const uuid in quizzes) {
        console.log(`uuid: ${uuid}`)
        appendToQuizList(uuid);
    }
}

const clearQuizzes = () => {
    localStorage.removeItem(constants.LOCAL_STORAGE_QUIZZES_KEY);

    for (const item in constants.QUIZ_LIST.children) {
        console.log(item);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadQuizzes();
});
