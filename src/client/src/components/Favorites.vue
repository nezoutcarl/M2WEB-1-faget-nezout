<template>
  <div class="favorites">
    <div class="jumbotron">
      <h1 class="display-3">Favorites</h1>
    </div>
    <b-card-group columns>
      <div v-for="(product, index) in products" :key="index">
        <b-card class="rounded" :header="product.product_name"
                                  header-text-variant="white"
                                  header-tag="header"
                                  header-bg-variant="dark"
                                  footer="Card Footer"
                                  footer-tag="footer"
                                  footer-bg-variant="warning"
                                  style="max-width: 30rem;"
                                  align="center">
            <a v-bind:href="'/products/' + product.code"><b-card-img class="img-size" :src="product.image_front_small_url"
            style="max-width: 30rem;max-height: 30rem;"
            alt="No image."
            top/></a>
            <p class="card-text">
              <span><img :src="getNutriScore(product.nutrition_grades)" alt="No nutrition grade."></span>
              <span><img :src="getNovaGroup(product.nova_group)" alt="No nova group."></span>
            </p>
            <div slot="footer">
              <router-link :to="{path: '/products/' + product.code}">
                <button type="button" class="btn btn-primary">Details</button>
              </router-link>
              <button type="button" @click="removeFavorite(product.code)" class="btn btn-primary"><i class="fa fa-trash"></i></button>
            </div>
        </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
import FavoriteService from '@/services/FavoriteService'
import ProductService from '@/services/ProductService'
export default {
  name: 'favorites',
  data () {
    return {
      favorites: [],
      products: [],
      product: []
    }
  },
  mounted () {
    this.getUserFavs()
  },
  methods: {
    async getUserFavs () {
      const response = await FavoriteService.fetchFavorites(this.$auth.user.nickname)
      this.favorites = response.data
      this.getProducts()
    },
    async getProducts (code) {
      for (let i = 0; i < this.favorites.elements.length; ++i) {
        await this.getProduct(this.favorites.elements[i])
        await this.products.push(this.product)
      }
    },
    async getProduct (code) {
      const response = await ProductService.fetchProduct(code)
      this.product = response.data
    },

    async removeFavorite (code) {
      await FavoriteService.fetchRemoveFavorite(this.$auth.user.nickname, code)
    },

    getNovaGroup (novaGroup) {
      return 'http://static.openfoodfacts.net/images/misc/nova-group-' + novaGroup + '.svg'
    },

    getNutriScore (nutriScore) {
      return 'http://static.openfoodfacts.org/images/misc/nutriscore-' + nutriScore + '.png'
    }
  }
}
</script>
