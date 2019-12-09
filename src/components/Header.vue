<template>
  <ul>
    <li v-for="(item, index) in $static.menu.items" :key="index">
      <g-link :to="item.url">{{ item.title }}</g-link>
    </li>
  </ul>
</template>

<static-query>
  query {
    menu:   menu(id: "2") {
      id
      items {
        title
        url
        children {
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
