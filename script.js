document.addEventListener("DOMContentLoaded", loadTasks);

let editIndex = null;

function addTask(){

let taskInput = document.getElementById("taskInput");
let taskText = taskInput.value.trim();

if(taskText === ""){
alert("Please enter a task");
return;
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if(editIndex === null){

let task={
text:taskText,
completed:false
};

tasks.push(task);

}else{

tasks[editIndex].text=taskText;

editIndex=null;

document.querySelector(".add-btn").innerText="Add";

}

localStorage.setItem("tasks",JSON.stringify(tasks));

taskInput.value="";

loadTasks();
}


function createTaskElement(task,index){

let li=document.createElement("li");

let checkbox=document.createElement("input");
checkbox.type="checkbox";
checkbox.checked=task.completed;

checkbox.onchange=function(){
toggleComplete(index);
};

let span=document.createElement("span");
span.innerText=task.text;

if(task.completed){
span.classList.add("completed");
}

let editBtn=document.createElement("button");
editBtn.innerText="Edit";
editBtn.classList.add("edit-btn");

editBtn.onclick=function(){
editTask(task.text,index);
};

let deleteBtn=document.createElement("button");
deleteBtn.innerText="Delete";
deleteBtn.classList.add("delete-btn");

deleteBtn.onclick=function(){
deleteTask(index);
};

li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(editBtn);
li.appendChild(deleteBtn);

document.getElementById("taskList").appendChild(li);
}


function editTask(text,index){

document.getElementById("taskInput").value=text;

editIndex=index;

document.querySelector(".add-btn").innerText="Update";

}


function deleteTask(index){

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.splice(index,1);

localStorage.setItem("tasks", JSON.stringify(tasks));

loadTasks();
}


function toggleComplete(index){

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks[index].completed=!tasks[index].completed;

localStorage.setItem("tasks", JSON.stringify(tasks));

loadTasks();
}


function loadTasks(){

let taskList=document.getElementById("taskList");

taskList.innerHTML="";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task,index)=>{
createTaskElement(task,index);
});

}