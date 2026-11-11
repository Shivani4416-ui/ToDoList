
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;

        span.onclick = function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        };

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.className = "delete";

        del.onclick = function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        };

        li.appendChild(span);
        li.appendChild(del);
        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const value = input.value.trim();

    if (value === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: value,
        completed: false
    });

    saveTasks();
    displayTasks();
    input.value = "";
}

function clearTasks() {
    if (tasks.length === 0) return;

    if (confirm("Delete all tasks?")) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
}

document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

displayTasks();
