<script setup>
import { nextTick, onMounted, onUpdated, ref, watch } from 'vue'
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
  assetMap: {
    type: Object,
    default: () => ({}),
  },
})

const html = ref('')
const loading = ref(true)
const error = ref('')
const articleRef = ref(null)

function showFeedback(feedback, variant, text) {
  feedback.dataset.answered = 'true'
  feedback.dataset.correct = variant === 'correct' ? 'true' : 'false'
  feedback.className = `quiz-feedback quiz-feedback--visible ${variant}`
  feedback.style.display = 'block'
  feedback.hidden = false
  feedback.textContent = text
}

function updateQuizScore(question) {
  const quiz = question.closest('.unit-quiz')
  const score = quiz?.querySelector('.unit-quiz-score')
  if (!quiz || !score) return

  const answered = [...quiz.querySelectorAll('.quiz-feedback')].filter((item) => item.dataset.answered === 'true')
  const correct = answered.filter((item) => item.dataset.correct === 'true')
  const total = quiz.querySelectorAll('.quiz-question').length
  const passThreshold = Math.max(1, Math.ceil(total * 0.67))

  score.classList.remove('pass', 'fail')

  if (!answered.length) {
    score.textContent = ''
    return
  }

  if (answered.length < total) {
    score.textContent = `Progress: ${answered.length} of ${total} questions checked · ${correct.length} correct so far`
    return
  }

  const didPass = correct.length >= passThreshold
  score.classList.add(didPass ? 'pass' : 'fail')
  score.textContent = `Result: ${correct.length} of ${total} correct`
}

function runCheckAnswer(questionId, correctAnswer, message) {
  const root = articleRef.value
  if (!root) return

  const question = root.querySelector(`#${questionId}`)
  const feedback = root.querySelector(`#${questionId}-feedback`)
  const selected = question?.querySelector(`input[name="${questionId}"]:checked`)

  if (!question || !feedback) return

  if (!selected) {
    showFeedback(feedback, 'incorrect', 'Select one answer first, then choose Check answer.')
    updateQuizScore(question)
    return
  }

  const isCorrect = selected.value === correctAnswer
  showFeedback(
    feedback,
    isCorrect ? 'correct' : 'incorrect',
    isCorrect ? `Correct answer. ${message}` : `Incorrect answer. ${message}`,
  )
  updateQuizScore(question)
}

function bindQuizButton(button) {
  if (button.__quizHandler) {
    button.removeEventListener('click', button.__quizHandler)
  }

  button.setAttribute('type', 'button')
  button.dataset.quizBound = 'true'

  const handler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    runCheckAnswer(
      button.dataset.questionId,
      button.dataset.correctAnswer,
      button.dataset.feedbackMessage,
    )
  }

  button.__quizHandler = handler
  button.addEventListener('click', handler)
}

function initializeQuizzes() {
  const root = articleRef.value
  if (!root) return

  root.querySelectorAll('.quiz-feedback').forEach((feedback) => {
    feedback.dataset.answered = 'false'
    feedback.dataset.correct = 'false'
    feedback.textContent = ''
    feedback.setAttribute('aria-live', 'polite')
    feedback.style.display = 'none'
    feedback.hidden = true
    feedback.classList.remove('correct', 'incorrect')
    feedback.classList.remove('quiz-feedback--visible')
  })

  root.querySelectorAll('.unit-quiz-score').forEach((score) => {
    score.textContent = ''
    score.classList.remove('pass', 'fail')
  })

  root.querySelectorAll('.quiz-btn[data-question-id]').forEach((button) => {
    bindQuizButton(button)
  })
}

async function loadFragment() {
  loading.value = true
  error.value = ''

  try {
    html.value = await fetchHtmlFragment(props.sourcePath, props.selector, props.routeMap, props.assetMap)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Could not load source content.'
  } finally {
    loading.value = false
  }
}

watch(
  () => [props.sourcePath, props.selector, JSON.stringify(props.routeMap), JSON.stringify(props.assetMap)],
  loadFragment,
  { immediate: true },
)

watch(
  () => [loading.value, html.value],
  async ([isLoading, fragment]) => {
    if (isLoading || !fragment) return
    await nextTick()
    initializeQuizzes()
  },
)

onMounted(async () => {
  if (loading.value || !html.value) return
  await nextTick()
  initializeQuizzes()
})

