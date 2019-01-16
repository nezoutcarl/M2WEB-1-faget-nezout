<template>
  <div class="favs">
    <h1>Posts</h1>
    This file will list all the posts.

    <div v-for="(fav, index) in favorites" :key="index">
      <p>
        <span><b>{{ fav.title }}</b></span><br />
        <span>{{ fav.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import FavoriteService from '@/services/FavoriteService'
export default {
  name: 'favs',
  data () {
    return {
      favorites: []
    }
  },
  mounted () {
    this.getUserFavs()
  },
  methods: {
    async getUserFavs () {
      const response = await FavoriteService.fetchUserFavorite()
      this.favorites = response.data
    }
  }
}
</script>