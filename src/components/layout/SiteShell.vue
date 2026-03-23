<script setup>
import PageHero from './PageHero.vue'

defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  lede: {
    type: String,
    default: '',
  },
  meta: {
    type: Array,
    default: () => [],
  },
  wide: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section class="site-shell">
    <div :class="['site-shell__inner', wide ? 'container--wide' : 'container']">
      <slot name="prelude" />
      <PageHero :eyebrow="eyebrow" :title="title" :lede="lede" :meta="meta" />
      <div class="site-shell__content">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.site-shell {
  padding: clamp(2.4rem, 6vw, 4.5rem) 0 5rem;
}

.site-shell__inner {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.site-shell__content {
  margin-top: 2.2rem;
}
</style>
