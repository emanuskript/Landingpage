<script setup>
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const expanded = ref(false)
const showPulse = ref(true)
const rootlingRef = ref(null)

const branches = reactive([
  {
    label: 'Apps',
    to: { name: 'apps' },
    expanded: false,
    children: [
      { label: 'Mergen', to: { name: 'app-mergen' } },
      { label: 'Seshat', to: { name: 'app-seshat' } },
      { label: 'Proteus', to: { name: 'app-proteus' } },
      { label: 'Fenius', to: { name: 'app-fenius' } },
    ],
  },
  { label: 'Tutorials', to: { name: 'tutorials' } },
  { label: 'Bibliography', to: { name: 'bibliography' } },
  { label: 'About the Project', to: { name: 'about' } },
  { label: 'Team', to: { name: 'team' } },
])

function resolveTarget(target) {
  return router.resolve(target)
}

function isRouteActive(target) {
  const resolved = resolveTarget(target)
  return route.path === resolved.path || route.path.startsWith(`${resolved.path}/`)
}

function hasActiveChild(branch) {
  return branch.children?.some((child) => isRouteActive(child.to)) ?? false
}

function syncBranches() {
  branches.forEach((branch) => {
    if (branch.children) {
      branch.expanded = hasActiveChild(branch)
    }
  })
}

function toggle() {
  expanded.value = !expanded.value
  showPulse.value = false
}

function close() {
  expanded.value = false
}

function toggleSubBranch(index) {
  const branch = branches[index]
  if (!branch?.children) return
  branch.expanded = !branch.expanded
}

function branchStyle(index) {
  const total = branches.length
  const spreadAngle = 100
  const startAngle = -spreadAngle / 2
  const angle = startAngle + (index / (total - 1)) * spreadAngle
  return {
    '--branch-delay': `${index * 60}ms`,
    '--branch-angle': `${angle}deg`,
  }
}

function branchPath(index) {
  const total = branches.length
  const t = index / (total - 1)
  const curveX = 30 + t * 60
  return `M60 58 Q${curveX} 30 ${20 + t * 80} 5`
}

function handleClickOutside(event) {
  if (rootlingRef.value && !rootlingRef.value.contains(event.target)) {
    close()
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape' && expanded.value) {
    close()
  }
}

watch(
  () => route.path,
  () => {
    syncBranches()
  },
  { immediate: true },
)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)

  window.setTimeout(() => {
    showPulse.value = false
  }, 4000)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div ref="rootlingRef" class="rootling" :class="{ expanded }">
    <button
      class="rootling-trigger"
      :class="{ pulsing: showPulse }"
      :aria-expanded="expanded"
      aria-label="Site navigation"
      @click="toggle"
    >
      <svg class="rootling-icon" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
        <path d="M20 38 L20 20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M20 30 Q14 26 8 28" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" />
        <path d="M20 32 Q26 28 32 30" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" />
        <path d="M20 20 Q14 14 10 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" />
        <path d="M20 20 Q26 14 30 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" />
        <circle cx="10" cy="6" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="30" cy="6" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="8" cy="28" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="32" cy="30" r="1.5" fill="currentColor" opacity="0.5" />
      </svg>
    </button>

    <transition name="roots">
      <nav v-if="expanded" class="rootling-menu" aria-label="Main site navigation" @keydown.escape="close">
        <div v-for="(branch, index) in branches" :key="branch.label" class="root-branch" :style="branchStyle(index)">
          <svg class="branch-line" viewBox="0 0 120 60" preserveAspectRatio="none" aria-hidden="true">
            <path :d="branchPath(index)" stroke="var(--color-gold-muted)" stroke-width="1.5" fill="none" stroke-linecap="round" />
          </svg>

          <template v-if="branch.children">
            <div class="branch-parent">
              <RouterLink
                :to="branch.to"
                class="branch-label"
                :class="{ 'branch-label--active': isRouteActive(branch.to) }"
                @click="close"
              >
                {{ branch.label }}
              </RouterLink>

              <button
                class="branch-toggle"
                :aria-expanded="branch.expanded"
                :aria-label="`${branch.expanded ? 'Collapse' : 'Expand'} ${branch.label}`"
                @click="toggleSubBranch(index)"
              >
                <span class="branch-caret" :class="{ open: branch.expanded }">&#9656;</span>
              </button>
            </div>

            <transition name="sub-roots">
              <div v-if="branch.expanded" class="sub-branches">
                <RouterLink
                  v-for="child in branch.children"
                  :key="child.label"
                  :to="child.to"
                  class="sub-branch-label"
                  :class="{ 'sub-branch-label--active': isRouteActive(child.to) }"
                  @click="close"
                >
                  {{ child.label }}
                </RouterLink>
              </div>
            </transition>
          </template>

          <RouterLink
            v-else
            :to="branch.to"
            class="branch-label"
            :class="{ 'branch-label--active': isRouteActive(branch.to) }"
            @click="close"
          >
            {{ branch.label }}
          </RouterLink>
        </div>
      </nav>
    </transition>
  </div>
