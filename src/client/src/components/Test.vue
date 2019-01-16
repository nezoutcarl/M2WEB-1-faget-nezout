<template>
  <div class="test">
    <h1>TEst Open food facts API</h1>
    This will return the request content!
    {{ test.imgUrl }}
    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="4">
        <vs-card actionable class="cardx">
          <div slot="header">
            <h3>
              Hello world !
            </h3>
          </div>
          <div slot="media">
          <!--   <img :src="">image to insert -->IMG
          </div>
          <div>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button color="primary" type="gradient" >View</vs-button>
              <vs-button color="danger" type="gradient">Delete</vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="4">
        <vs-card actionable class="cardx">
          <div slot="header">
            <h3>
              Hello world !
            </h3>
          </div>
          <div slot="media">
           <!--   <img :src="$withBase('/card2.png')"> -->IMG2
          </div>
          <div>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button color="primary" type="gradient" >View</vs-button>
              <vs-button color="danger" type="gradient" >Delete</vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
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
