<template>
        <v-dialog v-model="show" width="70vw">
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                        small 
                        plain 
                        v-bind="attrs"
                        v-on="on"
                >ADD</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    Add media to the node
                    <v-spacer></v-spacer> 
                    <v-btn plain @click="show = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container fluid>
                        <h3 class="mb-3">Choose media type</h3>
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
                                v-model="createVideoUrlUserInput"
                                label="Enter video url"
                                :rules="urlRules"
                                @change="onUserInputUrlChange"
                        ></v-text-field>
                        <iframe 
                                title="YouTube video player"
                                :src="createVideoUrl" 
                                class="grey lighten-4"
                                width="560" 
                                height="315" 
                                frameborder="0" 
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                        ></iframe>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                            :disabled="!createVideoId"
                            class="success"
                            @click="createNodeMedia"
                    >Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>
const NODE_MEDIA_TYPES = {notSet: 'net_set', image: 'image', youtube: 'youtube'};

export default {
    name: 'NodeMediaCreateModal',
    props: ['nodeId'],
    data: () => {
        return {
            show: false,
            createVideoId: null,
            createVideoUrlUserInput: '',
            nodeMediaTypes: NODE_MEDIA_TYPES,
            createMediaType: NODE_MEDIA_TYPES.notSet,
            urlRules: []
        }
    },
    computed: {
        createVideoUrl() {
            return this.createVideoId? `https://www.youtube.com/embed/${this.createVideoId}`: false
        }
    },
    methods: {
        cleanVideoId() {
            console.log(this.createVideoUrlUserInput)
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = this.createVideoUrlUserInput.match(regExp);
            const videoId = (match&&match[7].length==11)? match[7] : false;
            if (videoId) {
                this.createVideoId = videoId;
                return videoId;
            }
            this.createVideoId = null;
            return false;
        },
        onUserInputUrlChange(newValue) {
            console.log(newValue);
            this.cleanVideoId()
        },
        async createNodeMedia() {
            debugger;
            if (this.createVideoId) {
                await this.$store.dispatch(
                    'addNodeMedia', 
                    [
                        this.$store.getters.getCurrentNodeId, 
                        {
                            'type': this.createMediaType, 
                            config: {youtubeVideoId: this.createVideoId}
                        },
                    ]
                );
                this.createVideoId = null;
                this.createVideoUrlUserInput =  '';
                this.createMediaType = this.nodeMediaTypes.notSet;
                this.show = false;

            }
        },
    }

}
</script>

<style>

</style>