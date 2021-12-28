<template>
    <v-card>

        <v-card-title>
            <span>Media</span>    
            <v-spacer></v-spacer>
            <v-btn small plain @click="showAddMediaModal = true">ADD</v-btn>
        </v-card-title>

        <v-card-text>
            <v-container fluid>
                <v-row>
                    <v-col 
                            v-for="media in $store.getters.getCurrentNodeMedia" 
                            :key="media.id" 
                            cols="2" 
                            class="pa-1"
                    >
                        <v-btn style="min-height: 70px; min-width: 100%">Test</v-btn>
                    </v-col>
                </v-row>
                <span v-if="$store.getters.getCurrentNodeMedia.length === 0">No media objects...</span>
            </v-container>
        </v-card-text>

        <v-dialog v-model="showAddMediaModal" width="70vw">
            <v-card>
                <v-card-title>Add media to the node</v-card-title>
                <v-card-text>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="4">
                                <v-btn style="min-height: 75px" @click="createMediaType = nodeMediaTypes.youtube">
                                    Youtube
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                    
                    <v-container 
                            fluid 
                            v-if="createMediaType === nodeMediaTypes.youtube" 
                            class="d-flex align-center flex-column"
                            style="min-height: 40vh" 
                    >
                        <v-text-field
                                label="Enter video url"
                        ></v-text-field>
                        <iframe 
                                title="YouTube video player"
                                width="560" 
                                height="315" 
                                src="https://www.youtube.com/embed/lJIrF4YjHfQ" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                        ></iframe>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
    const NODE_MEDIA_TYPES = {notSet: 'net_set', image: 'image', youtube: 'youtube'}

    export default {
        name: "Media",
        data() {
           return {
               showAddMediaModal: false,
               nodeMediaTypes: NODE_MEDIA_TYPES,
               createMediaType: NODE_MEDIA_TYPES.notSet
           }
        }
    }
</script>

<style scoped>

</style>