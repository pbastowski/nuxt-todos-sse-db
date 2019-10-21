export const filteredTodos = state =>
    state.todos.filter(d =>
        state.filter === 'completed'
            ? d.done
            : state.filter === 'incomplete'
            ? !d.done
            : true
    )

export const completedTodos = state => state.todos.filter(d => d.done).length

export const incompleteTodos = state => state.todos.filter(d => !d.done).length
