<template>
  <Layout>
    <h1>{{ $context.title }}</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.</p>
    <component v-for="(component, index) in components" :key="index" :is="component.componentName" :fields="component"></component>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'About us'
  },
  data() {
    return {
      // components: this.$context.fields.components
    }
  },
  computed: {
    components() {
      return this.$context.fields.components.map((component) => {
        console.log(component);
        component.componentName = component.acf_fc_layout.replace(/_/g, '-');
        return component;
      });
    }

  }
}
</script>
