<template>
  <div class="widget" v-if="cities">
    <button
      class="widget__btn btn-reset"
      type="button"
      @click.prevent="isOpen = true"
      :disabled="isOpen"
    >
      <img
        src="http://bryliakovmikhail.com/server_img/weather-widget/settings.svg"
        alt="settings"
      />
    </button>
    <ul class="widget__list list-reset" v-if="!isOpen">
      <WidgetItem v-for="city in cities" :city="city" :key="city.id" />
    </ul>
    <Settings :open="isOpen" @isClose="isOpen = false"></Settings>
    <div id="teleport-target"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRootStore } from '@/store/root';
import WidgetItem from '@/components/WidgetItem.vue';
import Settings from '@/components/Settings.vue';

const rootStore = useRootStore();

const cities = computed(() => {
  return rootStore.getCities();
});

const isOpen = ref(false);
</script>

<style></style>
