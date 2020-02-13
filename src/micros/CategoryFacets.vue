<template>
  <div class="category-facets">
    <div class="category-facets-title h4">Categories</div>
    <ul class="category-facets-container">
      <li v-for="cat in cats" :key="cat.node.id">
        <a :href="cat.node.location.path">{{ cat.node.title }}({{ cat.node.count }})</a>
      </li>
    </ul>
  </div>
</template>
<static-query>
  query {
    categories: allCategories {
      edges {
        node {
          title
          id
          slug
          count
          location {
            path
          }
        }
      }
    }
  }
</static-query>
<script>
export default {
  computed: {
    cats() {
      return this.$static.categories.edges;
    }
  }
}
</script>

<style lang="scss">

</style>