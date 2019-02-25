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
      <md-field v-if="this.existingPlaylists !== null && this.existingPlaylists !== undefined">
        <label for="SelectedPlay">Mes playlists</label>
        <md-select v-model="SelectedPlay" name="SelectedPlay">
          <md-option
            v-for="(item, index) in JSON.parse(JSON.stringify(this.existingPlaylists[0].childSnapshot))"
            v-bind:key="index"
          >&nbsp;
            <span
              v-if="item.videos"
              @click="openVideos(item.videos, index)"
            >{{ item.nom }} - {{ Object.keys( item.videos ).length }} vidéo(s)</span>
          </md-option>
        </md-select>
      </md-field>
    </div>
    
    <div v-bind:id="this.playlistId">
    <b-container v-if="videosIds !== null">
      <b-row>
        <b-col v-for="(video, index) in JSON.parse(JSON.stringify(videosIds))" v-bind:key="index">
          <div class="card-expansion" v-bind:id="index">
            <md-card>
              <md-card-media>
                <youtube v-bind:video-id="video.id"/>
              </md-card-media>

              <md-card-header>
                <div class="md-title">{{ video.title }}</div>
                <div class="md-subhead">{{ video.channel }}</div>
              </md-card-header>

              <div>
                <md-button class="md-primary" @click="openPopup()">Modifier</md-button>
                <md-button class="md-accent" @click="removeVideoFromPlaylist(index)">Supprimer</md-button>
              </div>
            </md-card>
          </div>
        </b-col>
      </b-row>
      <br>
      <md-button class="md-accent md-raised" style="float: right;" @click="removePlaylist()">Supprimer la playlist</md-button>
    </b-container>
    </div>

    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-tabs md-dynamic-height>
          <md-tab md-label="General">
            <p>Modifier une vidéo</p>
            <div class="md-layout-item">
              <md-field>
                <label for="renommer">Modifier le nom de la vidéo</label>
                <md-input name="renommer" id="renommer" v-model="newVideoName"/>
              </md-field>
              <md-field v-if="this.existingPlaylists !== null && this.existingPlaylists !== undefined">
                <label for="changePlaylist">Playlists disponible :</label>
                <md-select v-model="changePlaylist" name="changePlaylist" id="changePlaylist">
                  <md-option
                    v-for="(item, index) in JSON.parse(JSON.stringify(this.existingPlaylists[0].childSnapshot))"
                    v-bind:key="index"
                  >{{ item.nom }}</md-option>
                </md-select>
              </md-field>
            </div>
            <md-dialog-actions>
              <md-button class="md-primary" @click="cancelPopup()">Fermer</md-button>
              <md-button class="md-primary" @click="changeVideoPlaylist(changePlaylist)">Modifier</md-button>
            </md-dialog-actions>
          </md-tab>
        </md-tabs>
      </md-dialog>
    </div>

  </div>
</template>

<script>
import * as firebase from "firebase/app";

export default {
  data() {
    return {
      SelectedPlay: null,
      videosIds: null,
      playlistId: null,
      showDialog: false,
      existingPlaylists: null,
      changePlaylist: "",
      newVideoName: ""
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
    openVideos(videos, pid) {
      this.videosIds = videos;
      this.playlistId = pid;
    },
    openPopup: function() {
      this.showDialog = true;
    },
    cancelPopup: function() {
      this.showDialog = false;
    },
    changeVideoPlaylist: function(playlist) {
      this.changePlaylist = playlist;
      console.log("Nouvelle playlist : " + this.changePlaylist);
    },
    removeVideoFromPlaylist: function(vid) {
      firebase
        .database()
        .ref("utilisateurs/" + firebase.auth().currentUser.uid + "/playlists/" + this.playlistId + "/videos/" + vid)
        .remove();
      document.getElementById(vid).style.display = "none";
    },
    removePlaylist: function() {
      firebase
        .database()
        .ref("utilisateurs/" + firebase.auth().currentUser.uid + "/playlists/" + this.playlistId)
        .remove();
      document.location.reload(true);
    }
  }
};
</script>