onUpdated(() => {
  initializeQuizzes()
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

.source-article > :deep(*) {
  content-visibility: auto;
  contain-intrinsic-size: 1px 120px;
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

.source-article :deep(.ornament) {
  margin: 1.35rem 0;
  border: 0;
  border-top: 1px solid rgba(106, 83, 43, 0.28);
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

.source-article :deep(.body-list) {
  padding-left: 1.25rem;
  font-family: var(--font-sans);
}

.source-article :deep(.source-table-wrap) {
  width: 100%;
  margin: 1.2rem 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.source-article :deep(table) {
  width: 100%;
  border-collapse: collapse;
  min-width: 32rem;
  font-family: var(--font-sans);
  font-size: 0.92rem;
  line-height: 1.55;
  background: rgba(255, 252, 246, 0.78);
  border: 1px solid rgba(106, 83, 43, 0.16);
  border-radius: 16px;
  overflow: hidden;
}

.source-article :deep(th),
.source-article :deep(td) {
  padding: 0.78rem 0.9rem;
  border-bottom: 1px solid rgba(106, 83, 43, 0.14);
  vertical-align: top;
}

.source-article :deep(thead th) {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink-soft);
  background: rgba(57, 89, 120, 0.06);
}

.source-article :deep(tbody tr:last-child td) {
  border-bottom: 0;
}

.source-article :deep(.badge),
.source-article :deep(.pill) {
  display: inline-flex;
  align-items: center;
  padding: 0.22rem 0.58rem;
  border-radius: 999px;
  border: 1px solid rgba(106, 83, 43, 0.18);
  background: rgba(255, 255, 255, 0.8);
  font-size: 0.76rem;
  line-height: 1.25;
  color: var(--color-ink-soft);
}

.source-article :deep(.script-name),
.source-article :deep(.sname) {
  font-weight: 700;
  color: var(--color-primary-strong);
}

.source-article :deep(.script-alt),
.source-article :deep(.col-head),
.source-article :deep(.no-data) {
  display: block;
  margin-top: 0.18rem;
  font-size: 0.8rem;
  color: var(--color-ink-soft);
}

.source-article :deep(.source-placeholder-figure) {
  display: grid;
  gap: 0.45rem;
  place-items: start;
  margin: 1.4rem 0;
  padding: 1rem 1.1rem;
  border-radius: 20px;
  background: rgba(255, 251, 243, 0.86);
  border: 1px solid var(--color-border-strong);
  font-family: var(--font-sans);
  color: var(--color-ink-soft);
}

.source-article :deep(.source-placeholder-figure strong) {
  color: var(--color-primary);
}

.source-article :deep(.source-placeholder-figure a) {
  font-size: 0.88rem;
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

.source-article :deep(.ref-box) {
  margin: 1.8rem 0;
  padding: 1.2rem 1.3rem;
  background:
    linear-gradient(180deg, rgba(252, 248, 241, 0.97), rgba(239, 229, 211, 0.92)),
    radial-gradient(circle at top right, rgba(212, 182, 113, 0.12), transparent 34%);
  border: 1px solid var(--color-border-strong);
  border-radius: 22px;
  box-shadow: 0 10px 22px rgba(69, 49, 23, 0.05);
  line-height: 1.8;
}

.source-article :deep(.ref-box strong) {
  display: inline-block;
  margin: 0 0 0.2rem;
  color: var(--color-primary-strong);
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.04em;
}

.source-article :deep(.ref-box a) {
  text-decoration-thickness: 0.07em;
  text-underline-offset: 0.18em;
}

.source-article :deep(.unit-quiz) {
  margin-top: 2rem;
  padding: 1.35rem;
  background:
    linear-gradient(180deg, rgba(253, 250, 244, 0.98), rgba(239, 229, 211, 0.94)),
    radial-gradient(circle at top right, rgba(57, 89, 120, 0.1), transparent 30%);
  border: 1px solid var(--color-border-strong);
  border-radius: 26px;
  box-shadow: var(--shadow-panel);
}

.source-article :deep(.unit-quiz-heading) {
  margin: 0 0 1.1rem;
  color: var(--color-primary-strong);
  font-family: var(--font-display);
  font-size: clamp(1.02rem, 1.7vw, 1.22rem);
  letter-spacing: 0.03em;
}

.source-article :deep(.quiz-question) {
  margin: 0 0 1rem;
  padding: 1rem 1rem 1.05rem;
  background: rgba(255, 252, 245, 0.9);
  border: 1px solid rgba(106, 83, 43, 0.2);
  border-radius: 20px;
}

.source-article :deep(.quiz-question:last-of-type) {
  margin-bottom: 0;
}

.source-article :deep(.question-number) {
  display: inline-flex;
  align-items: center;
  margin: 0 0 0.65rem;
  padding: 0.24rem 0.62rem;
  border-radius: 999px;
  background: rgba(57, 89, 120, 0.12);
  color: var(--color-primary-strong);
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.source-article :deep(.question-text) {
  margin: 0 0 0.85rem;
  color: var(--color-ink);
  font-size: 1.02rem;
  font-weight: 700;
  line-height: 1.55;
}

.source-article :deep(.option-label) {
  display: flex;
  gap: 0.72rem;
  align-items: flex-start;
  margin: 0.5rem 0 0;
  padding: 0.72rem 0.82rem;
  border: 1px solid var(--color-border-light);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.52);
  transition:
    border-color var(--transition-base),
    background var(--transition-base),
    transform var(--transition-fast),
    box-shadow var(--transition-base);
  cursor: pointer;
}

.source-article :deep(.option-label:hover) {
  border-color: rgba(57, 89, 120, 0.35);
  background: rgba(236, 243, 248, 0.72);
  transform: translateY(-1px);
}

.source-article :deep(.option-label:has(input:checked)) {
  border-color: rgba(57, 89, 120, 0.5);
  background: rgba(220, 232, 242, 0.78);
  box-shadow: inset 0 0 0 1px rgba(57, 89, 120, 0.08);
}

.source-article :deep(.option-label input) {
  margin-top: 0.22rem;
  accent-color: var(--color-primary);
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

.source-article :deep(.quiz-btn) {
  margin-top: 0.9rem;
  padding: 0.68rem 1rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: linear-gradient(180deg, #3e5d7c, #29445f);
  color: #fffdf8;
  font-family: var(--font-sans);
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(33, 56, 79, 0.14);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-base),
    background var(--transition-base);
}

.source-article :deep(.quiz-btn:hover),
.source-article :deep(.quiz-btn:focus-visible) {
  background: linear-gradient(180deg, #4a6b8d, #30516f);
  box-shadow: 0 11px 22px rgba(33, 56, 79, 0.18);
  transform: translateY(-1px);
  outline: none;
}

.source-article :deep(.quiz-feedback) {
  display: none;
  min-height: 1.5rem;
  margin-top: 0.75rem;
  padding: 0.78rem 0.9rem;
  border-radius: 16px;
  background: rgba(255, 251, 243, 0.94);
  border: 1px solid var(--color-border-light);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
  font-family: var(--font-sans);
  font-size: 0.93rem;
  line-height: 1.55;
  color: var(--color-ink-soft);
}

.source-article :deep(.quiz-feedback.quiz-feedback--visible) {
  display: block;
}

.source-article :deep(.quiz-feedback.correct) {
  background: rgba(108, 136, 69, 0.12);
  border: 1px solid rgba(108, 136, 69, 0.3);
  color: #294614;
}

.source-article :deep(.quiz-feedback.incorrect) {
  background: rgba(143, 67, 56, 0.1);
  border: 1px solid rgba(143, 67, 56, 0.24);
  color: #6b2b24;
}

.source-article :deep(.unit-quiz-score) {
  min-height: 1.35rem;
  margin-top: 1rem;
  padding: 0.78rem 0.9rem;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 700;
}

.source-article :deep(.unit-quiz-score.pass) {
  background: rgba(108, 136, 69, 0.12);
  border: 1px solid rgba(108, 136, 69, 0.28);
  color: #294614;
}

.source-article :deep(.unit-quiz-score.fail) {
  background: rgba(143, 67, 56, 0.1);
  border: 1px solid rgba(143, 67, 56, 0.22);
  color: #6b2b24;
}

@media (max-width: 720px) {
  .source-article :deep(.unit-quiz) {
    padding: 1rem;
  }

  .source-article :deep(.quiz-question) {
    padding: 0.9rem;
  }

  .source-article :deep(.option-label) {
    padding: 0.68rem 0.72rem;
  }
}
</style>
