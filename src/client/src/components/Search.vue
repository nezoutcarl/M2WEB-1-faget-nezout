<template>
  <div class="search">
    <h1>Search</h1>

    <span><b>{{ search.page }}</b></span><br />
    <span><b>{{ search.page_size }}</b></span><br />
    <span><b>{{ search.count }}</b></span><br />

    <div v-for="(product, index) in search.elements" :key="index">
        <div slot="media">
            <a v-bind:href="'/product/' + product.code"><img v-bind:src="product.image_front_small_url" /></a>
        </div>

        <p>
            <span><a v-bind:href="'/product/' + product.code"><b>{{ product.product_name }}</b></a></span><br />
            <span><b>{{ product.nutrition_grades }}</b></span><br />
            <span><b>{{ product.nova_group }}</b></span><br />
        </p>
    </div>
    <p>
    </p>
  </div>
</template>

<script>
import SearchService from '@/services/SearchService'
export default {
  name: 'search',
  data () {
    return {
      search: []
    }
  },
  mounted () {
    this.getSearch(this.$route.params.code, this.$route.params.page)
  },
  methods: {
    async getSearch (code, page) {
      const response = await SearchService.fetchSearch(code, page)
      this.search = response.data
    }
  }
}
</script>
