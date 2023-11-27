<template>
  <div
    class="calculator-box"
    @dragover.prevent
    @drop.prevent="drop"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CalculatorBox',
  props: {
    side: {
      type: String
    }
  },
  methods: {
    drop(e) {
      this.$emit('drop', this.side)
    }
  }
}
</script>

<style lang="scss">
.calculator-box {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  height: 800px;
  cursor: pointer;
}
</style>
