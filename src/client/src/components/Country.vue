<template>
  <div class="country">
    <div class="jumbotron">
      <h1 class="display-3">Country products</h1>
      <p class="lead">Products found: {{ country.count }} <br/>
        {{country.page_size}} products per page <br/>
        Page #{{ country.page }}
      </p>
    </div>
    <b-pagination-nav :number-of-pages="getPagesNumber()"
                      v-model="currentPage"
                      align="center"
                      :base-url="linkGen()"/>
    <br>
    <b-card-group columns>
      <div v-for="(product, index) in country.elements" :key="index">
         <b-card class="rounded" :header="product.product_name"
                                  header-text-variant="white"
                                  header-tag="header"
                                  header-bg-variant="dark"
                                  footer-tag="footer"
                                  footer-bg-variant="warning"
                                  style="max-width: 40rem;max-width: 40rem;"
                                  align="center">
            <a v-bind:href="'/product/' + product.code"><b-card-img class="img-size" :src="product.image_front_small_url"
            style="max-width: 30rem;max-height: 30rem;"
            alt="No image."
            top/></a>
            <p class="card-text">
              <span><img :src="getNutriScore(product.nutrition_grades)" alt="No nutrition grade."></span>
              <span><img :src="getNovaGroup(product.nova_group)" alt="No nova group."></span>
            </p>
            <div slot="footer">
              <router-link :to="{path: '/product/' + product.code}">
                <button type="button" class="btn btn-primary">Details</button>
              </router-link>
              <button type="button" class="btn btn-primary"><i class="fa fa-star"></i></button>
            </div>
        </b-card>
      </div>
    </b-card-group>
    <b-pagination-nav :number-of-pages="getPagesNumber()"
                      v-model="currentPage"
                      align="center"
                      :base-url="linkGen()"/>
    <br>
  </div>
</template>

<script>
import CountryService from '@/services/CountryService'
export default {
  name: 'country',
  data () {
    return {
      country: [],
      currentPage: 1
      // links: ['/1', '/2', '/3']
    }
  },
  computed: {
    pageLink () {
      return this.linkGen() + this.currentPage
    }
  },
  mounted () {
    this.getCountry(this.$route.params.name, this.$route.params.page)
    this.currentPage = parseInt(this.$route.params.page)
  },
  watch: {

  },
  methods: {
    async getCountry (name, page) {
      const response = await CountryService.fetchCountry(name, page)
      this.country = response.data
    },

    getNovaGroup (novaGroup) {
      return 'http://static.openfoodfacts.net/images/misc/nova-group-' + novaGroup + '.svg'
    },

    getNutriScore (nutriScore) {
      return 'http://static.openfoodfacts.org/images/misc/nutriscore-' + nutriScore + '.png'
    },

    getPagesNumber () {
      let num = Math.trunc(this.country.count / this.country.page_size)
      if (this.country.count > this.country.page_size && this.country.count % this.country.page_size !== 0) {
        ++num
      }
      return num
    },
    linkGen () {
      return '/country/' + this.$route.params.name + '/products/'
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
