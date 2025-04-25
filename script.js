let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.unshift({ text: taskText, completed: false });
  input.value = "";
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  displayTasks();
}

function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'completed') return task.completed;
    if (currentFilter === 'pending') return !task.completed;
  });

  filteredTasks.forEach((task) => {
    const originalIndex = tasks.findIndex(t => t.text === task.text && t.completed === task.completed);
  
    const li = document.createElement("li");
    li.className = "task-item";
  
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleComplete(originalIndex);
  
    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = task.completed ? "completed-text" : "";
  
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTask(originalIndex);
  
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
  
}

displayTasks();
