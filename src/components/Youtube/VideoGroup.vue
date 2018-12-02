<template>
    <div class="VideoGroup">
        <md-field>
            <label>Rechercher</label>
            <md-input v-model="type"></md-input>
        </md-field>
        
        <div v-for="video in videos" 
                :video="video"
                :key="video.id.videoId">
            <div class="card-expansion">
                <md-card>
                    <md-card-media>
                        <youtube v-bind:video-id="video.id.videoId" />
                    </md-card-media>

                    <md-card-header>
                    <div class="md-title">{{ video.snippet.title }}</div>
                    <div class="md-subhead">{{ video.snippet.channelTitle }}</div>
                    </md-card-header>

                    <md-card-expand>
                    <md-card-actions md-alignment="space-between">
                        <div>
                        <md-button>Ajouter</md-button>
                        </div>

                        <md-card-expand-trigger>
                        <md-button>Description</md-button>
                        </md-card-expand-trigger>
                    </md-card-actions>

                    <md-card-expand-content>
                        <md-card-content>
                            {{ video.snippet.description }}
                        </md-card-content>
                    </md-card-expand-content>
                    </md-card-expand>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import VideoItem from './VideoItem.vue'

export default {
    props: ['videos'],
    data: () =>({
        type: null
    }),

    components : {
        VideoItem
    }
}
</script>

<style>

.md-card {
  width: 500px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}

</style>
