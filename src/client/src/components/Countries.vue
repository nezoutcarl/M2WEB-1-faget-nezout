<template>
  <div class="countries">
    <h1>Countries</h1>

    <span><b>{{ countries.count }}</b></span><br />

    <div v-for="(country, index) in countries.elements" :key="index">
        <span><a v-bind:href="'/country/' + country.id + '/products/1'"><b>{{ country.name }}</b></a></span><br />
        <span><b>{{ country.products }}</b></span><br />
    </div>
  </div>
</template>

<script>
import CountriesService from '@/services/CountriesService'
export default {
  name: 'countries',
  data () {
    return {
      countries: []
    }
  },
  mounted () {
    this.getCountries()
  },
  methods: {
    async getCountries () {
      const response = await CountriesService.fetchCountries()
      this.countries = response.data
    }
  }
}
</script>
