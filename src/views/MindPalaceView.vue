<template>
    <v-container
            fluid
            class="fill-height ma-0 pa-0 grey lighten-4"
            style="width: 100%;"
    >
        <mind-palace
                :palaceData="$store.getters.getMindPalace"
                @nodeDetailClick="showNodeDetail"
        ></mind-palace>
        <v-dialog fullscreen v-model="showNodeDetailModal">
            <node-detail
                    :node="$store.getters.getCurrentNode"
                    @close="showNodeDetailModal = false"
                    @change="handleCurrentNodeChange"
            ></node-detail>
        </v-dialog>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    import isString from 'lodash/isString'

    import MindPalace from '@/components/mind_palace/MindPalace'
    import NodeDetail from '@/components/mind_palace/node/NodeDetail'


    export default {
        name: "MindPalaceView",
        props: {
            rootId: { default: null },
            nodeId: { default: null }
        },
        components: { MindPalace, NodeDetail },
        data() {
            return {
                showNodeDetailModal: false
            }
        },
        computed: {
            ...mapGetters({'mindPalaceRootId': 'getMindPalaceRootId'}),
            cleanNodeId() {
                if (isString(this.nodeId)) return parseInt(this.nodeId);
                return this.nodeId
            }
        },
        methods: {
            async showNodeDetail(nodeId) {
                if (nodeId !== this.cleanNodeId) {
                    await this.$router.push({
                        name: 'mypalace.node', params: { rootId: this.rootId, nodeId: nodeId }
                    });
                } else {
                    this.showNodeDetailModal = true;
                }
            },
            async handleCurrentNodeChange(updateData) {
                await this.$store.dispatch(
                    'updateNode',
                    [this.$store.getters.getCurrentNodeId, updateData]
                );
            }
        },
        watch: {
            async rootId() {
                await this.$store.dispatch('fetchMindPalace', this.rootId);
            },
            async nodeId(newNodeId) {
                if (newNodeId) {
                    if (this.cleanNodeId !== this.$store.getters.getCurrentNodeId) {
                        await this.$store.dispatch('fetchMindPalaceNode', this.cleanNodeId);
                    }
                    await this.showNodeDetail(this.cleanNodeId);
                }
            }
        },
        async mounted() {
            if (this.rootId) await this.$store.dispatch('fetchMindPalace', this.rootId);
            if (this.cleanNodeId) {
                if (this.cleanNodeId !== this.$store.getters.getCurrentNodeId) {
                    await this.$store.dispatch('fetchMindPalaceNode', this.cleanNodeId);
                }
                await this.showNodeDetail(this.cleanNodeId);
            }
        }
    }
</script>

<style scoped>

</style>