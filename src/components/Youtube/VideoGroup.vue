<template>
  <div class="VideoGroup">
    <nav>
      <router-link class="router-color" to="/accueil">Accueil</router-link>
      <router-link class="router-color" to="/gestion">Gestionnaire de vidéos</router-link>
      <md-button class="md-accent" v-on:click="logout">Deconnexion</md-button>
    </nav>
    <form class="md-layout" @submit.prevent="submitForm()">
      <md-card class="md-layout-item md-small-size-100">
        <md-card-header>
          <div class="md-title">Paramètres de recherche :</div>
        </md-card-header>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="rechercher">Mot clés</label>
              <md-input name="rechercher" id="rechercher" v-model="research"/>
            </md-field>
            <md-field>
                <label for="SelectedRequest">Requête(s) disponible(s) :</label>
                <md-select v-model="SelectedRequest" name="SelectedRequest" id="SelectedRequest">
                  <md-option
                    v-for="request in existingRequests"
                    :key="request.value"
                    v-bind:value="request.value"
                  >{{ request.value }}</md-option>
                </md-select>
              </md-field>
          </div>
        </div>
        <md-card-actions>
          <md-button class="md-accent" @click="saveRequest()">Sauvegarder la requête</md-button>
          <md-button type="submit" class="md-primary">Rechercher</md-button>
        </md-card-actions>
      </md-card>
    </form>

    <b-container>
      <b-row v-if="videos !== null">
        <b-col v-for="video in videos.slice(paginateVideo,paginateVideo + 6)" :video="video" :key="video.id.videoId">
          <div class="card-expansion">
            <md-card>
              <md-card-media>
                <youtube v-bind:video-id="video.id.videoId"/>
              </md-card-media>

              <md-card-header>
                <div class="md-title">{{ video.snippet.title }}</div>
                <div class="md-subhead">{{ video.snippet.channelTitle }}</div>
              </md-card-header>

              <md-card-expand>
                <md-card-actions md-alignment="space-between">
                  <div>
                    <md-button class="md-primary md-raised" @click="openPopup(video)">Ajouter</md-button>
                  </div>
                  <md-card-expand-trigger>
                    <md-button>Description</md-button>
                  </md-card-expand-trigger>
                </md-card-actions>

                <md-card-expand-content>
                  <md-card-content>{{ video.snippet.description }}</md-card-content>
                </md-card-expand-content>
              </md-card-expand>
            </md-card>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-tabs md-dynamic-height>
          <md-tab md-label="General">
            <p>Pour ajouter une vidéo, veuillez choisir une playlist parmis celle créées</p>
            <div class="md-layout-item">
              <md-field>
                <label for="SelectedPlaylist">Playlists disponible :</label>
                <md-select v-model="SelectedPlaylist" name="SelectedPlaylist" id="SelectedPlaylist">
                  <md-option
                    v-for="playlist in existingPlaylists"
                    :key="playlist.key"
                    v-bind:value="playlist.key"
                  >{{ playlist.value }}</md-option>
                </md-select>
              </md-field>
            </div>
            <md-dialog-actions>
              <md-button class="md-primary" @click="cancelPopup()">Fermer</md-button>
              <md-button class="md-primary" @click="addVideo(SelectedPlaylist)">Ajouter</md-button>
            </md-dialog-actions>
          </md-tab>
          <md-tab md-label="Nouvelle playlist">
            <p>Ajout d'une nouvelle playlist</p>
            <md-field md-clearable>
              <label>Nom de la playlist</label>
              <md-input v-model="playlistName"></md-input>
            </md-field>
            <div class="md-layout-item">
              <md-dialog-actions>
                <md-button class="md-primary" @click="cancelPopup()">Fermer</md-button>
                <md-button class="md-primary" @click="createNewPlaylist()">Créer</md-button>
              </md-dialog-actions>
            </div>
          </md-tab>
        </md-tabs>
        <md-dialog-alert
          :md-active.sync="created"
          md-content="Element correctement ajouté !"
          md-confirm-text="Au top!"
        />
        <md-dialog-alert
          :md-active.sync="failed"
          md-content="La requête a échoué :(, avez-vous choisi une playlist ?"
          md-confirm-text="Pas cool..."
        />
      </md-dialog>
    </div>
    <nav aria-label="...">
      <ul class="pagination">        
        <li v-if="paginateVideo === 0" class="page-item disabled">
        <li v-else class="page-item">
          <a class="page-link" v-on:click="forceRerender(-6)">Précédent</a>
        </li>
        <li v-if="paginateVideo === 42" class="page-item disabled">
        <li v-else class="page-item">
          <a class="page-link" v-on:click="forceRerender(6)">Suivant</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
