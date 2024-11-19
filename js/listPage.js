// Initialize list page
if (document.querySelector('.todo-cards-container')) {
    displayTodos();
}


function formatDateTime(date, time) {
    const [year, month, day] = date.split('-'); // Split the date. eg: '2024-11-01' -> ['2024', '11', '01']
    const [hour, minute] = time.split(':');    // Split the time. eg: '00:42' -> ['00', '42']
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const shortMonth = monthNames[parseInt(month, 10) - 1]; // Determine month's name

    const hour12 = (parseInt(hour, 10) % 12) || 12;  // Convert hour (0 -> 12 for midnight)
    const period = parseInt(hour, 10) < 12 ? 'am' : 'pm';  // Determine AM/PM based on hour

    return `${shortMonth} ${parseInt(day, 10)} at ${hour12}:${minute} ${period}`;
}

// Create Todo item's tags HTML
function createTodoDueDatesHTML(dueDate, dueTime) {
    if (!dueDate || !dueTime) return '';
    return `
        <div class="due-date">
            <span>Due <span class="time">${formatDateTime(dueDate, dueTime)}</span></span>
        </div>
    `;

}

// Create Todo item's tags HTML
function createTodoTagsHTML(tags) {
    if (!tags || tags.length === 0) return '';

    let tagsHTML = '';
    for (let i = 0; i < tags.length; i++) {
        tagsHTML += `<a href="#">${tags[i]}</a>`;
    }
    return `
        <div class="tags-container">
            ${tagsHTML}
        </div>
    `;
}

// Display all todo items in the page
function displayTodos() {
    const todoCardElement = document.querySelector('.todo-card');
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Clear existing todo tasks
    const existingTasks = todoCardElement.querySelectorAll('.task');
    existingTasks.forEach(task => task.remove());

    // Add each todo item to the card
    todos.forEach((todo, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <div class="task-heading">
                <a href="#" onclick="removeTodo(${index}); event.preventDefault();">
                    <i class="fa-solid fa-circle-check"></i>
                </a>
                <h3>${todo.name}</h3>
            </div>
            <p class="description">${todo.description}</p>
            ${createTodoTagsHTML(todo.tags)}
            ${createTodoDueDatesHTML(todo.dueDate, todo.dueTime)}
        `;
        todoCardElement.appendChild(taskElement);
    });
}

// Remove a todo item from the list page
function removeTodo(index) {
    // Remove todo item at given index and save to the localStorage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    // Update the list page
    displayTodos();
}