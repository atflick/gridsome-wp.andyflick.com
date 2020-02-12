<template>
  <div class="categories">
    <Hero :fields="hero" />
  </div>
</template>
<page-query>
  query ($id: ID!) {
    posts: categories(id: $id) {
      title
      belongsTo {
        edges {
          node {
            ... on Posts {
              id
              title
            }
          }
        }
      }
    }
  }
</page-query>
<script>
export default {
  computed: {
    hero() {
      return  {
        title: this.$context.title,
        text: '',
        image: ''
      }
    }
  }
}
</script>

<style lang="scss">

</style>