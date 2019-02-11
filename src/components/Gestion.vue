<template>
  <div class="gestion">
      <nav>
        <router-link to="/">Accueil</router-link>
        <router-link to="/gestion">Gestionnaire de vidéos</router-link>
      </nav>
      <h1>Gestionnaire de vidéos</h1>
      <!--<ul v-if="this.existingPlaylists !== null">
        <li
          v-for="(item, index) in JSON.parse(JSON.stringify(this.existingPlaylists[0].childSnapshot))"
          :key="index"
        >
          <a
            v-if="item.videos"
            href="#"
            v-on:click="openVideos(item.videos)"
          >{{ item.nom }} - {{ Object.keys( item.videos ).length }} vidéo(s)</a>
          <span v-else href="#">{{ item.nom }} - Aucune vidéo disponible</span>
        </li>
      </ul>-->
    <div class="md-layout-item">
      <md-field v-if="this.existingPlaylists !== null">
        <label for="SelectedPlay">Mes playlists</label>
        <md-select v-model="SelectedPlay" name="SelectedPlay">
          <md-option
            v-for="(item, index) in JSON.parse(JSON.stringify(this.existingPlaylists[0].childSnapshot))"
            v-bind:key="index"
          >
            <span
              v-if="item.videos"
              @click="openVideos(item.videos)"
            >{{ item.nom }} - {{ Object.keys( item.videos ).length }} vidéo(s)</span>
            <span v-else>{{ item.nom }} - Aucune vidéo disponible</span>
          </md-option>
        </md-select>
      </md-field>
    </div>
    
    <b-container v-if="videosIds !== null">
      <b-row>
        <b-col v-for="video in videosIds" :video="video" :key="video.id">
          <div class="card-expansion">
            <md-card>
              <md-card-media>
                <youtube v-bind:video-id="video.id"/>
              </md-card-media>

              <md-card-header>
                <div class="md-title">{{ video.title }}</div>
                <div class="md-subhead">{{ video.channel }}</div>
              </md-card-header>
            </md-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import * as firebase from "firebase/app";

export default {
  data() {
    return {
      SelectedPlay: null,
      videosIds: null,
      existingPlaylists: null
    };
  },
  created() {
    var query = firebase
      .database()
      .ref("utilisateurs/" + firebase.auth().currentUser.uid)
      .orderByKey();
    query.once("value").then(snapshot => {
      this.existingPlaylists = [];
      snapshot.forEach(childSnapshot => {
        this.existingPlaylists.push({ childSnapshot });
      });
    });
  },
  methods: {
    openVideos(videos) {
      this.videosIds = videos;
    }
  }
};
</script>