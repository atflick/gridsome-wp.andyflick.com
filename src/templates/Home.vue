<template>
  <Layout>
    <HomeHero :fields="homeHero" />
    <RecentPosts />
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'About us'
  },
  computed: {
    homeHero() {
      if (this.$context.fields.home_hero) {
        return this.$context.fields.home_hero;
      }
    }
  }
}
</script>
