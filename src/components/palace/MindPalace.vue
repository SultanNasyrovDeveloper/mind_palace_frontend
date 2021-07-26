<template>
    <v-container fluid class="fill-height d-block">
        <v-row>
            <v-col cols="12" class="d-flex justify-end">
                <v-btn
                        plain
                        :to="{name: 'mypalace', params: {rootId: $store.getters.getMindPalaceRootParentId}}"
                >
                    <v-icon v-if="$store.getters.getMindPalaceRootParentId" x-large color="grey">
                        mdi-arrow-up-box
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row justify="center" class="mb-3">
            <v-col cols="12" sm="6" md="4">
                <mind-palace-root-card
                        :node="palaceData"
                        @detailClick="(nodeId) => $emit('nodeDetailClick', nodeId)"
                        @delete="confirmNodeDelete"
                        @createSubnode="openCreateSubnodeForm"
                ></mind-palace-root-card>
            </v-col>
        </v-row>
        <draggable v-model="palaceData.children" draggable=".item">
            <v-row no-gutters>
                <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        lg="2"
                        v-for="node in palaceData.children"
                        :key="node.id"
                >
                    <mind-palace-node-card
                            :node="node"
                            @detailClick="(nodeId) => $emit('nodeDetailClick', nodeId)"
                            @deleteClick="confirmNodeDelete"
                            @createSubnode="openCreateSubnodeForm"
                            class="item"
                    ></mind-palace-node-card>
                </v-col>
            </v-row>
        </draggable>
        <v-dialog
                v-model="nodeDeleteConfirmationModal"
                max-width="600"
        >
            <node-delete-confirmation-card
                    :node="nodeToDelete"
                    @close="nodeDeleteConfirmationModal = false"
                    @delete="handleNodeDeletion"
            ></node-delete-confirmation-card>
        </v-dialog>
        <!-- Node create modal -->
        <v-dialog
                v-model="nodeCreateModal"
                max-width="600"
        >
            <node-create-simple-form
                    :parentId="nodeToCreateParentId"
                    @close="nodeCreateModal = false; newNodeParentId = null"
                    @save="handleNodeCreation"
            ></node-create-simple-form>
        </v-dialog>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex';

    import draggable from 'vuedraggable';

    import MindPalaceRootCard from '@/components/palace/MindPalaceRootCard';
    import MindPalaceNodeCard from '@/components/palace/MindPalaceNodeCard';
    import NodeCreateSimpleForm from '@/components/palace/NodeCreateSimpleForm';
    import NodeDeleteConfirmationCard from '@/components/palace/NodeDeleteConfirmationCard';

    export default {
        name: "MindPalace",
        components: {
            draggable,
            MindPalaceRootCard, MindPalaceNodeCard, NodeCreateSimpleForm, NodeDeleteConfirmationCard
        },
        props: ['palaceData'],
        data() {
            return {
                nodeCreateModal: false,
                nodeToCreateParentId: null,

                nodeToDelete: null,
                nodeDeleteConfirmationModal: false
            }
        },
        methods: {
            ...mapActions(['createNode']),
            confirmNodeDelete(node) {
                this.nodeToDelete = node;
                this.nodeDeleteConfirmationModal = true;
            },
            openCreateSubnodeForm(parentId) {
                this.nodeToCreateParentId = parentId;
                this.nodeCreateModal = true;
            },
            async handleNodeCreation(nodeData) {
                await this.$store.dispatch('createNode', nodeData);
                this.nodeCreateModal = false;
                this.nodeToCreateParentId = null;

            },
            async handleNodeDeletion(nodeId) {
                await this.$store.dispatch('deleteNode', nodeId);
                this.nodeDeleteConfirmationModal = false;
                if (this.$store.getters.getMindPalace === {}) {
                    this.$router.push({name: 'mypalace', params: { rootId: 1 }})
                }
                this.nodeToDelete = null;
            }
        }
    }
</script>

<style scoped>

</style>