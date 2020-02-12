<template>
  <a :href="fields.url" class="blog-list-item">
    <div class="blog-list-item-top">
      <div class="blog-list-item-img" :style="{ backgroundImage: `url(${fields.image})`}"></div>
      <div class="post-card-categories">
        <span class="post-card-category" v-for="cat in fields.category" :key="cat.id">{{ cat.title }}</span>
      </div>
    </div>
    <div class="blog-list-item-bottom">
      <div class="blog-list-item-date">{{ fields.date }}</div>
      <div class="blog-list-item-title h3"><span class="bg-highlight">{{ fields.title }}</span></div>
      <p>{{ fields.intro }}</p>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    fields: Object
  }
}
</script>

<style lang="scss">
  .blog-list-item {
    display: block;
    border-bottom: 0;
    margin-bottom: 50px;

    @include from(6) {
      display: flex;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &-top {
      position: relative;
      border-bottom: 8px solid rgba(primary-color(purple), .2);
      margin-bottom: 15px;
      overflow: hidden;

      @include from(6) {
        width: 200px;
        flex: 0 0 auto;
        margin: 0 25px 0 0;
        border-right: 8px solid rgba(primary-color(purple), .2);
        border-bottom: 0;
      }
    }

    &-img {
      position: relative;
      height: 200px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      @include bg-pattern;
      transition: .2s ease-in;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 200%;
        background: $purple-blue;
        opacity: 0;
        transition: $te $ts;
      }
    }

    &-date {
      position: relative;
      font-style: italic;
      padding-left: 20px;
      margin-bottom: 8px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 12px;
        top: calc(50% - 3px);
        background: primary-color(blue);
        height: 6px;
      }
    }

    &-title {
      margin-bottom: 5px;
    }

    &-bottom {
      @include from(6) {
        flex: 1 1 auto;
        padding-top: 20px;
      }
    }

    @include hover {
      .blog-list-item-img {
        &::after {
          left: -100%;
          opacity: .5;
        }
      }
    }
  }
</style>