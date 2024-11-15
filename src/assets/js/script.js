// Just for testing.
// TODO: REMOVE
localStorage.clear();

if (! localStorage.getItem("quiz-data")) {
    localStorage.setItem("quiz-data", JSON.stringify({}))
}

const newQuizForm = document.getElementById("newQuizForm");

newQuizForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let name = newQuizForm.elements["name"].value;
    let quizData = JSON.parse(localStorage.getItem("quiz-data"));

    quizData[name] = {"questions": ["hey"]};
    localStorage.setItem("quiz-data", JSON.stringify(quizData));
});
