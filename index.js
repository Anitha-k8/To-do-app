const taskList = document.getElementById('task-list');
const completedTasks = document.getElementById('completed-tasks');

function addTask() {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('description').value;
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('task-priority').value;
    const category = document.getElementById('task-category').value;

    if (!title || !deadline) {
        alert('Please enter task title and deadline.');
        return;
    }

    const task = document.createElement('li');
    task.classList.add(priority);

    const taskContent = `
        <div>
            <strong>${title}</strong> (${category})<br>
            ${desc}<br>
            <span>Deadline: ${deadline}</span>
            <span class="deadline-alert"></span>
        </div>
        <button onclick="completeTask(this)">Complete</button>
        <button onclick="deleteTask(this)"class="delete-btn">Delete</button>
    `;

    task.innerHTML = taskContent;
    taskList.appendChild(task);

    checkDeadline(task, deadline);

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('task-deadline').value = '';
    document.getElementById('task-priority').value = 'low';
    document.getElementById('task-category').value = 'work';
}

function deleteTask(button) {
    const task = button.closest('li');
    task.remove();
}

function deleteAllTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const completedTasks = document.getElementById('completed-tasks');
    completedTasks.innerHTML = '';

    alert('All tasks have been deleted.');
}

function checkDeadline(task, deadline) {
    const now = new Date();
    const taskDeadline = new Date(deadline);
    const alert = task.querySelector('.deadline-alert');

    const timeDifference = taskDeadline - now;
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day

   
    if (timeDifference < 0) {
        task.style.backgroundColor = '#f8d7da'; // Red background for missed deadline
        alert.textContent = ' - Deadline Missed!';
    } else if (timeDifference <= oneDay) {
        task.style.backgroundColor = '#fff3cd'; // Yellow background for approaching deadline
        alert.textContent = ' - Deadline Approaching!';
    } else if (timeDifference <= 3 * oneDay) {
        task.style.backgroundColor = '#d1ecf1'; // Light blue background for less than 3 days
        alert.textContent = ' - Less than 3 days remaining';
    }

    
    
    if (currentDate === deadlineDate) {
        alert('Task "' + task.querySelector('strong').textContent + '" is due today!');
    }
}

function completeTask(button) {
    const task = button.parentElement;
    task.classList.add('completed');
    completedTasks.appendChild(task);
    button.remove();
}