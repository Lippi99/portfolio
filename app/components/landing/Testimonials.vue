<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <UPageSection
    :ui="{
      container: 'px-0 !pt-0',
    }"
  >
    <UCarousel
      v-slot="{ item }"
      :items="page.testimonials"
      :autoplay="{ delay: 10000 }"
      loop
      dots
      :ui="{
        viewport:
          '-mx-4 sm:-mx-12 lg:-mx-16 bg-elevated/50 max-w-(--ui-container)',
      }"
    >
      <UPageCTA
        :description="item.quote"
        variant="naked"
        class="rounded-none"
        :ui="{
          container: 'sm:py-12 lg:py-12 sm:gap-8',
          description:
            '!text-base text-balance before:content-[open-quote] before:text-5xl lg:before:text-7xl before:inline-block before:text-dimmed before:absolute before:-ml-6 lg:before:-ml-10 before:-mt-2 lg:before:-mt-4 after:content-[close-quote] after:text-5xl lg:after:text-7xl after:inline-block after:text-dimmed after:absolute after:mt-1 lg:after:mt-0 after:ml-1 lg:after:ml-2',
        }"
      >
        <div class="flex items-center justify-center gap-2.5">
          <img
            class="size-10 rounded-full object-cover"
            :src="item.author.avatar?.src"
            :alt="item.author.avatar?.alt"
          />
          <div>
            <h1 class="font-bold">{{ item.author.name }}</h1>
            <span class="text-sm">{{ item.author.description }}</span>
          </div>
        </div>
      </UPageCTA>
    </UCarousel>
  </UPageSection>
</template>
