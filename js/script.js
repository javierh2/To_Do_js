const urlBase = "https://jsonplaceholder.typicode.com/posts"  // this is the url with whom i interact
let tasks = [] // initialize the posts as an empty array

function getData(){ // TO DO
    fetch(urlBase)
    .then(res => res.json())
    .then(data =>{
        tasks = data
        renderTaskList()
    })
    .catch(error => console.error('Error when calling the API: ',error))
}

// renderizado las tareas
function renderTaskList(){
    const postList = document.getElementById('postList')
    postList.innerHTML = ''
    tasks.forEach(task =>{
        const listTask = document.createElement('li')
        listTask.classList.add('postItem')
        listTask.innerHTML = `
        <strong>${task.title}</strong>
        <p>${task.body}</p>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
        <div id="editForm-${task.id}" class="editForm" style="display:none">
            <label for="editTitle">Title: </label>
            <input type="text" id="editTitle-${task.id}" value="${task.title}" required>
            <label for="editBody">To do:</label>
            <textarea id="editBody-${task.id}" required></textarea>
            <button onclick="updateTask(${task.id})">Update</button>
        </div>
        `
        postList.appendChild(listTask) // adding to all of them

    })
}