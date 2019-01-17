<template>
  <div class="brands">
    <div class="jumbotron">
      <h1 class="display-3">Brands</h1>
      <p class="lead">Brands found: {{ brands.count }}
      </p>
      <div v-for="(brand, index) in brands.elements" :key="index">
        <hr class="my-2">
        <span><a v-bind:href="'/brand/' + brand.name + '/products/1'"><b>{{ brand.name }}</b></a></span><br />
        <span><b>{{ brand.products }} products</b></span><br />
      </div>
    </div>
  </div>
</template>

<script>
import BrandService from '@/services/BrandService'
export default {
  name: 'brands',
  data () {
    return {
      brands: []
    }
  },
  mounted () {
    this.getBrands()
  },
  methods: {
    async getBrands () {
      const response = await BrandService.fetchBrands()
      this.brands = response.data
    }
  }
}
</script>
