<template>
  <div class="blog-list">
    <Hero :fields="hero" />

    <BlogListing :posts="$page.posts.edges">
      <Pager :info="$page.posts.pageInfo" />
    </BlogListing>
  </div>
</template>
<page-query>
  query Posts ($page: Int) {
    posts: allPosts (perPage: 2, page: $page) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
        isFirst
        isLast
      }
      edges {
        node {
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
</page-query>
<script>
import { EventBus } from '../event-bus';
import BlogListing from '../micros/BlogListing'
import { Pager } from 'gridsome';
export default {
  name: 'BlogList',
  metaInfo() {
    return {
      title: this.$context.title
    }
  },
  components: {
    BlogListing,
    Pager
  },
  computed: {
    hero() {
      if (this.$context.fields.hero) {
        return this.$context.fields.hero;
      }
    },
  },
  watch: {
    $page() {
      EventBus.$emit('page-change');
    }
  }
}
</script>

<style lang="scss">

</style>