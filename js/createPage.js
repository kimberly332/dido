const todoFormElement = document.getElementById('todo-form');

todoFormElement.addEventListener('submit', function(event) {
    event.preventDefault();

    const newTodo = {
        name: todoFormElement.listName.value.trim(),
        description: todoFormElement.description.value.trim(),
        dueDate: todoFormElement.dueDate.value,
        dueTime: todoFormElement.dueTime.value,
        tags: parseTags(todoFormElement.tags.value),
    };

    // Add new todo to local storage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));

    // Clear form inputs
    todoFormElement.reset();

    // Redirect to list page
    window.location.href = 'listPage.html';
});

// Parse tags from input
function parseTags(tags) {
    if (!tags) return [];
    const tagsList = tags.split(',');
    const result = [];
    for (let i = 0; i < tagsList.length; i++) {
        const tag = tagsList[i].trim();
        if (tag.length > 0) {
            result.push(tag);
        }
    }
    return result;
}
