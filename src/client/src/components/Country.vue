<template>
  <div class="country">
    <h1>Country</h1>

    <span><b>{{ country.page }}</b></span><br />
    <span><b>{{ country.page_size }}</b></span><br />
    <span><b>{{ country.count }}</b></span><br />

    <div v-for="(product, index) in country.elements" :key="index">
        <div slot="media">
            <a v-bind:href="'/product/' + product.code"><img v-bind:src="product.image_front_small_url" /></a>
        </div>

        <p>
            <span><a v-bind:href="'/product/' + product.code"><b>{{ product.product_name }}</b></a></span><br />
            <span><b>{{ product.nutrition_grades }}</b></span><br />
            <span><b>{{ product.nova_group }}</b></span><br />
        </p>
    </div>
  </div>
</template>

<script>
import CountryService from '@/services/CountryService'
export default {
  name: 'country',
  data () {
    return {
      country: []
    }
  },
  mounted () {
    this.getCountry(this.$route.params.id, this.$route.params.page)
  },
  methods: {
    async getCountry (id, page) {
      const response = await CountryService.fetchCountry(id, page)
      this.country = response.data
    }
  }
}
</script>
