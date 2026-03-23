let tasks = [];

// ページ読み込み時に保存データを取得
window.onload = function () {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => addTaskToList(task));
    }
};

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value;

    if (taskText === "") return;

    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTaskToList(taskText);
    input.value = "";
}

function addTaskToList(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;
    document.getElementById("taskList").appendChild(li);
}
