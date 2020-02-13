<template>
  <transition name="fade">
    <div class="categories">
      <Hero :fields="hero" />
      <BlogListing :posts="$page.posts.belongsTo.edges">
        <Pager :info="$page.posts.belongsTo.pageInfo" />
      </BlogListing>
    </div>

  </transition>
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
              id
              title
              url
              acf {
                insights_fields {
                  intro_text
                  featured_image {
                    url
                  }
                }
              }
              date
              categories {
                title
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
  .fade-leave-active {
    transition: all .5s;
    opacity: 1;
  }

  .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-to {
    opacity: 1;
  }

  .fade-enter-active {
    transition: all .5s;
  }
</style>