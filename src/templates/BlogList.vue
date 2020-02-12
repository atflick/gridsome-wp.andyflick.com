<template>
  <div class="blog-list">
    <Hero :fields="hero" />

    <div class="blog-listing">
      <div class="blog-listing-inner">
        <aside class="blog-listing-aside">
          [ FACETS ]
        </aside>
        <div class="blog-listing-container">
          <BlogListItem v-for="post in posts" :fields="post" :key="post.id" />
          <Pager :info="$page.posts.pageInfo" />
        </div>
      </div>
    </div>
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
import moment from 'moment';
import BlogListItem from '../micros/BlogListItem';
import { Pager } from 'gridsome';
export default {
  metaInfo() {
    return {
      title: this.$context.title
    }
  },
  components: {
    BlogListItem,
    Pager
  },
  computed: {
    hero() {
      if (this.$context.fields.hero) {
        return this.$context.fields.hero;
      }
    },
    posts() {
      return this.$page.posts.edges.map((post) => {
        return {
          title: post.node.title,
          intro: post.node.acf.insights_fields.intro_text,
          url: post.node.url,
          date: moment.utc(post.node.date).format('MMM D, YYYY'),
          category: post.node.categories,
          image: post.node.acf.insights_fields.featured_image.url
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .blog-listing {
    @include content-constraint;

    &-inner {
      @include from(9) {
        display: flex;
      }
    }

    &-aside {
      @include from(9) {
        width: 250px;
        flex: 0 0 auto;
        margin: 0 25px 0 0;
      }
    }
  }
</style>