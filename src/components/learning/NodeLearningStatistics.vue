<template>
    <v-container fluid class="pt-0">
        <v-row class="mt-1">
            <v-col cols="3" class="d-flex flex-column align-center">
                <v-icon class="my-1">mdi-eye</v-icon>
                <span class="caption">{{ stats.views}}</span>
                <span class="caption">Views</span>
            </v-col>
            <v-col cols="3" class="d-flex flex-column align-center">
                <v-icon class="my-1">mdi-repeat</v-icon>
                <span class="caption">{{ stats.repetitions }}</span>
                <span class="caption">Repetitions</span>
            </v-col>
            <v-col cols="3" class="d-flex flex-column align-center">
                <v-icon class="my-1">mdi-lightbulb</v-icon>
                <span class="caption">{{ stats.easiness }}</span>
                <span class="caption">Understanding</span>
            </v-col>
            <v-col cols="3" class="d-flex flex-column align-center">
                <v-icon class="my-1">mdi-star</v-icon>
                <span class="caption">{{ stats.average_rate }}</span>
                <span class="caption">Average rate</span>
            </v-col>
        </v-row>
        <div class="d-flex align-center mt-10">
            <v-icon small class="mr-2">mdi-calendar</v-icon>
            <span class="body-2">Next repetition: {{ nextRepetitionBuitified }}</span>
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