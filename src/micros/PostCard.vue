<template>
  <a :href="fields.url" class="post-card">
    <div class="post-card-top">
      <div class="post-card-img" :style="{ backgroundImage: `url(${fields.image})`}"></div>
      <div class="post-card-categories">
        <span class="post-card-category" v-for="cat in fields.category" :key="cat.id">{{ cat.title }}</span>
      </div>
    </div>
    <div class="post-card-bottom">
      <div class="post-card-title h3"><span class="bg-highlight">{{ fields.title }}</span></div>
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
  .post-card {
    display: block;
    border-bottom: 0;
    margin-bottom: 50px;

    &:last-child {
      margin-bottom: 0;
    }

    &-top {
      position: relative;
      border-bottom: 8px solid rgba(primary-color(purple), .2);
      margin-bottom: 15px;
      overflow: hidden;
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

    &-title {
      margin-bottom: 5px;
    }

    &-categories {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    &-category {
      display: inline-block;
      padding: 0 6px;
      margin: 8px 8px 0;
      background: primary-color(white);
      box-shadow: $shadow;
      @include rem(font-size, 14px);
    }

    @include hover {
      .post-card-img {
        &::after {
          left: -100%;
          opacity: .5;
        }
      }
    }
  }
</style>