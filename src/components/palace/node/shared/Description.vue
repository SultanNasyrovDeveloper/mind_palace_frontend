<template>
    <v-container fluid class="ma-0 pa-0">
        <span
                v-if="!isEdited"
                style="cursor: pointer"
                @click="isEdited = true"
        >{{ value || 'Description' }}</span>
        <v-row v-else>
            <v-col cols="12" class="pb-0">
                <v-textarea
                        autofocus
                        filled
                        flat
                        clearable
                        dense
                        rows="2"
                        v-model="inputValue"
                        label="Node description"
                        @input="checkIfChanged"
                ></v-textarea>
            </v-col>
            <v-col cols="12" class="px-0 pt-0">
                <v-btn plain small @click="isEdited = false">Close</v-btn>
                <v-btn plain small :disabled="!hasChanged" color="success" @click="save">Save</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
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