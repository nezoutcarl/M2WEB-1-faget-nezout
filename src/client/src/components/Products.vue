<template>
  <div class="products">
    <div class="jumbotron">
      <h1 class="display-3">Les produits</h1>
      <p class="lead">Produits trouvés : {{ products.count }} <br/>
        Page : {{ products.page }} <br/>
        Nombre de produits par page : {{products.page_size}}
      </p>
      <hr class="my-2">
      <p class="lead">
        <a class="btn btn-primary btn-lg" href="Jumbo action link" role="button">More Info</a>
      </p>
    </div>
    <div class="container">
    <b-pagination-nav :number-of-pages="getPagesNumber"
                      v-model="currentPage"
                      align="center"
                      base-url="/products/"/>
    <br>
    <p>
      Page #: {{ currentPage }}<br>
      Page Link: {{ pageLink }}
    </p>
  </div>
  <b-card-group deck >
      <div v-for="(product, index) in products.elements" :key="index">
         <b-card class="rounded" :title="product.product_name">
            <b-card-img class="img-size" :src="product.image_front_small_url"
            alt="Img"
            top/>
            <p class="card-text">
              <span><img :src="getNutriScore(product.nutrition_grades)" :alt="product.nova_group"></span>
              <span><img :src="getNovaGroupUrl(product.nova_group)" :alt="product.nova_group"></span>
            </p>
            <div slot="footer">
              <button type="button" class="btn btn-primary">Détails</button>
              <button type="button" class="btn btn-primary"><i class="fa fa-star"></i></button>
            </div>
        </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
import ProductsService from '@/services/ProductsService'
export default {
  name: 'products',
  data () {
    return {
      products: [],
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
    this.currentPage=parseInt(this.$route.params.page)
  },
  watch: {

  },
  methods: {
    async getProducts (page) {
      const response = await ProductsService.fetchProducts(page)
      this.products = response.data
    },

    getNovaGroupUrl (novaGroup) {
      return 'http://static.openfoodfacts.net/images/misc/nova-group-' + novaGroup + '.svg'
    },

    getNutriScore (nutriScore) {
      return 'http://static.openfoodfacts.org/images/misc/nutriscore-' + nutriScore + '.png'
    },

    getPagesNumber () {
      return Math.trunc(this.products.count / this.products.page_size)
    },
    linkGen (pageNum) {
      return '/products/' + pageNum
    },
    pageGen (pageNum) {
      return pageNum
    }

  }
}
</script>

<style>
/* .img-size {
  max-width: calc(25% - 30px);} */
</style>
