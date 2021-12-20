<template>
    <v-container fluid class="d-flex justify-center">
        <v-card  min-width="40vw" style="min-height: 30vh">
            <v-card-text class="fill-height d-flex flex-column justify-center">
                <v-container fluid class="d-flex flex-column align-center">
                    <node-breadcrumbs :items="node.ancestors"></node-breadcrumbs>
                    <span class="headline mt-3">{{ node.name }}</span>
                </v-container>

                <v-container class="d-flex justify-center mt-5">
                    <v-btn class="mr-2"  @click="finishSession">Finish session</v-btn>
                    <v-btn 
                            class="ml-2 success" 
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


    export default {
        name: "NodeLearningCard",
        props: ['nodeId'],
        components: { NodeBreadcrumbs, },
        computed: {
            ...mapGetters({node: 'getCurrentNode'}),
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
                await this.$store.dispatch('fetchMindPalaceNode', newValue);
            }
        },
    }
</script>

<style scoped>

</style>