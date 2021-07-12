<template>
    <v-container
            fluid
            class="fill-height ma-0 pa-0 grey lighten-4"
            style="width: 100%;"
    >
        <mind-palace
                :palaceData="$store.getters.getMindPalace"
                @nodeDetailClick="goToNodeDetail"
        ></mind-palace>
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
                showNodeDetailModal: false
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
                await this.$store.dispatch('fetchMindPalace', this.rootId);
            }
        },
        async mounted() {
            if (this.rootId) await this.$store.dispatch('fetchMindPalace', this.rootId);
        }
    }
</script>

<style scoped>

</style>