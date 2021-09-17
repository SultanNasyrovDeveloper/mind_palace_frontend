<template>
    <v-container fluid class="mx-0 px-0 d-flex flex-column">
        <div class="d-flex mb-3">
            <div class="d-flex align-center mr-3">
                <v-icon small class="mr-2">mdi-eye</v-icon>
                <span class="caption">{{ stats.views}}</span>
            </div>
            <div class="d-flex align-center mx-6">
                <v-icon small class="mr-2">mdi-repeat-once</v-icon>
                <span class="caption">{{ stats.repetitions }}</span>
            </div>
            <div class="d-flex align-center mx-6">
                <v-icon small class="mr-2">mdi-lightbulb</v-icon>
                <span class="caption">{{ stats.easiness }}</span>
            </div>
            <div class="d-flex align-center mx-6">
                <v-icon small class="mr-2">mdi-star</v-icon>
                <span class="caption">{{ stats.average_rate }}</span>
            </div>
        </div>
        <div class="d-flex align-center">
            <v-icon small class="mr-2">mdi-calendar</v-icon>
            <span class="caption">{{ nextRepetitionBuitified }}</span>
        </div>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "NodeLearningStatistics",
        props: ['statisticsId'],
        computed: {
            ...mapGetters({ stats: 'getCurrentNodeStatistics'}),
            nextRepetitionBuitified() {
                if (this.stats.hasOwnProperty('next_repetition')) {
                    const date = new Date(this.stats.next_repetition);
                    return date.toString()
                }
                return 'Not defined.'
            }
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