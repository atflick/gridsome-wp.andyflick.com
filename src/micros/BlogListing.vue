<template>
  <div class="blog-listing">
    <div class="blog-listing-inner">
      <aside class="blog-listing-aside">
        <CategoryFacets />
      </aside>
      <div class="blog-listing-container">
        <BlogListItem v-for="post in formattedPosts" :fields="post" :key="post.id" />
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import BlogListItem from '../micros/BlogListItem';
import CategoryFacets from '../micros/CategoryFacets';
export default {
  name: 'BlogListing',
  metaInfo() {
    return {
      title: this.$context.title
    }
  },
  props: {
    posts: Array
  },
  components: {
    BlogListItem,
    CategoryFacets
  },
  computed: {
    formattedPosts() {
      return this.posts.map((post) => {
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