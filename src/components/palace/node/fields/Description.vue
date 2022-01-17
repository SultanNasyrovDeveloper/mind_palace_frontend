<template>
    <v-container fluid class="ma-0 pa-0">
        <div class="mb-2 d-flex align-center">
            <h3>Description</h3>
            <v-btn 
                    small 
                    plain 
                    class="ml-3" 
                    eleation="1" 
                    @click="toggleIsEdited">
                <span>{{ isEdited? 'CLOSE': 'CHANGE' }}</span>
            </v-btn>
        </div>
        <span
                v-if="!isEdited"
                style="cursor: pointer"
                @click="isEdited = true"
        >{{ value || `${$store.getters.getCurrentNodeName} description` }}</span>
        <v-row v-else>
            <v-col cols="12" class="pb-0 mt-2">
                <v-textarea
                        autofocus
                        filled
                        flat
                        clearable
                        dense
                        rows="2"
                        color="teal lighten-2"
                        v-model="inputValue"
                        label="Node description"
                        @input="checkIfChanged"
                ></v-textarea>
            </v-col>
            <v-col cols="12" class="px-0 pt-0">
                <v-btn plain small @click="isEdited = false">Close</v-btn>
                <v-btn 
                        small 
                        plain
                        :disabled="!hasChanged" 
                        color="teal"
                        @click="save">
                    Save</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import _ from 'lodash';

    export default {
        name: "NodeDescription",
        props: ['value'],
        data() {
            return {
                inputValue: '',
                isEdited: false,
                hasChanged: false,
            }
        },
        methods: {
            checkIfChanged(newValue) {
                if (newValue === this.value) {
                    this.hasChanged = false;
                    return
                }
                this.hasChanged = true;
            },
            toggleIsEdited() {
                if (this.isEdited) {
                    this.isEdited = false;
                    return
                }
                this.isEdited = true;
            },
            save() {
                this.checkIfChanged();
                if (this.hasChanged) {
                    this.$emit('change', { title: this.inputValue });
                }
                this.hasChanged = false;
                this.isEdited = false;
            }
        },
        watch: {
            async value(newDescription) {
                this.inputValue = newDescription;
            }
        },
        async mounted() {
            this.inputValue = this.value
        }
    }
</script>

<style scoped>

</style>