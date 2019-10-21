<template>
    <div>
        <h1>
            <center>todos</center>
        </h1>

        <!--        <nuxt-link to="/">back</nuxt-link>-->

        <!-- New Todo -->
        <form
            @submit.prevent="addTodo"
            style="display: flex; align-items: center; padding: 0.5em 1em; margin: 0 -1em;"
        >
            <input class="flex-grow-1 mr-2" v-model="newTodoTitle" />
            <button
                :disabled="!newTodoTitle.trim()"
                class="grow mr2 btn btn-secondary btn-sm"
            >
                add
            </button>
        </form>

        <!-- Filters -->
        <div
            class="bg-light mb-2"
            style="display: flex; align-items: baseline; justify-content: space-between; padding: 0.5em 1em; margin: 0 -1em;"
        >
            <!--            <input type="checkbox" v-model="selectAll" class="mr-2" />-->
            <span>
                <label
                    :style="[index < 2 && { 'margin-right': '1em' }]"
                    v-for="(filter, index) in [
                        {
                            value: '',
                            label: `All ${$store.state.todos.length}`
                        },
                        {
                            value: 'completed',
                            label: `${$store.getters.completedTodos} completed`
                        },
                        {
                            value: 'incomplete',
                            label: `${$store.getters.incompleteTodos} incomplete`
                        }
                    ]"
                    ><input
                        type="radio"
                        v-model="$store.state.filter"
                        class="mr-2"
                        :value="filter.value"
                    />{{ filter.label }}</label
                >
            </span>
            <button href="#" class="btn btn-sm btn-link pr-0" @click="">
                clear completed
            </button>
        </div>

        <!-- List -->
        <div
            class="mb-1"
            style="display: flex; align-items: center; "
            v-for="todo in $store.getters.filteredTodos"
            :key="todo.id"
        >
            <input
                type="checkbox"
                v-model="todo.done"
                class="mr-2"
                @change="updateTodo(todo)"
            />
            <input
                style="flex-grow: 1; margin-right: 1em;"
                v-model.lazy="todo.title"
                @change="updateTodo(todo)"
            />
            <button class="btn btn-light btn-sm pr-0" @click="deleteTodo(todo)">
                🗑
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        selectAll: false,
        newTodoTitle: '',
        list: []
    }),

    created() {
        this.$store.dispatch('getTodos')
    },

    methods: {
        addTodo() {
            if (!this.newTodoTitle.trim()) return
            this.$store
                .dispatch('addTodo', this.newTodoTitle)
                .then(todo => (this.newTodoTitle = ''))
                .catch(er =>
                    this.$toast.error(`That did't work so well\n${er}`)
                )
        },

        deleteTodo(todo) {
            this.$store
                .dispatch('deleteTodo', todo)
                .catch(er =>
                    this.$toast.error(
                        `Can't delete this todo for some reason\n${er}`
                    )
                )
        },

        updateTodo(todo) {
            this.$store
                .dispatch('updateTodo', todo)
                .catch(er => this.$toast.error(`Can't update todo\n${er}`))
        }
    },

    head: {
        title: 'Home'
    }
}
</script>

<style scoped lang="scss">
div {
    h1 {
        color: red;
    }
}
</style>
