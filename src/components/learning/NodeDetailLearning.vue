<template>
    <v-card>
        <v-card-title>
            <v-container 
                    fluid 
                    class="ma-0 pa-0 d-flex" 
                    v-if="$store.getters.getLearningSessionIsActive">
                <v-row>
                    <v-col cols="1"><v-icon small color="success">mdi-circle</v-icon></v-col>
                    <v-col cols="7">
                        <span class="body-1">Active learning session.</span>
                    </v-col>
                    <v-col cols="4" class="d-flex justify-end">
                        <v-btn small plain v-if="session" @click="finishSession" class="ml-3">Finish</v-btn>
                    </v-col>
                </v-row>
            </v-container>
            <span v-else class="body-1">Learning session not started yet.</span>
        </v-card-title>
        <v-card-subtitle v-if="$store.getters.getLearningSessionIsActive">
            <span class="caption">Started: {{ started }}</span>
        </v-card-subtitle>

        <v-card-actions class="d-flex flex-column">
            <v-container fluid class="d-flex justify-end">
                <v-btn 
                        v-if="!$store.getters.getLearningSessionIsActive" 
                        @click="startSession">
                    Start learning session
                </v-btn>
            </v-container>
            <v-container 
                    fluid 
                    class="d-flex justify-center" 
                    v-if="$store.getters.getLearningSessionIsActive">
                <v-rating
                        v-model="studyRating"
                        hover
                        :length="6"
                        @input="studyNode"
                ></v-rating>
            </v-container>

        </v-card-actions>
    </v-card>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "NodeDetailLearning",
        data() {
            return {
                studyRating: 0
            }
        },
        computed: {
            ...mapGetters({ session: 'getCurrentLearningSession' }),
            started() {
                if (this.session && this.session.hasOwnProperty('start_datetime')) {
                    return this.session.start_datetime;
                }
                return ''
            }
        },
        methods: {
            ...mapActions(['finishSession']),
            async startSession() {
                const nodeId = this.$store.getters.getCurrentNodeId;
                const data = { root: nodeId, strategy_name: 'sm2' };
                await this.$store.dispatch('startLearningSession', data);
                this.$router.push({ name: 'learning.node', params: { nodeId: nodeId } });
            },
            async studyNode() {
                const nodeId = this.$store.getters.getCurrentNodeId;
                const next = await this.$store.dispatch('studyNode', [nodeId, this.studyRating]);
                this.$router.push({name: 'learning.node', params: {nodeId: next}})
            }
        }
    }
</script>

<style scoped>

</style>