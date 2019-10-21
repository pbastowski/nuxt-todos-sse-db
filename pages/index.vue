<template>
    <div>
        <div style="padding: 8px 10px; background: #eee; height: 100%;">
            <nuxt-link to="/" style="margin-right: 20px;">Home</nuxt-link>
            <nuxt-link to="/todos">Todos</nuxt-link>
        </div>
        <section style="flex-grow: 1; margin-left: 1em; margin-right: 1em; ">
            <nuxt-child />
        </section>
    </div>
</template>
