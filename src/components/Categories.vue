<template>
  <div class="categories">
    <h3 v-if="title.length" class="h3 categories-title">{{ title }}</h3>
    <ul class="categories-list" :class="listStyle">
      <li v-for="cat in categories" :key="cat.id">
        <g-link :to="'/categories/' + cat.slug" :class="linkStyle">
          <span>
            {{ cat.title }}
          </span>
        </g-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Categories',
  props: {
    title: {
      type: String,
      default: 'Categories'
    },
    categories: {
      type: Array
    },
    style: {
      type: String,
      default: 'pills'
    }
  },
  computed: {
    listStyle() {
      if (this.style === 'pills') {
        return 'pills'
      } else {
        return ''
      }
    },
    linkStyle() {
      if (this.style === 'pills') {
        return 'pill'
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss">
  .categories {
    // &-title {
    //   padding: 15px 0;
    //   border-bottom: 14px solid rgba(primary-color(red), .3);
    //   margin-bottom: 15px;
    // }

    &-list {
      @include kill-bullets;

      &.pills {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -4px -8px;

        .pill {
          margin: 0 4px 8px;
        }
      }
    }
  }
</style>