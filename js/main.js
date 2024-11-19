// main.js

// Function to format date and time to match your display format
function formatDateTime(date, time) {
    const todoDate = new Date(`${date}T${time}`);
    return todoDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
    }) + ' at ' + 
    todoDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit'
    }).toLowerCase();
}

// Function to parse tags from input string
function parseTags(tagsString) {
    if (!tagsString) return [];
    return tagsString
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
}

// Function to create tags HTML
function createTagsHTML(tags) {
    if (!tags || tags.length === 0) return '';
    
    return `
        <div class="tags-container">
            ${tags.map(tag => `<a href="#">${tag}</a>`).join('')}
        </div>
    `;
}

// Function to remove a todo
function removeTodo(index) {
    const taskElement = event.target.closest('.task');
    
    // Add a fade-out animation
    taskElement.style.transition = 'opacity 0.3s ease-out';
    taskElement.style.opacity = '0';
    
    // Wait for animation to complete before removing
    setTimeout(() => {
        // Get todos from localStorage
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        
        // Remove the todo at the specified index
        todos.splice(index, 1);
        
        // Save back to localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
        
        // Update the display
        displayTodos();
    }, 300); // Match this with the transition duration
}

// Function to display todos on the todo-lists page
function displayTodos() {
    const todoCard = document.querySelector('.todo-card');
    if (!todoCard) return; // Exit if we're not on the todo-lists page

    // Get todos from localStorage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Clear existing tasks (except the heading)
    const existingTasks = todoCard.querySelectorAll('.task');
    existingTasks.forEach(task => task.remove());

    // Add each todo to the card
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
            ${createTagsHTML(todo.tags)}
            <div class="due-date">
                <span>Due <span class="time">${formatDateTime(todo.dueDate, todo.dueTime)}</span></span>
            </div>
        `;
        todoCard.appendChild(taskElement);
    });
}

// Initialize todos display if we're on the todo-lists page
if (document.querySelector('.todo-cards-container')) {
    displayTodos();
}

// Handle form submission on the create page
const todoForm = document.getElementById('todoForm');
if (todoForm) {
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        if (!todoForm.checkValidity()) {
            return;
        }

        // Get and parse tags
        const tags = parseTags(todoForm.tags.value);

        // Create new todo object
        const newTodo = {
            name: todoForm.listName.value.trim(),
            description: todoForm.description.value.trim(),
            dueDate: todoForm.dueDate.value,
            dueTime: todoForm.dueTime.value,
            tags: tags,
            completed: false,
            createdAt: new Date().toISOString()
        };

        // Get existing todos and add new one
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(newTodo);
        
        // Save back to localStorage
        localStorage.setItem('todos', JSON.stringify(todos));

        // Clear form
        todoForm.reset();

        // Redirect to todo list page
        window.location.href = 'todo-lists.html';
    });
}