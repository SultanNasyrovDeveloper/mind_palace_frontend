<template>

    <v-dialog v-model="dialog">
        <v-row>
            <v-col cols="12" sm="9" md="6" xl="4">
                <v-card>
                    <v-card-title>
                        Confirm deletion of node {{ nodeId }}.
                    </v-card-title>
                    <v-card-subtitle>
                        You are trying to delete node with ID={{ nodeId }}.
                        Node will be deleted completely and you wont be able to revert this operation.
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn plain x-large color="red lighten-1">Delete</v-btn>
                        <v-btn plain x-large @click="$emit('cancel')">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-dialog>
</template>

<script>
    export default {
        name: "NodeDeleteConfirmationModal",
        props: ['dialog', 'nodeId'],

    }
</script>

<style scoped>

</style>