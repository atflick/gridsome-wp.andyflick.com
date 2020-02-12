<template>
  <div :key="$context.id">
    <Hero :fields="heroFields" />
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
    heroFields() {
      return {
        title: this.$context.title,
        image: {
          url: this.$context.fields.insights_fields.hero_image.url
        },
        text: this.$context.fields.insights_fields.intro_text
      }
    }
  }
}
</script>
