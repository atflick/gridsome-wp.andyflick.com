<template>
  <ul>
    <li v-for="item in $static.menu.items" :key="item.id">
      <g-link :to="item.url">{{ item.title }}</g-link>
      <ul v-if="item.children.length">
        <li v-for="child in item.children" :key="child.id">
          <g-link :to="child.url">{{ child.title }}</g-link>
        </li>
      </ul>
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
