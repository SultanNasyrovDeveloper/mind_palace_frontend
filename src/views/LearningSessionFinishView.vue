<template>
    <v-container fluid>
        <v-row>
            <v-col cols="4" align-self="center">
              <v-card>
                <v-card-title>Learning session complete.</v-card-title>
                <v-card-actions>
                    <v-btn>Finish</v-btn>
                    <v-btn>Repaete trouble nodes</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
    </v-container>
  
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "LearningSessionFinishView",
    computed: {
        ...mapGetters({sessionId: 'getCurrentLearningSessionId'})
    },

}
</script>

<style>

</style>