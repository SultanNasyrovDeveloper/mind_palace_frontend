<template>
    <base-node-body>
        <template v-slot:card-name>{{ node.name }}</template>
        <template v-slot:options>
            <div>
                <node-type
                    :value="node.body_type"
                    :types="$store.getters.getEnums.node_body_types"
                    @change="updateData => $emit('change', updateData)"
                ></node-type>
            </div>
        </template>

        <template v-slot:editor>
            <v-container fluid class="ma-0 pa-0">
                <v-row>
                    <v-col cols="8">
                        <div id="board1" style="width: 100%"></div>
                    </v-col>
                    <v-col cols="4" class="d-flex flex-column">
                        <v-card elevation="0" class="pa-0">
                            <v-card-title class="d-flex justify-space-between mx-0 pa-0">
                                <v-btn icon :disabled="!hasChanged" @click="chessboard.position(startPosition)"><<</v-btn>
                                <v-btn icon @click="() => { chessboard.flip() }">
                                    <v-icon>mdi-sync</v-icon>
                                </v-btn>
                                <v-btn icon @click="setNewGamePosition">
                                    <v-icon>mdi-lead-pencil</v-icon>
                                </v-btn>
                                <v-btn icon :disabled="!hasChanged" @click="setNodePosition">
                                    <v-icon color="success">mdi-check</v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-card-text class="mx-0 px-0 pt-3">
                                <v-textarea
                                        v-model="positionAnalysis"
                                        label="Analysis"
                                        filled
                                        @input="onPositionAnalysisChange"
                                ></v-textarea>
                                <v-container fluid class="d-flex justify-end mt-0 pt-0">
                                    <v-btn
                                            color="success"
                                            plain
                                            :disabled="!analysisChanged"
                                            @click="() => { $emit('change', {body: {analysis: positionAnalysis}}); analysisChanged = false}"
                                    >save</v-btn>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

        </template>
    </base-node-body>
</template>

<script>
    import { mapGetters } from  'vuex';
    import ChessBoard from "chessboardjs-vue";

    import BaseNodeBody from '@/components/palace/node/body/Base'
    import NodeType from '@/components/palace/node/fields/Type'

    const Chess = require('chess.js');

    export default {
        name: "Chess",
        props: ['node'],
        components: { BaseNodeBody, NodeType },
        data() {
            return {
                isEdited: false,
                hasChanged: false,
                mode: 'test',
                game: null,
                chessboard: null,
                currentPosition: null,
                positionAnalysis: '',
                analysisChanged: false,
            }
        },
        computed: {
            ...mapGetters({
                chessBody: 'getCurrentNodeBody',
                type: 'getCurrentNodeType',
                nodeId: 'getCurrentNodeId'
            }),
            startPosition() {
                if (this.chessBody.hasOwnProperty('position')) return this.chessBody.position;
                return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
            },
        },
        methods: {
            async init() {
                this.game = new Chess();
                this.chessboard = ChessBoard(
                    'board1',
                    {
                        draggable: true,
                        position: this.startPosition,
                        onChange: this.onPositionChange,
                        sparePeaces: true
                    }
                );
                this.currentPosition = this.startPosition;
                if (this.chessBody.hasOwnProperty('analysis')) this.positionAnalysis = this.chessBody.analysis;
            },
            onPositionChange(old, new_) {
                this.hasChanged = ChessBoard.objToFen(new_) !== this.startPosition;
            },
            onPositionAnalysisChange() {
                if (this.chessBody.hasOwnProperty('analysis')) {
                    this.analysisChanged = this.positionAnalysis !== this.chessBody.analysis;
                } else {
                    this.analysisChanged = this.positionAnalysis !== '';
                }
            },
            async setNodePosition() {
                const updateData = {body: { position: ChessBoard.objToFen(this.chessboard.position()) }};
                this.$emit('change', updateData);
                this.hasChanged = false;
            },
            setNewGamePosition() {
                this.chessboard.position('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
            }
        },
        watch: {
            async type() {
                await this.init();
            },
            async nodeId() {
                await this.init();
            }
        },
        async mounted() {
            await this.init();
        }
    }
</script>

<style scoped>
</style>