<template>
    <v-container
            fluid
            class="fill-height ma-0 pa-0"
            style="width: 100%;"
    >
        <mind-palace
                :root="$store.getters.getMindPalace"
                @nodeDetailClick="goToNodeDetail"
        ></mind-palace>
        <v-overlay :value="loading">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    import MindPalace from '@/components/palace/MindPalace'
    import NodeDetail from '@/components/palace/node/NodeDetail'


    export default {
        name: "MindPalaceView",
        props: {
            rootId: { default: null },
        },
        components: { MindPalace, NodeDetail },
        data() {
            return {
                showNodeDetailModal: false,
                loading: false
            }
        },
        methods: {
            goToNodeDetail(nodeId) {
                this.$router.push({name: 'node.detail', params: {'nodeId': nodeId}})
            }
        },
        computed: {
            ...mapGetters({'mindPalaceRootId': 'getMindPalaceRootId'}),
        },
        watch: {
            async rootId() {
                this.loading = true;
                await this.$store.dispatch('fetchMindPalace', this.rootId);
                this.loading = false;
            }
        },
        async mounted() {
            if (this.rootId) {
                this.loading = true;
                await this.$store.dispatch('fetchMindPalace', this.rootId);
                this.loading = false;
            }
        }
    }
</script>

<style scoped>

</style>