<template>
    <v-container fluid>
        <v-card>
            <v-card-title class="d-flex justify-space-between">
                Learning Sessios
                <v-btn>Start</v-btn>
            </v-card-title>
            <v-card-text>
                <session-table></session-table>
            </v-card-text>
        </v-card>

    </v-container>
</template>

<script>
    import SessionTable from '@/components/learning/session/SessionTable'

    export default {
        name: "UserLearningView",
        components: { SessionTable }

    }
</script>

<style scoped>

</style>