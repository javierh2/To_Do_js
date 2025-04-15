const urlBase = "https://jsonplaceholder.typicode.com/posts"  // this is the url with whom i interact
let tasks = [] // initialize the posts as an empty array

function getData(){ // TO DO
    fetch(urlBase)
        .then(res => res.json())
        .then(data => {
            tasks = data
            renderTaskList()
        })
        .catch(error => console.error('Error when calling the API: ',error))
}
getData()

// renderizado las tareas
function renderTaskList(){
    const postList = document.getElementById('postList')
    postList.innerHTML = ''

    tasks.forEach(task => {
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
            <label for="editBody">To do: </label>
            <textarea id="editBody-${task.id}" required>${task.body}</textarea>
            <button onclick="updateTask(${task.id})">Update</button>
        </div>
        `
        postList.appendChild(listTask) // adding to all of them
    })
}

function postData(){
    const postTitleInput = document.getElementById('postTitle') // selected info from html
    const postBodyInput = document.getElementById('postBody')   // selected info from html
    const postTitle = postTitleInput.value
    const postBody = postBodyInput.value

    if (postTitle.trim() == '' || postBody.trim() == '') {  // condition to body of the html
        alert('Please complete the fields')
        return
    }

    fetch(urlBase, {
        method: 'POST',    // method POST to publish TASKS
        body: JSON.stringify({
            title: postTitle,     // adding of my info
            body: postBody,       // adding of my info
            userId: 1,
        }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(res => res.json())
        .then(data => {
            tasks.unshift(data)  // first to show
            renderTaskList()
            // reset of the fields
            postTitleInput.value = ''
            postBodyInput.value = ''
        })
        .catch(error => console.error('Error to create a Reminder: ',error))
}

// function of the button´s
function editTask(id){    // this is the ID of the buttom created in the function renderTaskList
    const editForm = document.getElementById(`editForm-${id}`)
    editForm.style.display = (editForm.style.display == 'none') ? 'block' : 'none'  // action of the button show or hide
}

function updateTask(id){
    const editTitle = document.getElementById(`editTitle-${id}`).value
    const editBody = document.getElementById(`editBody-${id}`).value

    fetch(`${urlBase}/${id}`,{
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: editTitle,
            body: editBody,
            userId: 1,
        }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(res => res.json())
    .then(data => {  // updating that ID promptly
        const index = tasks.findIndex(task => task.id === data.id)
        if(index != -1){
            tasks[index] = data
        }else{
            alert('Error updating task information')
        }
        renderTaskList()  // render to make modifications
    })
    .catch(error => console.error('Error to update a reminder: ',error))
}

// action of delete a Task
function deleteTask(id){
    fetch(`${urlBase}/${id}`,{
        method: 'DELETE',
    })
    .then(res => {
        if(res.ok){
            tasks = tasks.filter(task => task.id != id)   //filter to show task that were not eliminated
            renderTaskList()
        }else{
            alert('Error deleting task')
        }
    })
    .catch(error => console.error('Error deleting a task: ',error))
}