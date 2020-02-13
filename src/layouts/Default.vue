<template>
  <div class="scroll-container" :style="{ height: height }">
    <div class="viewport">
      <div class="page-container" ref="pageContainer">
        <Header/>
          <main>
            <transition :name="transitionName" mode="out-in" v-on:leave="leave" v-on:after-enter="enter" appear>
              <router-view  :key="$context.id"></router-view>
            </transition>
          </main>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>
<script>
import { EventBus } from '../event-bus';
import Header from '~/components/Header.vue'
import { TweenLite } from 'gsap';

export default {
  components: {
    Header
  },
  data() {
    return {
      scroller: {},
      requestId: null,
      height: 0,
      transitionComplete: false,
      transitionName: 'slide'
    }
  },
  mounted() {
    this.scroller = {
      target: this.$refs.pageContainer,
      ease: 0.5, // <= scroll speed
      endY: 0,
      y: 0,
      resizeRequest: 1,
      scrollRequest: 0,
    };

    TweenLite.set(this.scroller.target, {
      rotation: 0.01,
      force3D: true
    });
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.updateScroller();
      window.focus();
      window.addEventListener('resize', this.onResize);
      document.addEventListener('scroll', this.onScroll);
      EventBus.$on('page-change', this.onResize);
    },
    updateScroller() {
      const resized = this.scroller.resizeRequest > 0;

      if (resized) {
        setTimeout(() => {
          const height = this.scroller.target.offsetHeight;
          this.height = height + 'px';
          this.scroller.resizeRequest = 0;
        }, 150)
      }

      const scrollY = window.pageYOffset || document.body.scrollTop || 0;

      this.scroller.endY = scrollY;
      this.scroller.y += (scrollY - this.scroller.y) * this.scroller.ease;

      if (Math.abs(scrollY - this.scroller.y) <= .05 || resized) {
        this.scroller.y = scrollY;
        this.scroller.scrollRequest = 0;
      }

      TweenLite.set(this.scroller.target, {
        y: -this.scroller.y
      });

      this.requestId = this.scroller.scrollRequest > 0 ? requestAnimationFrame(this.updateScroller) : null;
    },
    onScroll() {

      this.scroller.scrollRequest++;
      if (!this.requestId) {
        this.requestId = requestAnimationFrame(this.updateScroller);
      }
    },
    onResize() {
      this.scroller.resizeRequest++;
      if (!this.requestId) {
        this.requestId = requestAnimationFrame(this.updateScroller);
      }
    },
    leave() {
      this.transitionComplete = true;
    },
    enter() {
      this.transitionComplete = false;
    }
  },
  watch: {
    transitionComplete(from, to) {
      if (to) {
        this.scroller.resizeRequest = 1;
        this.updateScroller();
      }
    },
    $route(to, from) {
      console.log(to, from);
      if (to.name === 'Categories' && from.name === 'Categories') {
        this.transitionName = 'categories';
      } else {
        this.transitionName = 'slide';
      }
    }
  }
}

</script>

<style lang="scss">
  body {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .viewport {
    overflow: hidden;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .page-container {
    position: absolute;
    overflow: hidden;
    z-index: 10;
    display: flex;
    justify-content: center;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  .slide {
    &-leave-active {
      transition: all .5s;
      opacity: 1;
      transform: translateX(0);
    }

    &-leave-to /* .slide-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateX(-100%);
    }

    &-enter {
      opacity: 0;
      transform: translateX(100%);
    }

    &-enter-to {
      opacity: 1;
      transform: translateX(0);
    }

    &-enter-active {
      transition: all .5s;
    }
  }

</style>