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
    menu: menu(id: "2") {
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
      background: primary-color(white);
      transition: $te $ts;
      border-bottom: 4px solid transparent;

      @include hover {
        background: primary-color(gray);
        color: primary-color(white);
        border-color: primary-color(blue);
      }
    }

    &-dropdown {
      position: absolute;
      left: 0;
      top: calc(100% - 4px);
      padding: 10px 15px;
      background: primary-color(white);
      box-shadow: $shadow;
      transition: $te $ts;
      opacity: 0;
      min-width: 100%;

      &-list {
        @include kill-bullets;
      }
    }
  }
</style>