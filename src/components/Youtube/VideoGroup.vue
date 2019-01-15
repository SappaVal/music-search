<template>
    <div class="VideoGroup">   
        <nav>
            <router-link class="router-color" to="/accueil">Accueil</router-link>
            <router-link class="router-color" to="/gestion">Gestionnaire de vidéos</router-link>
            <md-button class="md-accent" v-on:click="logout">Deconnexion</md-button>
        </nav>
        <form class="md-layout" @submit.prevent="submitForm">
            <md-card class="md-layout-item md-small-size-100">
                <md-card-header>
                    <div class="md-title">Paramètres de recherche :</div>
                </md-card-header>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field>
                            <label for="rechercher">Mot clés</label>
                            <md-input name="rechercher" id="rechercher" v-model="research" />
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                        <div>
                            <md-field>
                                Nombres : 
                                <input type="range" min="1" max="30" step="1" v-model.number="numberResearch" /> {{numberResearch}}
                            </md-field>
                        </div>
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
                                <md-dialog :md-active.sync="showDialog">
                                <md-dialog-title>Ajouter une video</md-dialog-title>

                                <md-tabs md-dynamic-height>
                                    <md-tab md-label="General">
                                        <p>Pour ajouter une vidéo, veuillez choisir une playlist parmis celle créées</p>
                                        <div class="md-layout-item">
                                            <md-field>
                                            <label for="SelectedPlaylist">Playlists disponible : </label>
                                            <md-select v-model="SelectedPlaylist" name="SelectedPlaylist" id="SelectedPlaylist">
                                                <md-option value="fight-club">Fight Club</md-option>
                                                <md-option value="godfather">Godfather</md-option>
                                                <md-option value="godfather-ii">Godfather II</md-option>
                                                <md-option value="godfather-iii">Godfather III</md-option>
                                                <md-option value="godfellas">Godfellas</md-option>
                                                <md-option value="pulp-fiction">Pulp Fiction</md-option>
                                                <md-option value="scarface">Scarface</md-option>
                                            </md-select>
                                            </md-field>
                                        </div>
                                    </md-tab>                                    
                                </md-tabs>

                                <md-dialog-actions>
                                    <md-button class="md-primary" @click="cancelPopup()">Fermer</md-button>
                                    <md-button class="md-primary" @click="addVideo(SelectedPlaylist)">Ajouter</md-button>
                                </md-dialog-actions>
                                </md-dialog>

                                <md-button class="md-primary md-raised" @click="openPopup(video)">Ajouter</md-button>
                        
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
import firebase from 'firebase';
import VideoItem from './VideoItem.vue'

import Axios from 'axios';
import Search from "../../Search.js"

export default {
    props: ['videos'],
    components : {
        VideoItem
    },
    data(){
      return{
        SelectedPlaylist: '',
        research: '',
        numberResearch: 5,
        selectedVideo: null,
        showDialog:false
      }     
    },
    methods: {   
        submitForm(){
            Search({
                apiKey : 'AIzaSyB4hZ11gKkQan9OLFGF9zxhYGrNBwW23jI', /* AIzaSyCPDd0aebOZ9-35yxEnZXDoUZE0I0nkfKo */
                term : this.research,
                items : this.numberResearch
                }, response => this.videos = response
            )
        },
        openPopup : function(v){
            this.showDialog = true;
            this.selectedVideo =  JSON.parse(JSON.stringify(v));            
        },  
        addVideo: function(m){            
            console.log("Fonction addVideo : ");
            this.showDialog = false;
            this.SelectedPlaylist = m;

            console.log(this.SelectedPlaylist);
            console.log(this.selectedVideo.id.videoId);
            console.log(this.selectedVideo.snippet.title);
            console.log(this.selectedVideo.snippet.channelTitle);
            console.log(this.selectedVideo.snippet.description);

            firebase.database().ref('playlist').push().set({
                nom: this.SelectedPlaylist,
                videos: [
                    this.selectedVideo.id.videoId
                ]
            });
        },
        cancelPopup: function(){
            this.SelectedPlaylist = '';
            this.showDialog = false;
        },
        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('login')
                alert('Vous êtes maintenant déconnecté !')
            });
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

    .md-progress-bar{
        margin: 24px;
    }

    .md-button{
        margin-top: -8px;
        vertical-align: center;
    }

    .router-color{
        background-color: #EEEEEE;
    }

</style>

