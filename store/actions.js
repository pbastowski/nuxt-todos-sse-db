const BASEURL = 'http://localhost:3000'

export const init = ({ dispatch }) => {
    const es = new EventSource('/api/sse')

    document.cookie = Date.now()

    es.onmessage = function(event) {
        const data = JSON.parse(event.data)

        if (data.type === 'update' && data.cookie != document.cookie) {
            dispatch('getTodos')
        } else {
            //console.log(`That's mine:`, data)
        }
    }
}

export const getTodos = ({ state }) =>
    fetch(BASEURL + '/api/todos')
        .then(d => d.json())
        .then(d => (state.todos = d))

export const addTodo = async ({ state }, title) => {
    const todo = { title, done: false }
    const result = await fetch(BASEURL + '/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(d => d.json())
    todo.id = result.id
    state.todos = [todo, ...state.todos]
}

export const updateTodo = ({ state }, todo) => {
    return fetch(`${BASEURL}/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(d => {
        if (d.status !== 200) throw new Error(d.status)
        // else sse.send({ event: 'add', todo })
    })
}

export const deleteTodo = ({ state }, todo) =>
    fetch(`${BASEURL}/api/todos/${todo.id}`, {
        method: 'DELETE'
    }).then(r => {
        if (r.status === 200)
            state.todos = state.todos.filter(t => t.id !== todo.id)
        else throw new Error(r.status)
    })

// {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrer: 'no-referrer', // no-referrer, *client
//     body: JSON.stringify(data)
// }

// const es = new EventSource('/api/sse')
//
// es.onmessage = function(event) {
//     if (event.type === 'update') {
//     } else console.log(event)
// }
