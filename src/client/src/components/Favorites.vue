<template>
  <div class="favorites">
    <h1>Favorites</h1>
    This file will list all the favorites of the current user.

    <div v-for="(favorite, index) in favorites" :key="index">
      <p>
        <span><b>{{ favorite.title }}</b></span><br />
        <span>{{ favorite.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import FavoriteService from '@/services/FavoriteService'
export default {
  name: 'favorites',
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
