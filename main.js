const addBButton = document.getElementById("AddTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskLIst");

loadTasks()

function addTask() {
    const task = taskInput.value.trim();

    if (task) {
        createTaskElement(task);

        taskInput.value = '';

        saveTask()

    } else {
        alert("Please enter a task!")
    }
}

addBButton.addEventListener('click', addTask)


function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.classList.add("checked")
    listItem.textContent = task;

    const deleteButton = document.createElement('span');
    deleteButton.innerHTML = "\u00d7";
    deleteButton.className = 'deleteTask'

    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem)

    deleteButton.addEventListener('click', function () {
        taskList.removeChild(listItem);
        saveTask();
    })
}


function saveTask() {
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function (item) {
        tasks.push(item.textContent.replace('Delete', '').trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(createTaskElement);
}


taskList.addEventListener('click', function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked")
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
}, false);