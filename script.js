document.addEventListener("DOMContentLoaded", function(){

loadTasks();

/* ENTER KEY SUPPORT */

document.getElementById("taskInput").addEventListener("keypress", function(e){

if(e.key === "Enter"){
addTask();
}

});

});



let editIndex = null;


/* ADD OR UPDATE TASK */

function addTask(){

let taskInput = document.getElementById("taskInput");

let taskText = taskInput.value.trim();


/* EMPTY INPUT CHECK */

if(taskText === ""){

alert("Please enter a task");

taskInput.focus();

return;

}


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


/* ADD NEW TASK */

if(editIndex === null){

let task = {

text: taskText,

completed: false

};

tasks.push(task);

}


/* UPDATE EXISTING TASK */

else{

tasks[editIndex].text = taskText;

editIndex = null;

document.querySelector(".add-btn").innerText = "Add";

}


/* SAVE TASKS */

localStorage.setItem("tasks", JSON.stringify(tasks));


/* CLEAR INPUT */

taskInput.value = "";


/* RELOAD LIST */

loadTasks();

}



/* CREATE TASK ELEMENT */

function createTaskElement(task, index){

let li = document.createElement("li");


/* CHECKBOX */

let checkbox = document.createElement("input");

checkbox.type = "checkbox";

checkbox.checked = task.completed;


checkbox.onchange = function(){

toggleComplete(index);

};



/* TASK TEXT */

let span = document.createElement("span");

span.innerText = task.text;


if(task.completed){

span.classList.add("completed");

}



/* EDIT BUTTON */

let editBtn = document.createElement("button");

editBtn.innerText = "Edit";

editBtn.classList.add("edit-btn");


editBtn.onclick = function(){

editTask(task.text, index);

};



/* DELETE BUTTON */

let deleteBtn = document.createElement("button");

deleteBtn.innerText = "Delete";

deleteBtn.classList.add("delete-btn");


deleteBtn.onclick = function(){

deleteTask(index);

};



/* APPEND ELEMENTS */

li.appendChild(checkbox);

li.appendChild(span);

li.appendChild(editBtn);

li.appendChild(deleteBtn);


document.getElementById("taskList").appendChild(li);

}



/* EDIT TASK */

function editTask(text, index){

document.getElementById("taskInput").value = text;

editIndex = index;

document.querySelector(".add-btn").innerText = "Update";

}



/* DELETE TASK */

function deleteTask(index){

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.splice(index, 1);

localStorage.setItem("tasks", JSON.stringify(tasks));

loadTasks();

}



/* TOGGLE COMPLETE */

function toggleComplete(index){

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks[index].completed = !tasks[index].completed;

localStorage.setItem("tasks", JSON.stringify(tasks));

loadTasks();

}



/* LOAD TASKS */

function loadTasks(){

let taskList = document.getElementById("taskList");

taskList.innerHTML = "";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task, index) => {

createTaskElement(task, index);

});

}