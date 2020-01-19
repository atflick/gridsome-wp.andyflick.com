<template>
  <Layout>
    <component v-for="(component, index) in components" :key="index" :is="component.componentName" :fields="component"></component>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'About us'
  },
  computed: {
    components() {
      if (this.$context.fields.components) {
        return this.$context.fields.components.map((component) => {
          component.componentName = component.acf_fc_layout.replace(/_/g, '-');
          return component;
        });
      }
    }
  }
}
</script>
