<template>
    <div class="gestion">
      <nav>
        <router-link to="/">Accueil</router-link>
        <router-link to="/gestion">Gestionnaire de vidéos</router-link>
      </nav>
        <h1>Gestionnaire de vidéos</h1>
        Mes playlists :         
        <ul id="example-2">
          <li v-for="(item, index) in playlists" :key="index.playlist">
            <a href="#" v-on:click="openVideos(item.playlist.videos)">{{ item.playlist.nom }} - {{ Object.keys( item.playlist.videos ).length }} vidéo(s)</a>
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
                    <div class="md-title">{{ video }}</div>
                    <div class="md-subhead">{{ video }}</div>
                    </md-card-header>

                    <md-card-expand>
                        <md-card-expand-content>
                            <md-card-content>
                                {{ video }}
                            </md-card-content>
                        </md-card-expand-content>
                    </md-card-expand>
                </md-card>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  data(){
    return {
      videosIds : null,
      playlists: [
        { 
          playlist: {
            nom : 'Guitare', 
            videos : 
            [
              'iltRZl04aKQ',
              'MCJuySfxXPo',
              'ERiBLduJZ3M'
            ] 
          }
        },
        { 
          playlist: {
            nom : 'Batterie', 
            videos : 
            [
              '5LLyofyJYCk',
              'qDfl78d26U4'
            ] 
          }
        }
      ]
    }
  },
  methods:{
    openVideos: function (videos) {
      this.videosIds = videos;
    }
  }
}
</script>
