<template>
    <base-node-body>
        <template v-slot:card-name>Node Body</template>

        <template v-slot:options>
            <div>
                <node-type
                    :value="node.body_type"
                    :types="$store.getters.getEnums.node_body_types"
                    @change="updateData => $emit('change', updateData)"
                ></node-type>
                <v-btn
                        small
                        color="teal lighten-3 white--text"
                        class="ml-2"
                        elevation="0"
                        :loading="loading"
                        :dark="hasChanged"
                        :disabled="!hasChanged"
                        @click="save"
                >Save</v-btn>
            </div>

        </template>

        <template v-slot:editor>
            <text-editor
                    v-model="editorContent"
                    :options="editorOptions"
                    @change="onEditorChange"
            ></text-editor>
        </template>
    </base-node-body>
</template>

<script>
    import _ from 'lodash';
    import { quillEditor } from 'vue-quill-editor'

    import BaseNodeBody from '@/components/palace/node/body/Base'
    import NodeType from '@/components/palace/node/fields/Type'

    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    export default {
        name: "NodeTextBody",
        props: {node: Object, height: {default: '500px'}},
        components: { BaseNodeBody, NodeType, TextEditor: quillEditor },
        data() {
            return {
                hasChanged: false,
                editorOptions: {

                },
                editorContent: '',
                loading: false
            }
        },
        computed: {
            nodeEditorContent() {
                return _.get(this.node.body, 'text_content', '')
            },
            editorContainerHeight() {
                return this.$refs.textEditor.parentNode.offsetHeight
            }
        },
        methods: {
            onEditorChange() {
                if (this.editorContent !== this.nodeEditorContent) {
                    this.hasChanged = true;
                    return
                }
                this.hasChanged = false;
            },
            async save() {
                if (!this.hasChanged) return;
                this.loading = true;
                if (this.editorContent !== this.nodeEditorContent) {
                    const data = { body: { text_content: this.editorContent }};
                    this.$emit('change', data);
                }
                this.hasChanged = false;
                this.loading = false;
            }
        },
        watch: {
            nodeEditorContent(newValue) {
                if (newValue !== this.editorContent) {
                    this.editorContent = newValue;
                }
            }
        },
        async mounted() {
            if (this.nodeEditorContent !== '') this.editorContent = this.nodeEditorContent;
        }
    }
</script>

<style scoped>
    .quill-editor{
        height: 60vh;
    }
</style>