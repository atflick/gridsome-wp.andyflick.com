<template>
  <div class="full-width">
    <div ref="component" class="full-width-outer">
      <ParallaxContainer
        class="full-width-image"
        :imageUrl="fields.bgImage.url"
        :hideOverflow="true"
      />
      <ParallaxContainer 
        class="full-width-inner"
        :hideOverflow="false"
        direction="up"
        :absolute="false"
      >
        <div class="full-width-content">
          <h2 class="full-width-title -red-bg -white">{{ fields.title }}</h2>
          <p class="full-width-text -white">{{ fields.text }}</p>
          <a v-if="fields.link" :href="fields.link.url" class="button -white"><span>{{ fields.link.title }}</span></a>
        </div>   
      </ParallaxContainer>
    </div>
  </div>
</template>

<script>
import ParallaxContainer from '../micros/parallax/ParallaxContainer.vue';
// import { getOffsetY } from '@/utils'

export default {
  name: 'FullWidth',
  components: {
    ParallaxContainer
  },
  data() {
    return {

    }
  },
  computed: {
    fields() {
      return {
        title: this.$attrs.fields.title,
        text: this.$attrs.fields.text,
        link: this.$attrs.fields.link,
        bgImage: this.$attrs.fields.background_image
      }
    },
  },
  methods: {

  }
}
</script>

<style lang="scss">
  .full-width {
    overflow: hidden;
    position: relative;
    @include content-constraint;

    &-outer {
          
      // &::before,
      // &::after {
      //   content: '';
      //   position: absolute;
      //   z-index: 2;
      //   left: 0;
      //   right: 0;
      //   height: 20vh;
      //   background-image: linear-gradient(transparent, #fff);
      // }

      // &::before {
      //   top: 0;
      //   transform: rotate(180deg);
      // }

      // &::after {
      //   bottom: 0;
      // }
    }

    &-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      // transition: linear .0s;
    }

    &-inner {
      position: relative;
      z-index: 2;
    }

    &-content {
      padding: 30px;
      margin: 200px 0 0;
      background-color: rgba(primary-color(gray), .9);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      max-width: 550px;

      @include from(7) {
        padding: 50px;
        // margin: 200px 0 100px;
      }
    }

    &-text {
      margin-top: 20px;
    }
  }
</style>