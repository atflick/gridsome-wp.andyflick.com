<template>
  <div :key="$context.id">
    <Hero :fields="heroFields" />
    <BlogContent 
      :categories="post.categories"
      :content="content"
      :date="post.dateFormatted" 
    />
  </div>
</template>
<page-query>
query ($id: ID) {
	post: posts(id: $id) {
    date
    dateFormatted:date(format: "MM/DD/YYYY")
    categories {
      id
      title
      slug
    }
    seo
  }
}
</page-query>
<script>
export default {
  metaInfo() {
    return {
      title: this.$context.title,
      seo: this.$page.post.seo
    }
  },
  computed: {
    content() {
      return this.$context.fields.insights_fields.content
    },
    heroFields() {
      return {
        title: this.$context.title,
        image: {
          url: this.$context.fields.insights_fields.hero_image.url
        },
        text: this.$context.fields.insights_fields.intro_text
      }
    },
    post() {
      return this.$page.post
    }
  }
}
</script>
