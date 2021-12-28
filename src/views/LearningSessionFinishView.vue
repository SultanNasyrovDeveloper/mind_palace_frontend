<template>
    <v-container fluid>
        <v-row>
            <v-col cols="4" align-self="center">
              <v-card>
                <v-card-title>Learning session complete.</v-card-title>
                <v-card-actions>
                    <v-btn :to="backTo">Back</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
    </v-container>
  
</template>

<script>

export default {
    name: "LearningSessionFinishView",
    computed: {
        backTo() {
            const targetNodeId = (
                this.$store.getters.getMindPalaceRootId ||
                this.$store.getters.this.$store.getters.getMindPalaceRootId
            );
            return {name: 'mypalace', params: {rootId: targetNodeId}};
        }
    }
}
</script>

<style>

</style>