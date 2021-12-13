<template>
    <v-card>

        <v-card-title>
            NodeMedia
            <v-spacer></v-spacer>
            <media-create-modal :nodeId="$store.getters.getCurrentNodeId"></media-create-modal>
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
                        <v-card 
                                style="min-height: 70px; min-width: 100%; cursor: pointer;"
                                class="d-flex justify-center align-center"
                                @click="showMediaDetailModal = true; mediaDetail = media"
                        >
                            <v-img 
                                    :src="`http://img.youtube.com/vi/${media.config.youtubeVideoId}/0.jpg`"
                            ></v-img>
                        </v-card>
                    </v-col>
                </v-row>
                <span v-if="$store.getters.getCurrentNodeMedia.length === 0">No media objects...</span>
            </v-container>
        </v-card-text>
        <v-dialog v-model="showMediaDetailModal" width="85vw">
            <v-card>
                <v-card-text class="d-flex justify-center pa-5">
                    <iframe 
                        title="YouTube video player"
                        :src="mediaDetailVideoUrl" 
                        class="grey lighten-4"
                        width="100%" 
                        height="700" 
                        frameborder="0" 
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                    ></iframe>
                    
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
    import _ from 'lodash';
    import MediaCreateModal from '@/components/palace/node/media/NodeMediaCreateModal';

    export default {
        name: "MindPalaceNodeMedia",
        components: { MediaCreateModal },
        data() {
           return {
               mediaDetail: {},
               showAddMediaModal: false,
               showMediaDetailModal: false,
               mediaDetail: {}
           }
        },
        computed: {
            mediaDetailVideoUrl() {
                if (_.has(this.mediaDetail, 'type') && this.mediaDetail.type === 'youtube') {
                    return `https://www.youtube.com/embed/${this.mediaDetail.config.youtubeVideoId}`;
                }
            }
        }
    };
</script>

<style scoped>

</style>