<template>
    <div class="gestion">
        <h1>Gestionnaire de vidéos</h1>
        Mes playlists :         
        <ul id="example-2">
          <li v-for="(item, index) in playlists" :key="index.playlist">
            <a href="#">{{ item.playlist.nom }} - {{ Object.keys( item.playlist.videos ).length }} vidéo(s)</a>
          </li>
        </ul>
    </div>
</template>

<script>
export default {
  data(){
    return {
      playlists: [
        { 
          playlist: {
            nom : 'Guitare', 
            videos : 
            [
              'lien1',
              'lien2',
              'lien3'
            ] 
          }
        },
        { 
          playlist: {
            nom : 'Batterie', 
            videos : 
            [
              'lien1',
              'lien2'
            ] 
          }
        }
      ]
    }
  }
}
</script>
