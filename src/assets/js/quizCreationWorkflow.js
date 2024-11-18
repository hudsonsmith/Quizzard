import * as constants from "./constants.js";
import * as pages from "./pages.js";

// Method that adds new quizzes to the quiz list.
// Just a little fake event listener that gets called 
// after the form is submitted.
export const appendToQuizList = (uuid) => {
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
    newSelector.classList.add("button-85");
    
    // Add properties that will passed onclick.
    newSelector.setAttribute("uuid", uuid);

    // Set the text.
    newSelector.textContent = quizData["name"];

    // Add an event listener.
    newSelector.addEventListener("click", pages.openQuizEvent);

    // Finally append it.
    domSidebar.append(newSelector);
}


// Load the quizzes into the list element.
export const loadQuizzes = () => {
    const quizzes = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_QUIZZES_KEY));

    // Clear the quiz list if it has quizzes in it already.
    constants.QUIZ_LIST.innerHTML = "";

    for (const uuid in quizzes) {
        console.log(`uuid: ${uuid}`)
        appendToQuizList(uuid);
    }
}


// Clears quizzes from LOCAL STORAGE.
export const clearQuizzes = () => {
    localStorage.removeItem(constants.LOCAL_STORAGE_QUIZZES_KEY);

    for (const item in constants.QUIZ_LIST.children) {
        console.log(item);
    }
}
