<template>
    <v-card v-if="node">
        <v-card-title>Confirm node deletion</v-card-title>
        <v-card-text>
            You are trying to delete node(ID={{ node.id }}): {{ node.name }}. You wont be able to revert this changes.
        </v-card-text>
        <v-card-actions>
            <v-btn plain @click="$emit('close')">Close</v-btn>
            <v-btn plain color="red" @click="$emit('delete', node.id)">Delete</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "NodeDeleteConfimationCard",
        props: ['node'],
    }
</script>

<style scoped>

</style>