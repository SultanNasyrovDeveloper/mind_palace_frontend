<template>
    <v-container>
        Test node detail card
        {{ node }}
    </v-container>
    
</template>

<script>
    export default {
        name: "NodeDetailCard",
        props: ['node'],
        methods: {
            change() {
                this.$emit('change', {});
            }
        }
    }
</script>

<style scoped>

</style>