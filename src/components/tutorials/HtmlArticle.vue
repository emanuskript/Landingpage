<script setup>
import { onMounted, ref, watch } from 'vue'
import { fetchHtmlFragment } from '../../composables/useHtmlSource'

const props = defineProps({
  sourcePath: {
    type: String,
    required: true,
  },
  selector: {
    type: String,
    default: 'main.content',
  },
  routeMap: {
    type: Object,
    default: () => ({}),
  },
})

const html = ref('')
const loading = ref(true)
const error = ref('')
const articleRef = ref(null)

function updateQuizScore(question) {
  const quiz = question.closest('.unit-quiz')
  const score = quiz?.querySelector('.unit-quiz-score')
  if (!quiz || !score) return

  const answered = [...quiz.querySelectorAll('.quiz-feedback')].filter((item) => item.dataset.answered === 'true')
  const correct = answered.filter((item) => item.dataset.correct === 'true')
  const total = quiz.querySelectorAll('.quiz-question').length

  if (!answered.length) {
    score.textContent = ''
    return
  }

  score.textContent = `Progress: ${correct.length} of ${total} answered correctly`
}

async function loadFragment() {
  loading.value = true
  error.value = ''

  try {
    html.value = await fetchHtmlFragment(props.sourcePath, props.selector, props.routeMap)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Could not load source content.'
  } finally {
    loading.value = false
  }
}

watch(() => [props.sourcePath, props.selector, JSON.stringify(props.routeMap)], loadFragment, { immediate: true })

onMounted(() => {
  window.checkAnswer = (questionId, correctAnswer, message) => {
    const root = articleRef.value
    if (!root) return

    const question = root.querySelector(`#${questionId}`)
    const feedback = root.querySelector(`#${questionId}-feedback`)
    const selected = question?.querySelector(`input[name="${questionId}"]:checked`)

    if (!question || !feedback) return

    if (!selected) {
      feedback.dataset.answered = 'true'
      feedback.dataset.correct = 'false'
      feedback.textContent = 'Please select an answer before checking.'
      updateQuizScore(question)
      return
    }

    const isCorrect = selected.value === correctAnswer
    feedback.dataset.answered = 'true'
    feedback.dataset.correct = isCorrect ? 'true' : 'false'
    feedback.textContent = isCorrect ? `Correct. ${message}` : `Not quite. ${message}`
    updateQuizScore(question)
  }
})
</script>

<template>
  <div class="html-article">
    <p v-if="loading" class="html-article__status">Loading source material…</p>
    <p v-else-if="error" class="html-article__status html-article__status--error">{{ error }}</p>
    <article v-else ref="articleRef" class="source-article" v-html="html" />
  </div>
</template>

<style scoped>
.html-article {
  min-width: 0;
}

.html-article__status {
  margin: 0;
  padding: 1rem 1.1rem;
  border-radius: 20px;
  background: var(--color-panel);
  border: 1px solid var(--color-border-strong);
}

.html-article__status--error {
  color: var(--color-red);
}

.source-article {
  padding: clamp(1.2rem, 2vw, 1.8rem);
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.96), rgba(244, 236, 221, 0.92)),
    radial-gradient(circle at top right, rgba(57, 89, 120, 0.08), transparent 32%);
  border: 1px solid var(--color-border-strong);
  border-radius: 28px;
  box-shadow: var(--shadow-panel);
}

.source-article :deep(h1),
.source-article :deep(h2),
.source-article :deep(h3),
.source-article :deep(h4) {
  margin: 1.6rem 0 0.7rem;
  line-height: 1.15;
}

.source-article :deep(h1:first-child),
.source-article :deep(h2:first-child),
.source-article :deep(h3:first-child),
.source-article :deep(h4:first-child) {
  margin-top: 0;
}

.source-article :deep(h1) {
  font-size: clamp(1.55rem, 2.4vw, 2rem);
}

.source-article :deep(h2) {
  font-size: clamp(1.3rem, 2vw, 1.6rem);
}

.source-article :deep(h3) {
  font-size: 1.1rem;
}

.source-article :deep(p),
.source-article :deep(li) {
  line-height: 1.7;
}

.source-article :deep(p),
.source-article :deep(ul),
.source-article :deep(ol),
.source-article :deep(blockquote),
.source-article :deep(table) {
  margin: 0.9rem 0 0;
}

.source-article :deep(a) {
  color: var(--color-primary);
}

.source-article :deep(img),
.source-article :deep(iframe),
.source-article :deep(video) {
  display: block;
  max-width: 100%;
  height: auto;
}

.source-article :deep(.takeaway) {
  margin: 0 0 1.4rem;
  padding: 1rem 1rem 1rem 1.2rem;
  background: rgba(108, 136, 69, 0.08);
  border-left: 4px solid var(--color-moss);
  border-radius: 0 18px 18px 0;
  font-family: var(--font-sans);
}

.source-article :deep(.illustration-block) {
  margin: 1.4rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.48);
  border: 1px solid var(--color-border-soft);
  border-radius: 22px;
}

.source-article :deep(.illustration-block img) {
  width: 100%;
  border-radius: 16px;
}

.source-article :deep(.illustration-caption) {
  margin: 0.8rem 0 0;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--color-ink-soft);
}

.source-article :deep(.source-placeholder-figure) {
  display: grid;
  gap: 0.35rem;
  place-items: start;
  padding: 1rem;
  border-radius: 18px;
  background: rgba(57, 89, 120, 0.05);
  border: 1px dashed var(--color-border-strong);
  font-family: var(--font-sans);
}

.source-article :deep(.source-placeholder-figure strong) {
  color: var(--color-primary);
}

.source-article :deep(.glossary-term) {
  position: relative;
  color: var(--color-primary);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 0.18em;
}

.source-article :deep(.glossary-term .glossary-def) {
  display: none;
  position: absolute;
  left: 0;
  bottom: 100%;
  z-index: 10;
  width: min(320px, 80vw);
  margin-bottom: 0.5rem;
  padding: 0.8rem 0.9rem;
  border-radius: 16px;
  background: rgba(255, 252, 246, 0.98);
  border: 1px solid var(--color-border-strong);
  box-shadow: var(--shadow-panel);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--color-ink);
}

.source-article :deep(.glossary-term:hover .glossary-def) {
  display: block;
}

.source-article :deep(.quiz-box),
.source-article :deep(.quiz-section) {
  margin-top: 1.75rem;
  padding: 1rem 1.1rem;
  background: rgba(57, 89, 120, 0.06);
  border: 1px solid var(--color-border-strong);
  border-radius: 20px;
}

.source-article :deep(.quiz-btn) {
  margin-top: 0.8rem;
  padding: 0.6rem 0.8rem;
  border: none;
  border-radius: 999px;
  background: var(--color-primary);
  color: white;
  font-family: var(--font-sans);
}

.source-article :deep(.quiz-feedback) {
  margin-top: 0.65rem;
  font-family: var(--font-sans);
  font-size: 0.9rem;
}

.source-article :deep(.unit-quiz-score) {
  margin-top: 0.9rem;
  font-family: var(--font-sans);
  font-weight: 700;
  color: var(--color-primary);
}

.source-article :deep(.unit-heading),
.source-article :deep(.section-heading),
.source-article :deep(.sub-heading) {
  margin-top: 1.45rem;
}

.source-article :deep(ul),
.source-article :deep(ol) {
  padding-left: 1.2rem;
}
</style>
