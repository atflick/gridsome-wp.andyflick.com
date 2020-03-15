<template>
  <div class="home-about">
    {{ positioning.x }}
    {{ positioning.y }}
    <div class="home-about-bg" :style="{ transform: `rotateX(${positioning.y}deg) rotateY(${positioning.x}deg)` }"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      positioning: {
        x: 0,
        y: 0
      }
    }
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      // this.trackMouse();
      window.addEventListener('mousemove', this.trackMouse);
    },
    trackMouse(event) {
      console.log(event, window)
      const target = window,
            centerWidth = target.innerWidth / 2,
            centerHeight = target.innerHeight / 2,
            xPos = event.x - centerWidth,
            yPos = event.y - centerHeight,
            scale = 20;
  console.log(xPos);


      this.positioning.x = xPos / scale;
      this.positioning.y = yPos / scale;
    }
  }
}
</script>

<style lang="scss">
  .home-about {
    position: relative;
    height: 500px;
    overflow: hidden;

    &-bg {
      position: absolute;
      top: -20%;
      bottom: -20%;
      right: -20%;
      width: 70%;
      background-image: url('../../assets/images/bg-hex.svg');
      background-size: cover;
      background-position: left;
      background-repeat: no-repeat;
      transition: .1s ease;
    }
  }
</style>