<template>
    <base-node-body>
        <template v-slot:card-name>{{ node.name }}</template>

        <template v-slot:options>
            <div>
                <v-menu>
                    <template v-slot:activator="{ on , attrs }">
                        <v-btn plain v-on="on">{{ node.body.language }}</v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                                v-for="(language, index) in languageModes"
                                :key="index"
                                @click="$emit('change', { body: { language: language.value } })"
                        >
                            <v-list-item-title>{{ language.text }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <node-type
                    :value="node.type"
                    :types="$store.getters.getEnums.neuron_types"
                    @change="updateData => $emit('change', updateData)"
                ></node-type>
                <v-btn dark color="green darken-2" class="ml-2" elevation="0" @click="save">
                    Save
                </v-btn>
            </div>
        </template>

        <template v-slot:editor>
            <code-editor
                    :options="editorOptions"
                    v-model="editorContent"
                    @input="onInput"
            ></code-editor>
        </template>
    </base-node-body>
</template>

<script>
    import _ from 'lodash'
    import { codemirror } from 'vue-codemirror'

    import BaseNodeBody from '@/components/palace/node/body/Base'
    import NodeType from '@/components/palace/node/shared/Type'

    // import style
    import 'codemirror/lib/codemirror.css'
    import '@/assets/code_editor/code_editor.css'

    // import language modes
    import 'codemirror/mode/css/css.js'
    import 'codemirror/mode/django/django.js'
    import 'codemirror/mode/dockerfile/dockerfile.js'
    import 'codemirror/mode/go/go.js'
    import 'codemirror/mode/xml/xml.js'
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/mode/htmlmixed/htmlmixed.js'
    import 'codemirror/mode/jinja2/jinja2.js'
    import 'codemirror/mode/nginx/nginx.js'
    import 'codemirror/mode/php/php.js'
    import 'codemirror/mode/powershell/powershell.js'
    import 'codemirror/mode/python/python.js'
    import 'codemirror/mode/r/r.js'
    import 'codemirror/mode/ruby/ruby.js'
    import 'codemirror/mode/swift/swift.js'
    import 'codemirror/mode/shell/shell.js'
    import 'codemirror/mode/sql/sql.js'
    import 'codemirror/mode/vue/vue.js'
    import 'codemirror/mode/yaml/yaml.js'

    const languageModes = [
        { text: 'Css', value: 'text/css'},
        { text: 'Javascript', value: 'text/javascript'},
        { text: 'Django', value: 'text/x-django'},
        { text: 'Dockerfile', value: 'text/x-dockerfile'},
        { text: 'Go', value: 'text/x-go'},
        { text: 'Html', value: 'text/html'},
        { text: 'Javascript', value: 'text/javascript'},
        { text: 'Nginx conf', value: 'text/x-nginx-conf'},
        { text: 'PHP', value: 'application/x-httpd-php'},
        { text: 'Powershell', value: 'application/x-powershell'},
        { text: 'Python', value: 'text/x-python'},
        { text: 'R', value: 'text/x-rsrc'},
        { text: 'Ruby', value: 'text/x-ruby'},
        { text: 'Shell', value: 'text/x-sh'},
        { text: 'Swift', value: 'text/x-swift'},
        { text: 'Sql', value: 'text/x-sql'},
        { text: 'Vue', value: 'text/x-vue'},
        { text: 'Yaml', value: 'text/x-yaml'},
        { text: 'XML', value: 'application/xml'},
    ];

    export default {
        name: "NodeCodeBody",
        props: ['node'],
        components: { BaseNodeBody, NodeType, CodeEditor: codemirror },
        data() {
            return {
                hasChanged: false,
                editorOptions: {
                    mode: this.getEditorLanguage(),
                    lineNumbers: true,
                    tabSize: 4
                },
                editorContent: '',
                languageModes,
            }
        },
        computed: {
            nodeEditorContent() {
                return this.node.body.hasOwnProperty('code_content') ? this.node.body.code_content : '';
            }
        },
        methods: {
            async initCodeEditor() {
                let dataToUpdate = {};
                let body = this.node.body;
                if (!body.hasOwnProperty('language')) {
                    dataToUpdate.language = this.getEditorLanguage();
                }
                if (!body.hasOwnProperty('color_scheme')) {
                    dataToUpdate.color_scheme = 'base16-dark';
                }
                if (!_.isEmpty(dataToUpdate)) {
                    this.$emit('change', { body: dataToUpdate });
                }
            },
            getEditorLanguage() {
                if (this.node.body.hasOwnProperty('language')) return this.node.body.language;
                return 'text/javascript'
            },
            onInput() {
                if (this.editorContent !== this.nodeEditorContent) this.hasChanged  = true;
                else this.hasChanged = false;
            },
            save() {
                if (this.editorContent !== this.nodeEditorContent) {
                    const data = { body: { code_content: this.editorContent } };
                    this.$emit('change', data);
                }
            }
        },
        watch: {
            nodeEditorContent(newValue) {
                if (newValue !== this.editorContent) {
                    this.editorContent = this.nodeEditorContent;
                }
            }
        },
        async beforeMount() {
            if (!this.node.body.hasOwnProperty('language') ||
                !this.node.body.hasOwnProperty('color_scheme')
            ) {
                await this.initCodeEditor();
            }
        },
        async mounted() {
            this.editorContent = this.nodeEditorContent;
        }
    }
</script>

<style scoped>
</style>