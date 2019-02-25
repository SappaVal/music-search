<template>
  <div class="gestion">
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/gestion">Gestionnaire de vidéos</router-link>
    </nav>
    <h1>Gestionnaire de vidéos</h1>

    <div class="md-layout-item">
      <md-field v-if="this.existingPlaylists !== null && this.existingPlaylists !== undefined">
        <label for="SelectedPlay">Mes playlists</label>
        <md-select v-model="SelectedPlay" name="SelectedPlay">
          <md-option
            v-for="(item, index) in JSON.parse(JSON.stringify(this.existingPlaylists[0].childSnapshot))"
            :key="index"
            v-bind:value="item.nom"
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
                <md-button class="md-primary" @click="openPopup(index)">Modifier</md-button>
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
                    :key="index"
                    v-bind:value="index"
                  >&nbsp;{{ item.nom }}</md-option>
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
      <md-dialog-alert
        :md-active.sync="created"
        md-content="Element correctement modifié !"
        md-confirm-text="Au top!"
      />
      <md-dialog-alert
        :md-active.sync="failed"
        md-content="La requête a échoué :("
        md-confirm-text="Pas cool..."
      />
      <md-dialog-alert
        :md-active.sync="wrong"
        md-content="Il faut au moins un nouveau nom ou une nouvelle playlist!"
        md-confirm-text="Ok!"
      />
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";

export default {
  data() {
    return {
      SelectedPlay: null,
      created: false,
      failed: false,
      wrong: false,
      videosIds: null,
      playlistId: null,
      showDialog: false,
      existingPlaylists: null,
      changePlaylist: "",
      newVideoName: "",
      videoToMove: null
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
    openPopup: function(vidToMove) {
      this.showDialog = true;
      this.videoToMove = vidToMove;
    },
    cancelPopup: function() {
      document.location.reload(true);
      this.showDialog = false;
    },
    changeVideoPlaylist: function(playlist) {
      // Fonction de modification de playlist : changement de nom d'une vidéo // Changement de playlist par vidéo
      this.changePlaylist = playlist;

      // Préparation de la requête
      var query = firebase
        .database()
        .ref(
          "utilisateurs/" + firebase.auth().currentUser.uid + "/playlists/" + this.playlistId + "/videos/" + this.videoToMove
        )
        .orderByKey();

      if(this.newVideoName !== "" && this.changePlaylist !== "")
      {
        // Cas de changement de nom de vidéo et changement de playlist
        // Ajout de la vidéo modifiée
        query.once("value").then(snapshot => {
          firebase
          .database()
          .ref(
            "utilisateurs/" +
              firebase.auth().currentUser.uid +
              "/playlists/" +
              this.changePlaylist +
              "/videos"
          )
          .push({
            id: snapshot.val().id,
            desc: snapshot.val().desc,
            title: this.newVideoName,
            channel: snapshot.val().channel
          })
          .then(
            () => {
              // Suppression de la vidéo non modifiée
              firebase
              .database()
              .ref("utilisateurs/" + firebase.auth().currentUser.uid + "/playlists/" + this.playlistId + "/videos/" + this.videoToMove)
              .remove();
              this.created = true;
            },
            () => {
              this.failed = true;
            }
          );
        });

      } else if(this.newVideoName !== "" && this.changePlaylist == "" || this.changePlaylist == this.playlistId) {
        // Cas du changement de nom de vidéo
        // Ajout de la vidéo modifiée
        query.once("value").then(snapshot => {
          firebase
          .database()
          .ref(
            "utilisateurs/" +
              firebase.auth().currentUser.uid +
              "/playlists/" +
              this.playlistId +
              "/videos"
          )
          .push({
            id: snapshot.val().id,
            desc: snapshot.val().desc,
            title: this.newVideoName,
            channel: snapshot.val().channel
          })
          .then(
            () => {
              // Suppression de la vidéo non modifiée
              firebase
              .database()
              .ref("utilisateurs/" + firebase.auth().currentUser.uid + "/playlists/" + this.playlistId + "/videos/" + this.videoToMove)
              .remove();
              this.created = true;
            },
            () => {
              this.failed = true;
            }
          );
        });

      } else if(this.newVideoName == "" && this.changePlaylist !== "" && this.changePlaylist !== this.playlistId) {
        // Cas du changement de playlist
        // Ajout de la vidéo modifiée
        query.once("value").then(snapshot => {
          firebase
          .database()
          .ref(
            "utilisateurs/" +
              firebase.auth().currentUser.uid +
              "/playlists/" +
              this.changePlaylist +
              "/videos"
          )
          .push({
            id: snapshot.val().id,
            desc: snapshot.val().desc,
            title: snapshot.val().title,
            channel: snapshot.val().channel
          })
          .then(
            () => {
              // Suppression de la vidéo non modifiée
              firebase
              .database()
              .ref("utilisateurs/" + firebase.auth().currentUser.uid + "/playlists/" + this.playlistId + "/videos/" + this.videoToMove)
              .remove();
              this.created = true;
            },
            () => {
              this.failed = true;
            }
          );
        });

      } else {
        this.wrong = true;
      }
    },
    removeVideoFromPlaylist: function(vid) {
      firebase
        .database()
        .ref("utilisateurs/" + firebase.auth().currentUser.uid + "/playlists/" + this.playlistId + "/videos/" + vid)
        .remove();
      document.location.reload(true);
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