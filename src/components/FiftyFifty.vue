<template>
  <div class="fifty-fifty" :data-image-left="fields.image_left">
    <div class="fifty-fifty-inner">
      <div class="fifty-fifty-content">
        <div class="fifty-fifty-content-inner">
          <h2 class="-red-bg">{{ fields.title }}</h2>
          <p class="fifty-fifty-content-text">{{ fields.text }}</p>
        </div>
      </div>
      <div class="fifty-fifty-image">
        <g-image :src="fields.image.url" :alt="fields.image.alt" />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  computed: {
    fields() {
      return {
        title: this.$attrs.fields.title,
        text: this.$attrs.fields.text,
        image: {
          url: this.$attrs.fields.image.url,
          alt: this.$attrs.fields.image.alt
        },
        link: {
          title: this.$attrs.fields.link.title,
          url: this.$attrs.fields.link.url,
          target: this.$attrs.fields.link.target
        },
        image_left: this.$attrs.fields.image_left[0]
      }
    }
  }
}
</script>

<style lang="scss">
  .fifty-fifty {
    @include content-constraint;

    &-inner {
      @include to(6) {
        max-width: 550px;
      }

      @include from(7) {
        display: flex;
        align-items: center;
      }
    }

    &-content {
      margin-bottom: 30px;

      @include from(7) {
        margin: 0;
        width: 50%;
        max-width: 500px;
        flex: 1 0 auto;
      }

      &-inner {
        background: primary-color(white);

        @include from(7) {
          padding-right: 50px;

          [data-image-left='true'] & {
            padding-right: 0;
            padding-left: 50px;
          }
        }
      }

      &-text {
        margin-top: 30px;
      }
    }

    &-image {
      margin: 0 -20px;
      overflow: hidden;
      @include bg-pattern;

      @include from(5) {
        position: relative;
        margin: 0;
        height: 300px;
      }

      @include from(7) {
        width: 50%;
        flex: 1 0 auto;
        margin: 0;
        height: auto;

        [data-image-left='true'] & {
          order: -1;
        }
      }

      img {
        @include between(5, 6) {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

      }
    }
  }
</style>