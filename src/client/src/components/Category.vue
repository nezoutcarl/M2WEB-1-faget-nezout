<template>
  <div class="category">
    <div class="jumbotron">
      <h1 class="display-3">Category products</h1>
      <p class="lead">Products found: {{ category.count }} <br/>
        {{category.page_size}} products per page <br/>
        Page #{{ category.page }}
      </p>
    </div>
    <b-pagination-nav :number-of-pages="getPagesNumber()"
                      v-model="currentPage"
                      align="center"
                      :base-url="linkGen()"/>
    <br>
    <b-card-group columns>
      <div v-for="(product, index) in category.elements" :key="index">
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
import CategoryService from '@/services/CategoryService'
export default {
  name: 'category',
  data () {
    return {
      category: [],
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
    this.getCategory(this.$route.params.name, this.$route.params.page)
    this.currentPage = parseInt(this.$route.params.page)
  },
  watch: {

  },
  methods: {
    async getCategory (name, page) {
      const response = await CategoryService.fetchCategory(name, page)
      this.category = response.data
    },

    getNovaGroup (novaGroup) {
      return 'http://static.openfoodfacts.net/images/misc/nova-group-' + novaGroup + '.svg'
    },

    getNutriScore (nutriScore) {
      return 'http://static.openfoodfacts.org/images/misc/nutriscore-' + nutriScore + '.png'
    },

    getPagesNumber () {
      let num = Math.trunc(this.category.count / this.category.page_size)
      if (this.category.count > this.category.page_size && this.category.count % this.category.page_size !== 0) {
        ++num
      }
      return num
    },
    linkGen () {
      return '/category/' + this.$route.params.name + '/products/'
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
