<script setup lang="ts"></script>

<template>
  <div>
    <MusicPlayer />
    <UContainer class="sm:border-x border-default pt-10">
      <AppHeader :links="navLinks" />
      <slot />
      <AppFooter />
    </UContainer>
  </div>
</template>