import VideoItem from "./VideoItem.vue";

import Axios from "axios";
import Search from "../../Search.js";

export default {
  props: ["videos"],
  components: {
    VideoItem
  },
  data() {
    return {
      SelectedPlaylist: "",
      SelectedRequest: "",
      research: "",
      selectedVideo: null,
      showDialog: false,
      playlistName: "",
      created: false,
      failed: false,
      existingPlaylists: [],
      existingRequests: [],
      paginateVideo : 0
    };
  },
  methods: {
    submitForm() {
      if(this.research !== "") {
        Search(
        {
          apiKey:
            "AIzaSyB4hZ11gKkQan9OLFGF9zxhYGrNBwW23jI" /* AIzaSyCPDd0aebOZ9-35yxEnZXDoUZE0I0nkfKo */,
          term: this.research,
          items: this.numberResearch
        },
          response => (this.videos = response)
        );
      } else if(this.SelectedRequest !== "") {
        Search(
        {
          apiKey:
            "AIzaSyB4hZ11gKkQan9OLFGF9zxhYGrNBwW23jI" /* AIzaSyCPDd0aebOZ9-35yxEnZXDoUZE0I0nkfKo */,
          term: this.SelectedRequest,
          items: this.numberResearch
        },
          response => (this.videos = response)
        );
      }
      
    },
    openPopup: function(video) {
      this.showDialog = true;
      this.selectedVideo = JSON.parse(JSON.stringify(video));
      var query = firebase
        .database()
        .ref("utilisateurs/" + firebase.auth().currentUser.uid + "/playlists")
        .orderByKey();
      query.once("value").then(snapshot => {
        this.existingPlaylists = [];
        snapshot.forEach(childSnapshot => {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
          this.existingPlaylists.push({ key: key, value: childData.nom });
        });
      });
    },
    addVideo: function(playlist) {
      // Ajout d'une vidéo dans une playlist existante
      this.SelectedPlaylist = playlist;

      if (this.SelectedPlaylist != "") {
        firebase
          .database()
          .ref(
            "utilisateurs/" +
              firebase.auth().currentUser.uid +
              "/playlists/" +
              this.SelectedPlaylist +
              "/videos"
          )
          .push({
            id: this.selectedVideo.id.videoId,
            desc: this.selectedVideo.snippet.description,
            title: this.selectedVideo.snippet.title,
            channel: this.selectedVideo.snippet.channelTitle
          })
          .then(
            user => {
              this.created = true;
            },
            () => {
              this.failed = true;
            }
          );
      } else {
        this.failed = true;
      }
    },
    createNewPlaylist: function() {
      // Fonction qui crée une playlist en lui donnant juste un nom, ensuite il faut y accéder avec l'id pour lui ajouter des vidéos
      firebase
        .database()
        .ref("utilisateurs/" + firebase.auth().currentUser.uid + "/playlists")
        .push({
          nom: this.playlistName
        })
        .then(
          user => {
            var query = firebase
              .database()
              .ref(
                "utilisateurs/" + firebase.auth().currentUser.uid + "/playlists"
              )
              .orderByKey();
            query.once("value").then(snapshot => {
              this.existingPlaylists = [];
              snapshot.forEach(childSnapshot => {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                this.existingPlaylists.push({ key: key, value: childData.nom });
              });
            });
            this.created = true;
          },
          () => {
            this.failed = true;
          }
        );
    },
    cancelPopup: function() {
      this.SelectedPlaylist = "";
      this.showDialog = false;
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
          alert("Vous êtes maintenant déconnecté !");
        });
    },
    forceRerender : function(numberPage) {        
      this.$nextTick(() => {
        this.paginateVideo = this.paginateVideo + numberPage;
      });
    },
    saveRequest: function() {
      // Fonction de sauvegarde de requête
      if(this.research !== null) {
        firebase
        .database()
        .ref("utilisateurs/" + firebase.auth().currentUser.uid + "/requests")
        .push({
          request: this.research
        });
      }
    }
  },
  created() {
    var query = firebase
        .database()
        .ref("utilisateurs/" + firebase.auth().currentUser.uid + "/requests")
        .orderByKey();
      query.once("value").then(snapshot => {
        this.existingRequests = [];
        snapshot.forEach(childSnapshot => {
          var childData = childSnapshot.val();
          this.existingRequests.push({ value: childData.request });
        });
      });
  }
};
</script>


<style scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.md-card {
  width: 500px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}

.md-progress-bar {
  margin: 24px;
}

.md-button {
  margin-top: -8px;
  vertical-align: center;
}

.router-color {
  background-color: #eeeeee;
}
</style>

