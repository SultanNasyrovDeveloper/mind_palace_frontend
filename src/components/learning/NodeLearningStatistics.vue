<template>
    <v-container fluid class="pt-0">
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
        <div class="d-flex align-center mt-10">
            <v-icon small class="mr-2">mdi-calendar</v-icon>
            <span class="body-2">
                Next repetition: {{ 
                    $store.getters.getCurrentlearningSession
                    ? 'Now'
                    : nextRepetitionBuitified 
                }}
            </span>
        </div>
    </v-container>
</template>

<script>
    import _ from 'lodash';

    export default {
        name: "NodeLearningStatistics",
        props: ['statistics'],
        computed: {
            nextRepetitionBuitified() {
                if (this.statistics.hasOwnProperty('next_repetition')) {
                    const date = new Date(this.statistics.next_repetition);
                    return date.toString()
                }
                return 'Not defined.'
            }
        }
    }
</script>

<style scoped>

</style>