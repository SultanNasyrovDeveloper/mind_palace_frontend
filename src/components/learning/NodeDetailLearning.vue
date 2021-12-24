<template>
    <div>
        <v-btn 
                v-if="$store.getters.getLearningSessionIsActive"
                class="ml-3"
                @click="finishSession" 
        >Finish</v-btn>
        <v-btn 
                v-if="$store.getters.getLearningSessionIsActive" 
                class="ml-3 teal lighten-1 white--text"
                elevation="1">
                
            <span class="h4">Submit</span>
            <v-rating
                    v-model="studyRating"
                    hover
                    half-increments
                    class="ml-2"
                    :length="3"
                    color="white"
                    background-color="white"
                    @input="studyNode"
            ></v-rating>
        </v-btn>
        <v-btn 
                v-if="!$store.getters.getLearningSessionIsActive"
                class="teal lighten-1 white--text"
                @click="startSession"
                elevation="1">
        Learn</v-btn>
    </div>
</template>

<script>
    import _ from 'lodash';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "NodeDetailLearning",
        data() {
            return {
                studyRating: 0
            }
        },
        computed: {
            started: () => _.get(this.session, 'start_datetime', ''),
        },
        methods: {
            ...mapActions(['finishSession']),
            async startSession() {
                const nodeId = this.$store.getters.getCurrentNodeId;
                const data = { root: nodeId, strategy_name: 'sm2' };
                this.$store.dispatch('startLearningSession', data)
                    .then(_ => {
                        this.$router.push({ name: 'learning.node', params: { nodeId: nodeId } });
                    })
            },
            async studyNode() {
                const next = await this.$store.dispatch(
                    'studyNode', 
                    [this.$store.getters.getCurrentNodeId, this.studyRating * 2]
                );
                this.$router.push({name: 'learning.node', params: {nodeId: next}})
            }
        }
    }
</script>

<style scoped>

</style>