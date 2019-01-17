<template>
  <div>
    <div class="jumbotron">
      <h1 class="display-4">Bienvenue sur Be Food Fact, {{$auth.user.given_name}} !</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>
