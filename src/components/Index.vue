<template>
  <div class="index">
    <video-group :videos="videos"></video-group>
  </div>
</template>

<script>

import VideoGroup from './Youtube/VideoGroup.vue';
import Search from "../Search.js"; 

export default {
  created() {
    Search({
      apiKey : 'AIzaSyCPDd0aebOZ9-35yxEnZXDoUZE0I0nkfKo',
      term : 'laravel repository'
    }, response => this.videos = response);
  },
  components: {
    VideoGroup
  },
  data () {
    return{
      videos : null
    }
   
  },
  methods:{
  }
}
</script>

<style scoped>

</style>