<template>
  <div class="calculator-dot"
    :class="{highlight: highlight}"
    draggable="true"
    @dragstart="dragStart"

    ></div>
</template>

<script>
export default {
  name: 'CalculatorDot',
  props: {
    side: {
      type: String
    },
    highlight: {
      type: Boolean
    }
  },
  methods: {
    dragStart(e) {
      console.log(e)
      this.$emit('dragging', this.side)
    },
    dragStop(e) {
      console.log(e)
    },
    drop(e) {
      this.$emit('drop', this.side)
    }
  }
}
</script>

<style lang="scss">
.calculator-dot {
  width: calc(20% - 20px);
  margin: 0 10px 10px;
  border-radius: 50%;
  background-color: mediumaquamarine;
  cursor: pointer;
  transition: $te $ts;

  &::after {
    content: '';
    display: block;
    padding-top: 100%;
  }

  &.highlight {
    background-color: goldenrod;
  }
}
</style>
