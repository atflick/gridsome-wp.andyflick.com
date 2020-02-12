<template>
  <div :key="$context.id">
    <Hero :fields="hero" />
    <component v-for="(component, index) in components" :key="index" :is="component.componentName" :fields="component"></component>
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
    },
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
