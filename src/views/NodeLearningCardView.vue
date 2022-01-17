<template>
    <v-container fluid class="d-flex justify-center">
        <v-card  min-width="40vw" style="min-height: 30vh">
            <v-card-text class="fill-height d-flex flex-column justify-center">

                <v-container fluid class="d-flex flex-column align-center">
                    <node-breadcrumbs :items="node.ancestors"></node-breadcrumbs>
                    <span class="headline mt-3">{{ node.name }}</span>
                </v-container>
                
                <v-container fluid class="d-flex flex-column align-center">
                    <div class="d-flex">
                        <div class="d-flex align-center mx-2">
                            <v-icon small class="mr-1">mdi-repeat</v-icon>
                            <span>Total repetitions: {{ session.total_repetitions }}</span>
                        </div>
                        <div class="d-flex align-center mx-2">
                            <v-icon small class="mr-1">mdi-star</v-icon>
                            <span>Average rating: {{ session.average_rating }}</span>
                        </div>
                    </div>
                    <span>Started: {{ sessionStarted }}</span>
                </v-container>

                <v-container class="d-flex justify-center mt-5">
                    <v-btn 
                            class="mr-2"  
                            @click="finishSession"
                            elevation="1">
                        Finish session
                    </v-btn>

                    <v-btn 
                            class="ml-2 teal lighten-1 white--text" 
                            @click="$router.push({name: 'node.detail', params: {nodeId: nodeId}})"
                    >
                        See card
                    </v-btn>
            </v-container>
            
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';

    import NodeBreadcrumbs from '@/components/palace/node/fields/Breadcrumbs';

    const moment = require('moment');


    export default {
        name: "NodeLearningCard",
        props: ['nodeId'],
        components: { NodeBreadcrumbs, },
        computed: {
            ...mapGetters({
                node: 'getCurrentNode', 
                session: 'getCurrentLearningSession'
            }),
            sessionStarted() {
                const startDatetime = moment.utc(this.session.start_datetime);
                return startDatetime.fromNow()
            }
        },
        methods: {
            async finishSession() {
                await this.$store.dispatch('finishSession');
                this.$router.push({ name: 'mypalace', params: { rootId: this.$store.getters.getUserMindPalaceRootId }});
            }
        },
        watch: {
            async nodeId(newValue) {
                if (newValue) {
                    await this.$store.dispatch('fetchMindPalaceNode', newValue);
                }
                
            }
        },
        async mounted() {
            if (this.nodeId) {
                await this.$store.dispatch('fetchMindPalaceNode', this.nodeId);
            }
        },
    }
</script>

<style scoped>

</style>