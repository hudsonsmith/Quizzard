const quizList = document.getElementById("quizList");

window.addEventListener("storage", event => {
    data("detected");
    if (event.key == "quizData") {
        quizList.append("Added new!");
    }
});
