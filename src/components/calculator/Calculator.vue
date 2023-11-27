<template>
  <div class="calculator">
    <div class="calculator-controls">
      <div class="calculator-controls-side">
        <a href="#" class="calculator-button" @click.prevent="ballsOnLeft = ballsOnLeft - 1">-</a>
        <div class="h1 -blue-bg -white calculator-controls-count">{{ ballsOnLeft }}</div>
        <a href="#" class="calculator-button" @click.prevent="ballsOnLeft = ballsOnLeft + 1">+</a>
      </div>
      <div class="calculator-controls-total">
        <div class="calculator-controls-total-inner"><span>{{ total }}</span></div>
      </div>
      <div class="calculator-controls-side">
        <a href="#" class="calculator-button"  @click.prevent="ballsOnRight = ballsOnRight - 1">-</a>
        <div class="h1 -blue-bg -white calculator-controls-count">{{ ballsOnRight }}</div>
        <a href="#" class="calculator-button" @click.prevent="ballsOnRight = ballsOnRight + 1">+</a>
      </div>
    </div>
    <div class="calculator-container">
      <CalculatorBox @drop="handleDrop" side="left">
        <CalculatorDot v-for="item in ballsOnLeft" :key="item" side="left" @dragging="handleDragging" :highlight="fiveGroupHighlight(item, ballsOnLeft)"/>
      </CalculatorBox>
      <CalculatorBox @drop="handleDrop" side="right">
        <CalculatorDot v-for="item in ballsOnRight" :key="item" side="right" @dragging="handleDragging" :highlight="fiveGroupHighlight(item, ballsOnRight)"/>
      </CalculatorBox>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      ballsOnLeft: 0,
      ballsOnRight: 1,
      activeDrag: ''
    }
  },
  computed: {
    total() {
      return this.ballsOnLeft + this.ballsOnRight
    }
  },
  methods: {
    handleDragging(side) {
      console.log(side);
      this.activeDrag = side
    },
    handleDrop(side) {
      console.log(side);

      if (side === this.activeDrag) {
        return
      }

      if (side === 'left' && this.activeDrag === 'right') {
        this.ballsOnLeft = this.ballsOnLeft + 1
        this.ballsOnRight = this.ballsOnRight - 1
      }

      if (side === 'right' && this.activeDrag === 'left') {
        this.ballsOnLeft = this.ballsOnLeft - 1
        this.ballsOnRight = this.ballsOnRight + 1
      }
    },
    fiveGroupHighlight(index, total) {
      const remaining = total % 5
      const lastHighlight = total - remaining
      return index <= lastHighlight
    }
  }
}
</script>

<style lang="scss">
.calculator {
  padding: 25px;

  &-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    margin-bottom: 10px;
    background: primary-color(gray);

    &-side {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      width: 40%;
    }

    &-count {
      width: 100px;
      text-align: center;
      margin: 0;
    }

    &-total {
      display: flex;
      position: relative;
      min-width: 70px;
      width: 10%;

      &-inner {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 105%;
        max-width: 130px;
        background-color: white;
        border-radius: 50%;

        &:after {
          content: '';
          display: block;
          padding-top: 100%;
        }

        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          @include rem(font-size, 60px);
          @include font-weight(bold);
          font-family: $header-font;
        }
      }
    }
  }

  &-container {
    display: flex;
    justify-content: space-between;
  }

  &-box {
    border: 4px solid black;
    border-radius: 20px;
    padding: 30px;
    width: calc(50% - 25px);
  }

  &-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    @include rem(font-size, 40px);
    background: white;
    @include font-weight(bold);
    border-radius: 50%;
    width: 55px;
    height: 55px;
    margin: 0 30px;
  }
}
</style>
