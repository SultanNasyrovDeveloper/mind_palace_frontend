<template>
    <v-container>
        <start-session-form></start-session-form>
    </v-container>
</template>

<script>
    import StartSessionForm from '@/components/learning/session/StartSessionForm';

    export default {
        name: "UserLearningView",
        components: { StartSessionForm }

    }
</script>

<style scoped>

</style>