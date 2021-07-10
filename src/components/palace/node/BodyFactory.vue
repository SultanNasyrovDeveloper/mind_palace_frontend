<template>
    <v-container fluid class="fill-height py-0">
        <v-row class="fill-height">
            <v-col cols="12" class="fill-height pa-0">
                <node-code-body
                        v-if="node.type === 'code'"
                        :node="node"
                        @change="newData => $emit('change', newData)"
                ></node-code-body>
                <node-chess-body
                        v-else-if="node.type === 'chess'"
                        :node="node"
                        @change="newData => $emit('change', newData)"
                ></node-chess-body>
                <node-text-body
                        v-else-if="node.type === 'text'"
                        :node="node"
                        @change="newData => $emit('change', newData)"
                ></node-text-body>
                <node-translation-body
                        v-else-if="node.type === 'translation'"
                        :node="node"
                        @change="newData => $emit('change', newData)"
                ></node-translation-body>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import NodeChessBody from '@/components/palace/node/body/Chess'
    import NodeTextBody from '@/components/palace/node/body/Text'
    import NodeCodeBody from '@/components/palace/node/body/Code'
    import NodeTranslationBody from '@/components/palace/node/body/Translation'

    export default {
        name: "BaseBody",
        props: ['node'],
        components: { NodeChessBody, NodeCodeBody, NodeTranslationBody, NodeTextBody }
    }
</script>

<style scoped>

</style>