<template>
  <div class="searched_countries">
    <div class="jumbotron">
      <h1 class="display-3">Searched countries</h1>
    </div>
    <b-card-group columns>
      <div v-for="(country, index) in countries.elements" :key="index">
        <b-card class="rounded" :header="country.name"
                                  header-text-variant="white"
                                  header-tag="header"
                                  header-bg-variant="dark"
                                  footer-tag="footer"
                                  footer-bg-variant="warning"
                                  style="max-width: 40rem;max-width: 40rem;"
                                  align="center">
          <p class="card-text">
            <router-link :to="{path: '/country/' + country.name + '/products/1'}">
              <button type="button" class="btn btn-primary">Open</button>
            </router-link>
          </p>
        </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
import CountryService from '@/services/CountryService'
export default {
  name: 'countries',
  data () {
    return {
      countries: []
    }
  },
  mounted () {
    this.getSearchedCountries(this.$route.params.name)
  },
  methods: {
    async getSearchedCountries (name) {
      const response = await CountryService.fetchSearchedCountries(name)
      this.countries = response.data
    }
  }
}
</script>
