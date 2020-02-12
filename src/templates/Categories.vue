<template>
  <div class="categories">
    <Hero :fields="hero" />
    <BlogListing :posts="$page.posts.belongsTo.edges">
      <Pager :info="$page.posts.belongsTo.pageInfo" />
    </BlogListing>
  </div>
</template>
<page-query>
  query ($id: ID!, $page: Int) {
    posts: categories(id: $id) {
      title
      belongsTo (perPage: 2, page: $page) @paginate {
        totalCount
        pageInfo {
          totalPages
          currentPage
          isFirst
          isLast
        }
        edges {
          node {
            ... on Posts {
              id,
              title,
              url,
              acf {
                insights_fields {
                  intro_text,
                  featured_image {
                    url
                  }
                }
              },
              date,
              categories {
                title,
                id
              }
            }
          }
        }
      }
    }
  }
</page-query>
<script>
import BlogListing from '../micros/BlogListing'
import { Pager } from 'gridsome';
export default {
  name: 'Categories',
  components: {
    BlogListing,
    Pager
  },
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