// Just for testing.
// TODO: REMOVE
localStorage.clear();

// ====================================================
// Constants
// ====================================================
// This one is pretty simple, it's just the name of the
// localStorage key that holds the quiz hashTable.
const LOCAL_STORAGE_QUIZZES_KEY = "quizzes";


const openQuiz = event => {
    const uuid = event.target.getAttribute("uuid");
    const quiz = JSON.parse(localStorage.getItem(LOCAL_STORAGE_QUIZZES_KEY))[uuid];
    console.log(quiz);
}


// Method that adds new quizzes to the quiz list.
// Just a little fake event listener that gets called 
// after the form is submitted.
const appendToQuizList = (uuid) => {
    // The quiz sidebar.
    const domSidebar = document.getElementById("quizList");

    // Local storage JSON stuff.
    // ^ lol, this is the most unhelpful comment ever.
    //
    // Let me explain what it does.
    // Gets the quizData localStorageKey (made it a param because I
    // might change key name in localStorage later).
    // Then, it parses the JSON string into an object.
    const quizData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_QUIZZES_KEY))[uuid];


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
    newSelector.addEventListener("click", openQuiz);

    // Finally append it.
    domSidebar.append(newSelector);
}


// Set the base structure if one doesn't exist already.
if (! localStorage.getItem("quiz-data")) {
    localStorage.setItem("quiz-data", JSON.stringify({}))
}

// Get the element.
const newQuizForm = document.getElementById("newQuizForm");

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

    let quizData = JSON.parse(localStorage.getItem("quiz-data"));

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

    localStorage.setItem(LOCAL_STORAGE_QUIZZES_KEY, JSON.stringify(quizData));

    appendToQuizList(uuid);
});