</template>

<style scoped>
.rootling {
  position: fixed;
  bottom: var(--space-lg);
  left: var(--space-lg);
  z-index: var(--z-rootling);
  font-family: var(--font-serif);
}

.rootling-trigger {
  position: relative;
  z-index: 2;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-gold);
  border-radius: var(--radius-round);
  background: var(--color-parchment);
  color: var(--color-ink);
  cursor: pointer;
  transition:
    background var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    transform var(--transition-fast);
  box-shadow:
    0 2px 8px var(--color-shadow-medium),
    0 0 0 0 rgba(184, 150, 12, 0);
}

.rootling-trigger:hover {
  background: var(--color-parchment-light);
  border-color: var(--color-gold-light);
  transform: scale(1.05);
}

.rootling-trigger:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

.rootling-trigger.pulsing {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow:
      0 2px 8px var(--color-shadow-medium),
      0 0 0 0 rgba(184, 150, 12, 0.4);
  }
  50% {
    box-shadow:
      0 2px 8px var(--color-shadow-medium),
      0 0 16px 6px rgba(184, 150, 12, 0.15);
  }
}

.rootling-icon {
  transition: transform var(--transition-base);
}

.expanded .rootling-icon {
  transform: rotate(180deg);
}

.rootling-menu {
  position: absolute;
  bottom: 64px;
  left: 0;
  min-width: 240px;
  padding: var(--space-md) var(--space-lg);
  background: var(--color-parchment);
  border: 1.5px solid var(--color-gold-muted);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 20px var(--color-shadow-medium);
}

.root-branch {
  position: relative;
  padding: var(--space-xs) 0;
  opacity: 1;
  animation: branch-grow 300ms ease-out backwards;
  animation-delay: var(--branch-delay);
}

@keyframes branch-grow {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

.branch-line {
  position: absolute;
  left: -20px;
  bottom: 0;
  width: 20px;
  height: 30px;
  opacity: 0.4;
  pointer-events: none;
}

.branch-parent {
  display: flex;
  align-items: stretch;
  gap: 0.35rem;
}

.branch-label {
  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  border: none;
  border-radius: var(--radius-sm);
  background: none;
  color: var(--color-ink);
  cursor: pointer;
  text-align: left;
  text-decoration: none;
  transition: color var(--transition-fast), background var(--transition-fast);
}

.branch-label:hover,
.branch-toggle:hover,
.sub-branch-label:hover {
  color: var(--color-gold);
  background: var(--color-panel-hover);
}

.branch-label:focus-visible,
.branch-toggle:focus-visible,
.sub-branch-label:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 1px;
}

.branch-label--active {
  background: rgba(255, 252, 246, 0.96);
  color: var(--color-gold);
  font-weight: 600;
}

.branch-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  flex: 0 0 2.2rem;
  border: none;
  border-radius: var(--radius-sm);
  background: none;
  color: var(--color-ink);
  cursor: pointer;
  transition: color var(--transition-fast), background var(--transition-fast);
}

.branch-caret {
  display: inline-block;
  font-size: 0.75rem;
  transition: transform var(--transition-fast);
}

.branch-caret.open {
  transform: rotate(90deg);
}

.sub-branches {
  display: grid;
  gap: 2px;
  margin-top: var(--space-xs);
  margin-left: calc(var(--space-sm) + 0.35rem);
  padding-left: var(--space-md);
  border-left: 1.5px solid var(--color-border-light);
}

.sub-branch-label {
  display: block;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  color: var(--color-ink-muted);
  text-decoration: none;
  transition: color var(--transition-fast), background var(--transition-fast);
}

.sub-branch-label--active {
  color: var(--color-gold);
  font-weight: 600;
}

.roots-enter-active {
  transition: opacity var(--transition-base), transform var(--transition-base);
}

.roots-leave-active {
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.roots-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.95);
}

.roots-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}

.sub-roots-enter-active,
.sub-roots-leave-active {
  overflow: hidden;
  transition: opacity var(--transition-fast), max-height var(--transition-base);
}

.sub-roots-enter-from,
.sub-roots-leave-to {
  opacity: 0;
  max-height: 0;
}

.sub-roots-enter-to,
.sub-roots-leave-from {
  max-height: 240px;
}

@media (max-width: 600px) {
  .rootling {
    bottom: var(--space-md);
    left: var(--space-md);
  }

  .rootling-trigger {
    width: 48px;
    height: 48px;
  }

  .rootling-menu {
    min-width: 210px;
    padding: var(--space-sm) var(--space-md);
  }
}
</style>
