<template>
    <v-container fluid class="pa-0 mt-7">
        <v-container fluid class="pa-0 ma-0">
            <h3>Learning statistics</h3>
        </v-container>
        <div class="d-flex align-center">
            <v-icon small class="mr-2">mdi-calendar</v-icon>
            <span class="caption">
                Next repetition: {{ 
                    $store.getters.getCurrentlearningSession
                    ? 'Now'
                    : nextRepetitionBuitified 
                }}
            </span>
        </div>
        <v-row class="mt-1">
            <v-col cols="3" class="d-flex flex-column align-center">
                <v-icon class="my-1">mdi-eye</v-icon>
                <span class="caption">{{ statistics.views }}</span>
                <span class="caption">Views</span>
            </v-col>
            <v-col cols="3" class="d-flex flex-column align-center">
                <v-icon class="my-1">mdi-repeat</v-icon>
                <span class="caption">{{ statistics.repetitions }}</span>
                <span class="caption">Repetitions</span>
            </v-col>
            <v-col cols="3" class="d-flex flex-column align-center">
                <v-icon class="my-1">mdi-lightbulb</v-icon>
                <span class="caption">{{ statistics.easiness }}</span>
                <span class="caption">Understanding</span>
            </v-col>
            <v-col cols="3" class="d-flex flex-column align-center">
                <v-icon class="my-1">mdi-star</v-icon>
                <span class="caption">{{ statistics.average_rate }}</span>
                <span class="caption">Average rate</span>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import _ from 'lodash';

    export default {
        name: "NodeLearningStatistics",
        props: ['statistics'],
        computed: {
            nextRepetitionBuitified() {
                return (
                    _.get(this.statistics, 'next_repetition', null)?
                    new Date(_.get(this.statistics, 'next_repetition')).toString():
                    'Not defined.'
                )
            }
        }
    }
</script>

<style scoped>

</style>