<template>
  <div class="recent-posts">
    <div class="recent-posts-inner">
      <div class="recent-posts-intro">
        <h2 class="-red-bg">Recent Posts</h2>
      </div>
      <Observer :callback="fadeIn" class="recent-posts-container">
        <PostCard v-for="post in posts" :fields="post" :key="post.id" class />
      </Observer>
    </div>

    <div class="recent-posts-more">
      <a href="/blog" class="button"><span>See More</span></a>
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
import Observer from '../micros/Observer';
export default {
  components: {
    PostCard,
    Observer
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
  },
  methods: {
    fadeIn(target, index) {
      // console.log(target, index)
      const time = 200 * index
      setTimeout(() => {
        target.classList.add('-show')
      }, time)
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
        margin: 0 -45px;
      }
    }

    &-intro {
      margin-bottom: 50px;
    }

    .post-card {
      transform: translateY(-25px);
      opacity: 0;
      transition: $te $ts;

      &.-show {
        transform: translateY(0);
        opacity: 1;
      }

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

    &-more {
      padding-top: 30px;
      text-align: center;
    }
  }
</style>