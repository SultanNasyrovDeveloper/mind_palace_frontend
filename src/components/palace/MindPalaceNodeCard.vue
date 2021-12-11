<template>
    <v-card class="ma-1" max-height="350">
        <v-card-title>
            <span
                    class="body-2"
                    style="cursor: pointer"
                    @click="$router.push({name: 'mypalace', params: { rootId: node.id }})"
            >{{ nameSized }}</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="$emit('detailClick', node.id)">
                <v-icon small>mdi-card-text</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-subtitle class="d-flex flex-column">
            <v-container fluid class="d-flex ma-0 pa-0 mb-3 ">
                <div class="mr-3">
                    <v-icon x-small class="my-1 mr-2">mdi-eye</v-icon>
                    <span class="caption">{{ node.learning_statistics.views }}</span>
                </div>
                <div class="mr-3">
                    <v-icon x-small class="my-1 mr-2">mdi-repeat</v-icon>
                    <span class="caption">{{ node.learning_statistics.repetitions }}</span>
                </div>
                <div class="mr-3">
                    <v-icon x-small class="my-1 mr-2">mdi-lightbulb</v-icon>
                    <span class="caption">{{ node.learning_statistics.easiness }}</span>
                </div>
                <div class="mr-3">
                    <v-icon x-small class="my-1 mr-2">mdi-star</v-icon>
                    <span class="caption">{{ node.learning_statistics.average_rate }}</span>
                </div>
            </v-container>
            <v-container fluid class="ma-o pa-0 d-flex justify-space-between">
                <v-btn
                        x-small plain
                        class="ml-0 pl-0"
                        color="green lighten-1"
                        @click="$emit('createSubnode', node.id)"
                >Create subnode</v-btn>
                <v-btn x-small plain color="red lighten-1" @click="$emit('deleteClick', node)">Delete</v-btn>
            </v-container>
        </v-card-subtitle>

        <div style="overflow-y: scroll; min-height: 220px; max-height: 220px">
            <v-list>
                <v-list-item
                        dense
                        v-for="subnode in node.children"
                        :key="subnode.id"
                >
                    <v-row>
                        <v-col cols="8" class="ma-0 py-0">
                            <span
                                    class="caption"
                                    style="cursor: pointer"
                                    @click="$router.push({name: 'mypalace', params: {rootId: subnode.id}})"
                            >{{ subnode.name }}</span>
                        </v-col>
                        <v-col cols="4" class="ma-0 py-0 d-flex justify-space-around">
                            <v-icon
                                    x-small
                                    color="red lighten-2"
                                    style="cursor: pointer;"
                                    @click="$emit('deleteClick', subnode)"
                            >
                                mdi-delete
                            </v-icon>
                            <v-icon
                                    x-small
                                    style="cursor: pointer"
                                    @click="$emit('detailClick', subnode.id)"
                            >
                                mdi-card-text
                            </v-icon>
                        </v-col>
                    </v-row>
                </v-list-item>
            </v-list>
        </div>


    </v-card>
</template>

<script>
    export default {
        name: "MindPalaceNodeCard",
        props: ['node'],
        computed: {
            nameSized() {
                const length = 20;
                if (this.node.name && this.node.name.length > length) {
                    return this.node.name.slice(0, length) + '...'
                }
                return this.node.name
            }
        }
    }
</script>

<style scoped>

</style>