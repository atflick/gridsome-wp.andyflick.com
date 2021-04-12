<template>
  <div class="transition">
    <button @click="startTransition">snap</button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
export default {
  name: 'PageTransition',
  props: {
    start: {
      default: false
    }
  },
  data() {
    return {
      
    }
  },
  watch: {
    start(curr, prev) {
      if (curr) {
        this.startTransition()
      }
    }
  },
  methods: {
    startTransition() {

      const el = document.body;
      html2canvas(el).then(canvas => {
          el.appendChild(canvas)
      });

    }
  }
}
</script>

<style lang="scss">
  .transition,
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
    // pointer-events: none;
  }
</style>