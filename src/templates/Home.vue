<template>
  <div>
    <HomeHero :fields="hero" />
    <!-- <HomeAbout /> -->
    <component v-for="(component, index) in components" :key="index" :is="component.componentName" :fields="component"></component>
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
