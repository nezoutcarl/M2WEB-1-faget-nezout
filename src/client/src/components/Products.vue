<template>
  <div class="products">
    <div class="jumbotron">
      <h1 class="display-3">Products</h1>
      <p class="lead">Products found: {{ products.count }} <br/>
        {{products.page_size}} products per page <br/>
        Page #{{ products.page }}<br />
        <input v-model="message" placeholder="">
        <router-link :to="{path: '/products/' + message + '/pages/1'}">
          <button type="button" class="btn btn-primary"><i class="fa fa-search"></i></button>
        </router-link>
      </p>
    </div>
    <b-pagination-nav :number-of-pages="getPagesNumber()"
                      v-model="currentPage"
                      align="center"
                      base-url="/products/pages/"/>
    <br>
    <b-card-group columns>
      <div v-for="(product, index) in products.elements" :key="index">
         <b-card class="rounded" :header="product.product_name"
                                  header-text-variant="white"
                                  header-tag="header"
                                  header-bg-variant="dark"
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
              <button type="button" @click="addFavorite(product.code)" class="btn btn-primary"><i class="fa fa-star"></i></button>
            </div>
        </b-card>
      </div>
    </b-card-group>
    <b-pagination-nav :number-of-pages="getPagesNumber()"
                      v-model="currentPage"
                      align="center"
                      base-url="/products/pages/"/>
    <br>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
import FavoriteService from '@/services/FavoriteService'
export default {
  name: 'products',
  data () {
    return {
      products: [],
      message: '',
      currentPage: 1
      // links: ['/1', '/2', '/3']
    }
  },
  computed: {
    pageLink () {
      return this.linkGen(this.currentPage)
    }
  },
  mounted () {
    this.getProducts(this.$route.params.page)
    this.currentPage = parseInt(this.$route.params.page)
  },
  watch: {

  },
  methods: {
    async getProducts (page) {
      const response = await ProductService.fetchProducts(page)
      this.products = response.data
    },

    async addFavorite (code) {
      await FavoriteService.fetchAddFavorite(this.$auth.user.nickname, code)
    },

    getNovaGroup (novaGroup) {
      return 'http://static.openfoodfacts.net/images/misc/nova-group-' + novaGroup + '.svg'
    },

    getNutriScore (nutriScore) {
      return 'http://static.openfoodfacts.org/images/misc/nutriscore-' + nutriScore + '.png'
    },

    getPagesNumber () {
      let num = Math.trunc(this.products.count / this.products.page_size)
      if (this.products.count > this.products.page_size && this.products.count % this.products.page_size !== 0) {
        ++num
      }
      return num
    },
    linkGen (pageNum) {
      return '/products/pages/' + pageNum
    },
    pageGen (pageNum) {
      return pageNum
    }
  }
}
</script>

<style>
.img-size {
  margin-bottom: 15px;
}
</style>
