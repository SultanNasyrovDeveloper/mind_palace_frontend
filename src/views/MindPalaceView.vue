<template>
    <v-container
            fluid
            class="fill-height ma-0 pa-0 grey lighten-2"
            style="width: 100%;"
    >
        <mind-palace
                :palaceData="$store.getters.getMindPalace"
                @nodeDetailClick="showNodeDetail"
        ></mind-palace>
        <v-dialog v-model="showNodeDetailModal">
            TEST {{ this.nodeId }}
        </v-dialog>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    import isString from 'lodash/isString'

    import MindPalace from '@/components/mind_palace/MindPalace'


    export default {
        name: "MindPalaceView",
        props: {
            rootId: {},
            nodeId: { default: null }
        },
        components: { MindPalace },
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
                debugger;
                if (nodeId !== this.cleanNodeId) {
                    await this.$router.push({
                        name: 'mypalace.node', params: { rootId: this.rootId, nodeId: nodeId }
                    });
                } else {
                    this.showNodeDetailModal = true;
                }
            }
        },
        watch: {
            async rootId() {
                await this.$store.dispatch('fetchMindPalace', this.rootId);
            },
            async nodeId(newValue) {
                if (newValue) {
                    await this.showNodeDetail(this.cleanNodeId);
                }
            }
        },
        async mounted() {
            await this.$store.dispatch('fetchMindPalace', this.rootId);
            if (this.cleanNodeId) {
                await this.showNodeDetail(this.cleanNodeId);
            }

        }
    }
</script>

<style scoped>

</style>