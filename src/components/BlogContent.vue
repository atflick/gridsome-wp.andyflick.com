<template>
  <div class="blog-content">
    <div class="blog-content-inner">
      <div class="h3 blog-content-date -top">{{ date }}</div>
      <div class="blog-content-container wysiwyg-content" v-html="content"></div>
      <aside class="blog-content-meta">
        <div class="h3 blog-content-date -bottom">{{ date }}</div>
        <Categories :categories="categories" title="" />
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogContent',
  props: {
    date: String,
    content: String,
    categories: Array
  }
}
</script>

<style lang="scss">
  .blog-content {
    @include content-constraint;

    &-inner {
      @include from(7) {
        display: flex;
      }  
    }

    &-date {
      margin-bottom: 0;
      color: primary-color(purple);

      &.-top {
        padding-bottom: 15px;
        border-bottom: 14px solid rgba(primary-color(red), .3);
        margin-bottom: 15px;

        @include from(7) {
          display: none;
        }
      }

      &.-bottom {
        display: none;

        @include from(7) {
          display: block;
        }
      }
    }

    &-container {

    }

    &-meta {
      @include from(7) {
        order: -1;
        padding-right: 50px;
        width: 30%;
        min-width: 175px;
        max-width: 400px;
        flex: none;
      }

      @include from(10) {
        padding-right: 80px;
      }

      @include from(14) {
        padding-right: 100px;
      }
    }

    .categories {
      padding-top: 15px;
      border-top: 14px solid rgba(primary-color(red), .3);
      margin-top: 15px;
    }
  }
</style>