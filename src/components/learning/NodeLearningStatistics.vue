<template>
    <v-container fluid class="mx-0 px-0">
        Views: {{ stats.views}}
        Repetitions: {{ stats.repetitions }}
        Easiness: {{ stats.easiness }}
        Average rate: {{ stats.average_rate }}
        <p>Next repetition: {{ stats.next_repetition }}</p>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "NodeLearningStatistics",
        props: ['statisticsId'],
        computed: {
            ...mapGetters({ stats: 'getCurrentNodeStatistics'}),
        },
        watch: {
            async statisticsId(newValue) {
                await this.$store.dispatch('fetchNodeLearningStatistics', newValue);
            }
        },
        async mounted() {
            await this.$store.dispatch('fetchNodeLearningStatistics', this.statisticsId);
        }
    }
</script>

<style scoped>

</style>