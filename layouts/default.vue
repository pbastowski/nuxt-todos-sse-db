<template>
    <div>
        <nuxt />
    </div>
</template>

<script>
export default {
    head: {
        titleTemplate: 'My App - %s'
    }
}
</script>
<style>
body {
    padding: 0.7em 1em;
}

.b1,
[b1] {
    border: 1px dashed red;
}
.b2,
[b2] {
    border: 1px dashed blue;
}

</style>
