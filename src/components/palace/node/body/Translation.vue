<template>
    <base-node-body>
        <template v-slot:card-name>Node body</template>
        <template v-slot:options>
            <div>
                <node-type
                    :value="node.body_type"
                    :types="$store.getters.getEnums.node_body_types"
                    @change="updateData => $emit('change', updateData)"
                ></node-type>
                <v-btn 
                        small 
                        color="teal lighten-3" 
                        class="ml-2 white--text" 
                        elevation="0"
                >Save</v-btn>
            </div>
        </template>
        <template v-slot:editor>
            <v-container fluid>
                <h3>Foreign language text</h3>
                <v-textarea placeholder="Input text in foreign language"></v-textarea>
                <h3>Mother language text</h3>
                <v-textarea placeholder="Input text in mother tongue"></v-textarea>
            </v-container>
        </template>
    </base-node-body>
</template>

<script>
    import _ from 'lodash';

    import BaseNodeBody from '@/components/palace/node/body/Base';
    import NodeType from '@/components/palace/node/fields/Type';

    export default {
        name: "NodeTranslationBody",
        props: ['node'],
        components: { BaseNodeBody, NodeType },
        data: () => {
            return {

            }
        },
        computed: {
            translationBody() {
                return _.get(_.get(this.node, 'body', {}), 'translation', null);
            }
        },
        methods: {
            async init() {
                if (_.get(this.node, 'id', null) && !this.translationBody) {
                    await this.$store.dispatch(
                        'updateNode', 
                        [this.node.id, {'body': {'translation': {}}}]
                    );
                }
            }
        }
    }
</script>

<style scoped>

</style>