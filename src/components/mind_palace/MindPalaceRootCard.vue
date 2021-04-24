<template>
    <v-card>
        <v-card-title>
            <span style="cursor: pointer !important;" @click="$emit('detailClick', node.id)">
                {{ node.name }}
            </span>
        </v-card-title>
        <v-card-subtitle>
            <span class="mr-3">Stat: 86</span>
            <span class="mr-3">Stat: 86</span>
            <span class="mr-3">Stat: 86</span>
            <span class="mr-3">Stat: 86</span>
        </v-card-subtitle>
        <v-card-actions class="d-flex justify-center">
            <v-btn
                    plain
                    color="green lighten-1"
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
    export default {
        name: "MindPalaceRootCard",
        props: ['node']
    }
</script>

<style scoped>

</style>