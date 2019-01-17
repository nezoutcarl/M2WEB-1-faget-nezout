<template>
  <div class="countries">
    <div class="jumbotron">
      <h1 class="display-3">Countries</h1>
      <p class="lead">Countries found: {{ countries.count }}<br />
      <input v-model="message" placeholder="">
      <router-link :to="{path: '/countries/' + message}">
        <button type="button" class="btn btn-primary"><i class="fa fa-search"></i></button>
      </router-link>
      </p>
    </div>
    <b-card-group columns>
      <div v-for="(country, index) in countries.elements" :key="index">
        <b-card class="rounded" :header="country.name"
                                  header-text-variant="white"
                                  header-tag="header"
                                  header-bg-variant="dark"
                                  footer-tag="footer"
                                  footer-bg-variant="warning"
                                  style="max-width: 30rem;"
                                  align="center">
          <p class="card-text">
            <span><b>{{ country.products }} products</b></span>
          </p>
          <div slot="footer">
            <router-link :to="{path: '/countries/' + country.name + '/products/pages/1'}">
              <button type="button" class="btn btn-primary">Open</button>
            </router-link>
          </div>
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
      countries: [],
      message: ''
    }
  },
  mounted () {
    this.getCountries()
  },
  methods: {
    async getCountries () {
      const response = await CountryService.fetchCountries()
      this.countries = response.data
    }
  }
}
</script>
