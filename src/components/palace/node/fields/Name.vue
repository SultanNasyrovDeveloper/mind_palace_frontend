<template>
    <v-container fluid class="ma-0 pa-0">
        <h3 v-if="!isEdited" style="cursor: pointer" @click="isEdited = true">{{ value }}</h3>
        <v-row v-else>
            <v-col cols="10" class="my-0 py-0">
                <v-text-field
                        autofocus
                        label="Name"
                        v-model="inputValue"
                        @input="checkIfChanged"
                        @blur="onBlur"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
    export default {
        name: "NodeName",
        props: ['value'],
        data() {
            return {
                inputValue: '',
                isEdited: false,
                hasChanged: false
            }
        },
        methods: {
            checkIfChanged(newValue) {
                if (newValue === this.value) {
                    this.hasChanged = false;
                } else {
                    if (!this.hasChanged) this.hasChanged = true;
                }
            },
            async onBlur(event) {
                if (!this.hasChanged) {
                    this.isEdited = false;
                    this.hasChanged = false;
                    return
                }
                this.$emit('change', { name: this.inputValue });
                this.isEdited = false;
                this.hasChanged = false;
            }
        },
        watch: {
            async value(newNameValue) {
                this.inputValue = newNameValue;
            },
        },
        async mounted() {
            this.inputValue = this.value;
        }
    }
</script>

<style scoped>

</style>