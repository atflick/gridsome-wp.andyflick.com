<template>
  <div class="recent-posts">
    <div class="recent-posts-inner">
      <div class="recent-posts-intro">
        <h2>Recent Posts</h2>
      </div>
      <div class="recent-posts-container">
        <PostCard v-for="post in posts" :fields="post" :key="post.id" />
      </div>
    </div>
  </div>
</template>

<static-query>
  query {
    allPosts(limit: 3) {
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
</static-query>

<script>
import moment from 'moment';
import PostCard from '../micros/PostCard';
export default {
  components: {
    PostCard
  },
  computed: {
    posts() {
      return this.$static.allPosts.edges.map((post) => {
        return {
          title: post.node.title,
          intro: post.node.acf.insights_fields.intro_text,
          url: post.node.url,
          date: moment.utc(post.node.date).format('MMM D, YYYY'),
          category: post.node.categories,
          image: post.node.acf.insights_fields.featured_image.url
        }
      });
    }
  }
}
</script>

<style lang="scss">
  .recent-posts {
    @include content-constraint;

    &-container {
      @include from(9) {
        display: flex;
        margin: 0 -15px;
      }

      @include from(12) {
        margin: 0 -25px;
      }
    }

    .post-card {

      @include between(6, 8) {
        display: flex;
      }

      @include from(9) {
        margin: 0 15px;
        width: calc(33.3333% - 30px);
      }

      @include from(12) {
        margin: 0 25px;
        width: calc(33.3333% - 50px);
      }

      &-img {
        @include between(6, 8) {
          height: 180px;
        }
      }

      &-top {
        @include between(6, 8) {
          width: 200px;
          flex: 0 0 auto;
          margin: 0 25px 0 0;
          border-right: 8px solid rgba(primary-color(purple), .2);
          border-bottom: 0;
        }
      }

      &-bottom {
        @include between(6, 8) {
          flex: 1 1 auto;
          padding-top: 20px;
        }
      }
    }
  }
</style>