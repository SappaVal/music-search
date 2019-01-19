<template>
    <div class="gestion">
      <nav>
        <router-link to="/">Accueil</router-link>
        <router-link to="/gestion">Gestionnaire de vidéos</router-link>
      </nav>
        <h1>Gestionnaire de vidéos</h1>
        Mes playlists :       
          <ul>
            <li v-for="(item, index) in JSON.parse(JSON.stringify(this.playlists))" :key="index">              
              <a href="#" v-on:click="openVideos(item.videos.value.id)">{{ item.nom }} - {{ Object.keys( item.videos ).length }} vidéo(s)</a>
            </li>
          </ul>        
        <div v-for="video in videosIds" 
                :video="video"
                :key="video">
            <div class="card-expansion">
                <md-card>
                    <md-card-media>
                        <youtube v-bind:video-id="video" />
                    </md-card-media>

                    <md-card-header>
                      <div class="md-title">{{ video.title }}</div>
                      <div class="md-subhead">{{ video.channel }}</div>
                    </md-card-header>
                    <md-card-expand>
                      <md-card-actions>
                        <md-card-expand-trigger>
                          <md-button>Description</md-button>
                        </md-card-expand-trigger>
                      </md-card-actions>

                      <md-card-expand-content>
                          <md-card-content>
                              {{ video.desc }}
                          </md-card-content>
                      </md-card-expand-content>
                    </md-card-expand>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';

export default {
  
  data(){
    return {
      videosIds : null,
      playlists: null,
      playlistObserver: null
    }
  },
  created()
  {
    this.playlistObserver = firebase.database().ref('utilisateurs/' + firebase.auth().currentUser.uid).child('playlists');
    this.playlistObserver.on('value', (snap) => {
      this.playlists = snap.val();
    });
  },
  methods:{
    openVideos(videos) {
      this.videosIds = videos;
    }
  }
}
</script>
