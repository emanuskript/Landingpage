<script setup>
import FigureBlock from './FigureBlock.vue'
import FurtherReadingBlock from './FurtherReadingBlock.vue'
import HtmlArticle from './HtmlArticle.vue'
import SectionFrame from '../ui/SectionFrame.vue'

defineProps({
  blocks: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="tutorial-content-renderer">
    <template v-for="(block, index) in blocks" :key="block.id || `${block.type}-${index}`">
      <HtmlArticle
        v-if="block.type === 'html-source'"
        :source-path="block.sourcePath"
        :selector="block.selector"
        :route-map="block.routeMap"
        :asset-map="block.assetMap"
      />

      <SectionFrame
        v-else-if="block.type === 'section'"
        :eyebrow="block.eyebrow"
        :title="block.title"
        :tone="block.tone || 'default'"
      >
        <p v-for="paragraph in block.paragraphs || []" :key="paragraph">{{ paragraph }}</p>

        <div v-if="block.subsections?.length" class="tutorial-content-renderer__subsections">
          <section
            v-for="subsection in block.subsections"
            :key="subsection.title"
            class="tutorial-content-renderer__subsection"
          >
            <h3>{{ subsection.title }}</h3>
            <p v-for="paragraph in subsection.paragraphs || []" :key="paragraph">{{ paragraph }}</p>
            <ul v-if="subsection.items?.length">
              <li v-for="item in subsection.items" :key="item">{{ item }}</li>
            </ul>
          </section>
        </div>

        <component
          :is="block.ordered ? 'ol' : 'ul'"
          v-if="block.items?.length"
          class="tutorial-content-renderer__list"
        >
          <li v-for="item in block.items" :key="item">{{ item }}</li>
        </component>

        <blockquote v-if="block.quote" class="tutorial-content-renderer__quote">
          <p>{{ block.quote.text }}</p>
          <cite v-if="block.quote.source">{{ block.quote.source }}</cite>
        </blockquote>

        <dl v-if="block.definitions?.length" class="tutorial-content-renderer__definitions">
          <div v-for="definition in block.definitions" :key="definition.term">
            <dt>{{ definition.term }}</dt>
            <dd>{{ definition.definition }}</dd>
          </div>
        </dl>

        <div v-if="block.links?.length" class="tutorial-content-renderer__links">
          <h3 v-if="block.linksTitle">{{ block.linksTitle }}</h3>
          <ul>
            <li v-for="link in block.links" :key="link.href">
              <a :href="link.href" target="_blank" rel="noreferrer noopener">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </SectionFrame>

      <SectionFrame
        v-else-if="block.type === 'callout'"
        :title="block.title"
        :tone="block.tone || 'muted'"
      >
        <div class="tutorial-content-renderer__callout" :class="`tutorial-content-renderer__callout--${block.variant || 'note'}`">
          <p v-for="paragraph in block.paragraphs || []" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="block.items?.length">
            <li v-for="item in block.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </SectionFrame>

      <SectionFrame
        v-else-if="block.type === 'check'"
        :title="block.title || 'Check your understanding'"
        :tone="block.tone || 'muted'"
      >
        <p v-if="block.intro">{{ block.intro }}</p>
        <ol class="tutorial-content-renderer__checklist">
          <li v-for="item in block.items || []" :key="item.prompt">
            <strong>{{ item.prompt }}</strong>
            <p v-if="item.guidance">{{ item.guidance }}</p>
          </li>
        </ol>
      </SectionFrame>

      <FigureBlock
        v-else-if="block.type === 'figure'"
        :image="block.image"
        :alt="block.alt"
        :caption="block.caption"
        :detail="block.detail || ''"
      />

      <div v-else-if="block.type === 'figure-grid'" class="tutorial-content-renderer__figure-grid">
        <FigureBlock
          v-for="figure in block.figures"
          :key="figure.image"
          :image="figure.image"
          :alt="figure.alt"
          :caption="figure.caption"
          :detail="figure.detail || ''"
        />
      </div>

      <FurtherReadingBlock
        v-else-if="block.type === 'references'"
        :title="block.title || 'Further reading'"
        :items="block.items"
      />
    </template>
  </div>
</template>

<style scoped>
.tutorial-content-renderer {
  display: grid;
  gap: 1rem;
}

.tutorial-content-renderer__subsections {
  display: grid;
  gap: 1rem;
}

.tutorial-content-renderer__subsection + .tutorial-content-renderer__subsection {
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-light);
}

.tutorial-content-renderer__subsection h3,
.tutorial-content-renderer__links h3 {
  margin: 0 0 0.55rem;
  font-size: 1.05rem;
}

.tutorial-content-renderer__list {
  margin: 0;
}

.tutorial-content-renderer__quote {
  margin: 0;
  padding: 0.95rem 1.1rem;
  border-left: 3px solid var(--color-gold-muted);
  background: rgba(255, 251, 243, 0.76);
  border-radius: 0 18px 18px 0;
}

.tutorial-content-renderer__quote cite {
  display: block;
  margin-top: 0.6rem;
  font-family: var(--font-sans);
  font-size: 0.88rem;
  color: var(--color-ink-soft);
}

.tutorial-content-renderer__definitions {
  display: grid;
  gap: 0.85rem;
  margin: 0;
}

.tutorial-content-renderer__definitions div {
  padding: 0.9rem 1rem;
  border-radius: 18px;
  background: rgba(255, 249, 240, 0.72);
  border: 1px solid var(--color-border-soft);
}

.tutorial-content-renderer__definitions dt {
  font-family: var(--font-display);
  margin-bottom: 0.35rem;
}

.tutorial-content-renderer__definitions dd {
  margin: 0;
  color: var(--color-ink-soft);
}

.tutorial-content-renderer__links ul,
.tutorial-content-renderer__checklist {
  margin: 0;
}

.tutorial-content-renderer__callout {
  display: grid;
  gap: 0.75rem;
  padding: 0.15rem 0;
}

.tutorial-content-renderer__callout--note {
  color: var(--color-ink-soft);
}

.tutorial-content-renderer__callout--takeaway {
  padding: 0.95rem 1rem;
  border-left: 4px solid var(--color-moss);
  background: rgba(108, 136, 69, 0.08);
  border-radius: 0 18px 18px 0;
}

.tutorial-content-renderer__checklist {
  display: grid;
  gap: 0.8rem;
}

.tutorial-content-renderer__checklist li {
  padding: 0.85rem 1rem;
  border-radius: 18px;
  background: rgba(255, 251, 243, 0.72);
  border: 1px solid var(--color-border-soft);
}

.tutorial-content-renderer__checklist li p {
  margin: 0.45rem 0 0;
  color: var(--color-ink-soft);
}

.tutorial-content-renderer__figure-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
</style>
