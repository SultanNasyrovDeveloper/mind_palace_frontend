<template>
    <base-node-detail>
        <!--NODE BODY-->
        <template v-slot:body>
            <node-body-factory
                    :node="node"
                    @change="updateData => $emit('change', updateData)"
            ></node-body-factory>
        </template><!--/NODE BODY-->

        <!--NODE GENERAL INFORMATION-->
        <template v-slot:general>
            <v-card>
                <v-card-title>
                    <node-name :value="node.name" @change="updateData => $emit('change', updateData)"></node-name>
                </v-card-title>
                <v-card-subtitle>
                    Node learning statistics
                </v-card-subtitle>
                <v-card-text>
                    <v-container fluid class="mx-0 px-0 pt-0 mt-0">
                        <node-tags
                            :value="node.tags"
                            @change="updateData => $emit('change', updateData)"
                        ></node-tags>
                    </v-container>

                    <node-description
                            :value="node.title"
                            @change="updateData => $emit('change', updateData)"
                    ></node-description>
                </v-card-text>
            </v-card>
        </template><!--/NODE GENERAL INFORMATION-->

        <!--NODE LEARNING WIDGET-->
        <template v-slot:learning>
            <node-detail-learning></node-detail-learning>
        </template><!--/NODE LEARNING WIDGET-->

        <!--NODE MEDIA-->
        <template v-slot:media>
            <v-card>
                <v-card-title>Node media</v-card-title>
            </v-card>
        </template><!--/NODE MEDIA-->

        <!--NODE CONNECTIONS TABLE-->
        <template v-slot:connections>
            <v-card>
                <v-card-title>Connections table</v-card-title>
            </v-card>
        </template><!--/NODE CONNECTIONS TABLE-->
    </base-node-detail>
</template>

<script>
    import BaseNodeDetail from '@/components/palace/node/BaseNodeDetail'
    import NodeBodyFactory from '@/components/palace/node/BodyFactory'
    import NodeDescription from '@/components/palace/node/fields/Description'
    import NodeHeader from '@/components/palace/node/fields/Header'
    import NodeName from '@/components/palace/node/fields/Name'
    import NodeTags from '@/components/palace/node/fields/Tags'

    import NodeDetailLearning from '@/components/learning/NodeDetailLearning'

    export default {
        name: "NodeDetail",
        props: ['node'],
        components: {
            BaseNodeDetail, NodeHeader, NodeBodyFactory, NodeName, NodeDescription, NodeTags,
            NodeDetailLearning
        }
    }
</script>

<style scoped>

</style>