<template>
  <ul class="primary-nav">
    <li class="primary-nav-item" v-for="item in $static.menu.items" :key="item.id">
      <g-link class="primary-nav-link" :to="item.url">{{ item.title }}</g-link>
      <div class="primary-nav-dropdown" v-if="item.children.length">
        <ul class="primary-nav-dropdown-list">
          <li class="primary-nav-dropdown-list-item" v-for="child in item.children" :key="child.id">
            <g-link class="primary-nav-dropdown-list-link" :to="child.url">{{ child.title }}</g-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<static-query>
  query {
    menu: wordPressMenu(id: "2") {
      id
      items {
        id
        title
        url
        children {
          id
          title
          url
        }
      }
    }
  }
</static-query>

<script>
export default {

}
</script>

<style lang="scss">
  .primary-nav {
    @include kill-bullets;
    display: flex;

    &-item {
      position: relative;

      @include hover {

        .primary-nav-dropdown {
          visibility: visible;
          top: 100%;
          opacity: 1;
        }
      }
    }

    &-link {
      padding: 12px 15px;
      transition: $te $ts;
      border-bottom: 4px solid transparent;
      @include rem(font-size, 18px);

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 6px;
        width: 0;
        background-image: $blue-mid;
        transition: $te $ts;
      }

      @include hover {
        &::before {
          width: 100%;
        }
      }
    }

    &-dropdown {
      position: absolute;
      left: 0;
      top: calc(100% - 4px);
      visibility: hidden;
      background: primary-color(white);
      box-shadow: $shadow;
      transition: $te $ts;
      opacity: 0;
      min-width: 100%;

      &-list {
        @include kill-bullets;

        &-link {
          padding: 10px 15px;
          text-decoration: none;
          border-bottom: 4px solid transparent;
          border: 0;


          @include hover {
            border-color: primary-color(blue);
          }
        }
      }
    }
  }
</style>