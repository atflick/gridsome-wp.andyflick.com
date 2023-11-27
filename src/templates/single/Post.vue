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
    const seo = unescape(this.$page.post.seo)
    console.log(seo);
    const r = new RegExp(/<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)/, 'g')
    const headObject = {
      meta: []
    };
    console.log(seo.matchAll(r));
    [...seo.matchAll(r)].map((item) => {
      console.log(item);
      const [tag, tagName, attributes] = item;
      if (tagName === 'meta') {
        const attrRegex = new RegExp(/([\w-]*)(=")([^"]*)/, 'g')
        console.log(attributes);
        const metaObject = {};

        [...attributes.matchAll(attrRegex)].forEach((match) => {
          console.log(process.env.WORDPRESS_URL);
          const content = match[3].replace(process.env.WORDPRESS_URL, 'https://www.andyflick.com')
          metaObject[match[1]] = content
        });

        headObject.meta.push(metaObject)
        // console.log([...attrMatches]);
      }
    })
    console.log(headObject);
    return {
      title: this.$context.title,
      ...headObject
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
