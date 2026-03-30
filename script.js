let tasks = [];

window.onload = function () {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        sortTasks();
        tasks
            .filter(task => !task.completedAt)
            .forEach(task => addTaskToList(task));
        tasks
            .filter(task => task.completedAt)
            .forEach(task => addTaskToList(task));
    }
};

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value;
    const priority = document.getElementById("priority").value;
    if (taskText === "") return;
    const newTask = {
        text: taskText,
        createdAt: new Date().toLocaleString(),
        completedAt: null,
        priority: priority
    };
    tasks.push(newTask);
    sortTasks();
    saveTasks();
    document.getElementById("taskList").innerHTML = "";
    tasks
        .filter(task => !task.completedAt)
        .forEach(task => addTaskToList(task));
    tasks
        .filter(task => task.completedAt)
        .forEach(task => addTaskToList(task));
    input.value = "";
}

function addTaskToList(task) {
    const li = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = `${task.text}（${task.priority}）`;
    text.classList.add("task-text");
    if (task.priority === "高") {
        text.classList.add("high");
    } else if (task.priority === "中") {
        text.classList.add("medium");
    } else {
        text.classList.add("low");
    }
    const created = document.createElement("div");
    created.textContent = "追加: " + task.createdAt;
    created.style.fontSize = "12px";
    const completed = document.createElement("div");
    completed.style.fontSize = "12px";
    if (task.completedAt) {
        completed.textContent = "完了: " + task.completedAt;
        text.style.textDecoration = "line-through";
        text.style.color = "gray";
        li.style.backgroundColor = "#f0f0f0";
    }
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "完了";
    completeBtn.onclick = function () {
        task.completedAt = new Date().toLocaleString();
        saveTasks();
        location.reload();
    };
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        tasks = tasks.filter(t => t !== task);
        saveTasks();
        location.reload();
    };
    li.appendChild(text);
    li.appendChild(document.createElement("br"));
    li.appendChild(created);
    li.appendChild(completed);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function sortTasks() {
    const order = { "高": 1, "中": 2, "低": 3 };
    tasks.sort((a, b) => {
        return (order[a.priority] || 4) - (order[b.priority] || 4);
    });
}
