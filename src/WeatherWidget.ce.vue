<template>
  <div class="widget-box">
    <EmptyWidget
      v-if="(cities.length === 0 && !isLoading) || isLoadingFailed"
    />
    <WidgetBase v-if="cities" v-show="!isLoading" />
    <Louder v-if="isLoading" />
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, watch, onMounted, onBeforeMount } from 'vue';
import { useRootStore } from '@/store/root';
import WidgetBase from '@/components/WidgetBase.vue';
import Louder from '@/components/UI/Louder.vue';
import EmptyWidget from '@/components/EmptyWidget.vue';
import { API_KEY, BASE_URL } from '@/constants';

const isLoading = ref(false);
const isLoadingFailed = ref(false);

const rootStore = useRootStore();

const cities = ref(rootStore.getCities());

watch(
  () => rootStore.getCities(),
  (newValue) => {
    cities.value = newValue;
  }
);

const lat = ref(null);
const lon = ref(null);

const addCityLocation = () => {
  if (!cities.value.length) {
    isLoading.value = true;
    navigator.geolocation.getCurrentPosition((position) => {
      lat.value = position.coords.latitude;
      lon.value = position.coords.longitude;
      axios
        .get(`${BASE_URL}?lat=${lat.value}&lon=${lon.value}&appid=${API_KEY}`)
        .then((response) => {
          isLoading.value = false;
          rootStore.addCityToCities(response.data.name);
        })
        .catch(() => {
          isLoading.value = false;
          isLoadingFailed.value = true;
        });
    });
  }
};
onMounted(addCityLocation);

</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
</style>
