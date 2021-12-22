<template>
    <base-node-detail>
        <template v-slot:header>
            <node-header :node="node"></node-header>
        </template>
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
                    <v-container fluid>
                        <v-row>
                            <v-col cols="8" class="mx-0 pa-0">
                                <node-name :value="node.name" @change="updateData => $emit('change', updateData)"></node-name>
                            </v-col>
                            <v-col cols="4" class="d-flex justify-end mx-0 pa-0">

                                <v-icon @click="$router.push({name: 'mypalace', params: {rootId: node.id}})">
                                    mdi-sitemap
                                </v-icon>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-card-title>

                <v-card-text>
                    <node-description
                            :value="node.title"
                            @change="updateData => $emit('change', updateData)"
                    ></node-description>
                </v-card-text>

                <v-card-actions>
                    <node-statistics :statistics="node.learning_statistics"></node-statistics>
                </v-card-actions>
            </v-card>
        </template><!--/NODE GENERAL INFORMATION-->

        <!--NODE MEDIA-->
        <template v-slot:media>
            <node-media></node-media>
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
    import NodeStatistics from '@/components/learning/NodeLearningStatistics'
    import NodeMedia from '@/components/palace/node/media/MindPalaceNodeMedia'


    export default {
        name: "NodeDetail",
        props: ['node'],
        components: {
            BaseNodeDetail, NodeHeader, NodeBodyFactory, NodeName, NodeDescription, NodeTags,
            NodeStatistics, NodeMedia
        }
    }
</script>

<style scoped>

</style>