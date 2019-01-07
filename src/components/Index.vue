<template>
  <div class="index">
    <video-group :videos="videos"></video-group>
  </div>
</template> 

<script>

import * as firebase from 'firebase/app';
import 'firebase/database';
import VideoGroup from './Youtube/VideoGroup.vue'
import Search from "../Search.js"

export default {
  name: 'accueil',
  
  components: {
    VideoGroup
  },
  data () {
    return{
      videos : null
    }
   },
   created() {
    Search({
      apiKey : 'AIzaSyB4hZ11gKkQan9OLFGF9zxhYGrNBwW23jI', /* AIzaSyCPDd0aebOZ9-35yxEnZXDoUZE0I0nkfKo */
      term : "music",
      items : 5
    }, response => this.videos = response
  )},
  methods:{
    
  }
}
</script>

<style scoped>

</style>