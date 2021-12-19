<template>
    <v-card>
        <v-card-title>Create node</v-card-title>
        <v-card-text>
            <v-form id="node-create-simple" @submit="onSaveClick">
                <v-text-field autofocus v-model="name" label="Name"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn plain @click="$emit('close')">Close</v-btn>
            <v-btn 
                    plain 
                    type="submit"
                    form="node-create-simple" 
                    color="success" 
                    @click="onSaveClick"
            >Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "NodeCreateSimpleForm",
        props: ['parentId'],
        data() {
            return {
                name: ''
            }
        },
        methods: {
            formSubmit() {
                console.log('Test')
            },
            onSaveClick() {
                if (!this.parentId) console.log('Error! Parent id not specified');
                const data = {
                    parent: this.parentId,
                    name: this.name
                };
                this.$emit('save', data);
                this.name = '';
            }
        }
    }
</script>

<style scoped>

</style>