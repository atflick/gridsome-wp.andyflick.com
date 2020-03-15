<template>
  <div>
    <HomeHero :fields="hero" />
    <!-- <HomeAbout /> -->
    <IconsFour />
    <RecentPosts />
  </div>
</template>

<script>
import HomeAbout from '../components/home/HomeAbout'
export default {
  components: {
    HomeAbout
  },
  metaInfo() {
    return {
      title: this.$context.title
    }
  },
  computed: {
    hero() {
      if (this.$context.fields.hero) {
        return this.$context.fields.hero;
      }
    }
  }
}
</script>
