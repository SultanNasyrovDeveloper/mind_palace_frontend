<template>
    <v-card>
        <v-card-title>
            <v-container fluid class="ma-0 pa-0">
                <v-row>
                    <v-col cols="10">
                        <span>
                                {{ node.name.length < 90? node.name: node.name.slice(0, 87) + '...' }}
                        </span>

                    </v-col>
                    <v-col cols="2" class="d-flex justify-end">
                        <v-btn icon @click="$emit('detailClick', node.id)">
                            <v-icon>mdi-card-text</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-title>
        <v-card-subtitle class="d-flex">
            <div class="mr-5">
                <v-icon small class="my-1 mr-3">mdi-eye</v-icon>
                <span class="caption">{{ node.learning_statistics.views }}</span>
            </div>
            <div class="mr-5">
                <v-icon small class="my-1 mr-3">mdi-repeat</v-icon>
                <span class="caption">{{ node.learning_statistics.repetitions }}</span>
            </div>
            <div class="mr-5">
                <v-icon small class="my-1 mr-3">mdi-lightbulb</v-icon>
                <span class="caption">{{ node.learning_statistics.easiness }}</span>
            </div>
            <div class="mr-5">
                <v-icon small class="my-1 mr-3">mdi-star</v-icon>
                <span class="caption">{{ node.learning_statistics.average_rate }}</span>
            </div>
        </v-card-subtitle>
        <v-card-actions class="d-flex justify-space-between">
            <v-btn
                    plain
                    color="teal darken-2"
                    @click="$emit('createSubnode', node.id)"
            >Create subnode</v-btn>
            <v-btn
                    plain
                    v-if="$store.getters.getMindPalaceRootParentId"
                    color="red lighten-1"
                    @click="$emit('delete', node)"
            >Delete</v-btn>
        </v-card-actions>
    </v-card>
    
</template>

<script>
    import _ from 'lodash';
    
    export default {
        name: "MindPalaceRootCard",
        props: ['node'],
    }
</script>

<style scoped>

</style>