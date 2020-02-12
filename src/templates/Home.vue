<template>
  <div>
    <HomeHero :fields="hero" />
    <RecentPosts />
  </div>
</template>

<script>
export default {
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
