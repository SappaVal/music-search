<template>
    <div class="VideoGroup">
        <form novalidate class="md-layout">
            <md-card class="md-layout-item md-small-size-100">
                <md-card-header>
                    <div class="md-title">Paramètres de recherche :</div>
                </md-card-header>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field>
                            <label for="rechercher">Mot clés</label>
                            <md-input name="rechercher" id="rechercher" v-model="form.research" />
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                        <md-field>
                            <label for="numberResearch">Nombre de réponse voulu</label>
                            <md-input name="numberResearch" id="numberResearch" v-model="form.numberResearch"  />
                        </md-field>
                    </div>
                </div>
                <md-card-actions>
                    <md-button type="submit" class="md-primary">Rechercher</md-button>
                </md-card-actions>
            </md-card>
        </form>
        
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
import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

export default {
    props: ['videos'],
    components : {
        VideoItem
    },
    data: () => ({
      form: {
        research: null,
        numberResearch: null
      }
    }),
    validations: {
      form: {
        research: {
          required,
          minLength: minLength(3)
        },
        numberResearch: {
          required,
          minLength: minLength(3)
        }
      }
    },
    methods: {      
      clearForm () {
        this.form.research = null
        this.form.numberResearch = null
      }     
    }
  }
</script>


<style scoped>
    .md-progress-bar 
    {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }

    .md-card 
    {
        width: 500px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
    }
</style>

