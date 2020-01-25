<template>
  <Layout>
    <Hero :fields="heroFields" />
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'About us'
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
