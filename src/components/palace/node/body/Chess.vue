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
                        <v-card elevation="0">
                            <v-card-title class="d-flex justify-space-between">
                                <v-btn icon @click="chessboard.position(startPosition)"><<</v-btn>
                                <v-btn icon @click="() => { chessboard.flip() }">
                                    <v-icon>mdi-sync</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon>mdi-lead-pencil</v-icon>
                                </v-btn>
                                <v-btn icon :disabled="currentPosition === startPosition">
                                    <v-icon color="success">mdi-check</v-icon>
                                </v-btn>
                            </v-card-title>
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
        data() {
            return {
                isEdited: false,
                mode: 'test',
                game: null,
                chessboard: null,
                currentPosition: null,
            }
        },
        computed: {
            ...mapGetters({
                chessBody: 'getCurrentNodeBody',
                type: 'getCurrentNodeType',
            }),
            startPosition() {
                if (this.chessBody.hasOwnProperty('position')) return this.chessBody.position;
                return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
            },
        },
        components: { BaseNodeBody, NodeType },
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
                console.log(this.startPosition);
                console.log(this.currentPosition);
            },
            onPositionChange(old, new_) {

            },
            validateMove(previousPosition, newPosition) {

            }
        },
        watch: {
            async type() {
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