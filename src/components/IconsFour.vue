<template>
  <div class="icons-four">
    <div class="icons-four-inner">
      <div class="icons-four-intro">
        <h2 class="icons-four-title -red-bg">This is the title</h2>
        <div class="icons-four-text">Lorem ipsum dolor whatcha doing today?</div>
      </div>
      <div class="icons-four-container">

        <div class="icons-four-item">
          <div class="icons-four-item-icon-bg">
            <div class="icons-four-item-icon icon-fire"></div>
          </div>
          <div class="icons-four-item-title h4">This is the catchy title</div>
          <div class="icons-four-item-text">
            Here is some longer text, it will be hidden until the item is hovered.
          </div>
        </div>

        <div class="icons-four-item">
          <div class="icons-four-item-icon-bg">
            <div class="icons-four-item-icon icon-fire"></div>
          </div>
          <div class="icons-four-item-title h4">This is the catchy title</div>
          <div class="icons-four-item-text">
            Here is some longer text, it will be hidden until the item is hovered.
          </div>
        </div>
        <div class="icons-four-item">
          <div class="icons-four-item-icon-bg">
            <div class="icons-four-item-icon icon-fire"></div>
          </div>
          <div class="icons-four-item-title h4">This is the catchy title</div>
          <div class="icons-four-item-text">
            Here is some longer text, it will be hidden until the item is hovered.
          </div>
        </div>
        <div class="icons-four-item">
          <div class="icons-four-item-icon-bg">
            <div class="icons-four-item-icon icon-fire"></div>
          </div>
          <div class="icons-four-item-title h4">This is the catchy title</div>
          <div class="icons-four-item-text">
            Here is some longer text, it will be hidden until the item is hovered.
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .icons-four {
    @include content-constraint;

    &-inner {
      padding-bottom: 1px;

      @include to(9) {
        max-width: 700px;
      }
    }

    &-intro {
      text-align: center;
      margin-bottom: 30px;

      @include from(7) {
        margin-bottom: 50px;
      }
    }

    &-text {
      margin-top: 20px;
    }

    &-container {
      position: relative;
      margin-bottom: -30px;

      @include from(5) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0 -20px -30px;
      }

      @include from(7) {
        margin: 0 -30px -50px;
      }

      @include from(10) {
        justify-content: space-between;
        margin: 0 -15px;
      }
    }

    &-item {
      position: relative;
      margin: 0 auto 30px;
      max-width: 250px;
      text-align: center;
      transition: $te $ts;
      overflow: hidden;

      @include from(5) {
        width: calc(50% - 40px);
        margin: 0 20px 30px;
      }

      @include from(7) {
        margin: 0 30px 50px;
        width: calc(50% - 60px);
      }

      @include from(10) {
        padding: 30px 20px;
        margin: 0 15px;
        border: 5px solid transparent;
        width: calc(25% - 30px);
      }

      @include hover {
        @include from(10) {
          /* top: -80px; */
          margin-top: -80px;
          box-shadow: $shadow;
          border-color: rgba(primary-color(purple), .3);
          background: rgba(#fff, .9);

          .icons-four-item-text {
            visibility: visible;
            opacity: 1;
            max-height: 80px;
          }

          .icons-four-item-icon {
            border-color: transparent;
          }

          .icons-four-item-icon-bg {
            border-color: primary-color(purple);

            &::before,
            &::after {
              height: 0;
            }
          }
        }
      }

      &-icon {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        border: 2px solid primary-color(blue);
        border-radius: 50%;
        height: 75px;
        width: 75px;
        @include rem(font-size, 40px);
        transition: $te .6s;

        @include from(7) {
          height: 100px;
          width: 100px;
          @include rem(font-size, 55px);
        }

        @include from(10) {
          position: absolute;
          top: -2px;
          left: -2px;
          bottom: -2px;
          right: -2px;
        }

        &-bg {
          margin: 0 0 15px;

          @include from(10) {
            position: relative;
            margin: 0 auto 15px;
            border: 2px solid primary-color(purple);
            border-radius: 50%;
            height: 100px;
            width: 100px;

            &::before {
              content: '';
              position: absolute;
              left: -2px;
              right: -2px;
              height: calc(50% + 2px);
              top: -2px;
              background: primary-color(white);
              transition: $te .3s;
            }

            &::after {
              content: '';
              position: absolute;
              left: -2px;
              right: -2px;
              height: calc(50% + 2px);
              bottom: -2px;
              background: primary-color(white);
              transition: $te .3s;
            }
          }
        }
      }

      &-title {
        text-align: center;
        margin-bottom: 10px;
      }

      &-text {
        transition: $te $ts;

        @include from(10) {
          visibility: hidden;
          opacity: 0;
          max-height: 0;
        }
      }
    }
  }
</style>