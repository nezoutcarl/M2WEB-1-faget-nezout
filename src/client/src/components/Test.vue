<template>
  <div class="test">
    <h1>TEst Open food facts API</h1>
    This will return the request content!
    {{ test.imgUrl }}
  </div>
</template>

<script>
import TestService from '@/services/TestService'
export default {
  name: 'test',
  data () {
    return {
      test: {}
    }
  },
  mounted () {
    this.getTest()
  },
  methods: {
    async getTest () {
      const response = await TestService.fetchTest()
      this.posts = response.data
    }
  }
}
</script>
