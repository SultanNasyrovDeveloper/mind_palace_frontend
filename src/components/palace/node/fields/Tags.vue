<template>
    <div><v-chip v-for="tag in value" :key="tag.id">{{ tag.name }}</v-chip></div>
</template>

<script>
    export default {
        name: "Tags",
        props: ['value'],
        data() {
            return {
                comboboxInputValue: [],
                comboboxItems: []
            }
        }
    }
</script>

<style scoped>

</style>