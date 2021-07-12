<template>
    <base-node-body>
        <template v-slot:card-name>{{ node.name }}</template>
        <template v-slot:options>
            <div>
                <node-type
                    :value="node.type"
                    :types="$store.getters.getEnums.neuron_types"
                    @change="updateData => $emit('change', updateData)"
                ></node-type>
                <v-btn dark color="green darken-2" class="ml-2" elevation="0">Save</v-btn>
            </div>
        </template>
    </base-node-body>
</template>

<script>
    import BaseNodeBody from '@/components/palace/node/body/Base'
    import NodeType from '@/components/palace/node/fields/Type'

    export default {
        name: "NodeTranslationBody",
        props: ['node'],
        components: { BaseNodeBody, NodeType }
    }
</script>

<style scoped>

</style>