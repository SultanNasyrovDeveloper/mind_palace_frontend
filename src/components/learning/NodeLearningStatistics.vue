<template>
    <v-container fluid class="d-flex pl-0">
        <div class="mr-2">
            <v-icon small class="mr-3">mdi-eye</v-icon>
            <span class="caption">{{ statistics.views }}</span>
        </div>
        <div class="mx-2">
            <v-icon small class="mr-3">mdi-repeat</v-icon>
            <span class="caption">{{ statistics.repetitions }}</span>
        </div>
        <div class="mx-2">
            <v-icon small class="mr-3">mdi-lightbulb</v-icon>
            <span class="caption">{{ statistics.easiness }}</span>
        </div>

        <div class="mx-2">
            <v-icon small class="mr-3">mdi-star</v-icon>
            <span class="caption">{{ statistics.average_rate }}</span>
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