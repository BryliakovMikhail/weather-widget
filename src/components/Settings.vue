<template>
  <div v-if="open" class="settings">
    <Louder v-if="isLoading" class="louder" />
    <div class="settings__info">{{ infoMessage }}</div>
    <button @click.prevent="$emit('isClose')" class="close btn-reset">
      <span class="close__line"></span>
      <span class="close__line"></span>
    </button>
    <div class="settings-title">Settings</div>
    <form class="settings-form" @submit.prevent="addCity">
      <div class="settings-title">Add Location:</div>
      <div class="settings-form__item">
        <input
          id="input"
          type="text"
          class="settings-form__input"
          v-model="city"
        />
        <button class="add-btn btn-reset" type="submit">
          <span class="add-btn__line"></span>
          <span class="add-btn__line"></span>
        </button>
      </div>
    </form>
    <draggable
      :class="{ opacity: isLoading === true }"
      class="settings-list list-reset"
      v-model="cities"
      item-key="id"
      v-if="cities"
      tag="ul"
      animation="300"
      handle=".handle"
      @start="drag = true"
      @end="changeCitiesArray"
    >
      <template #item="{ element: city }">
        <SettingsItem :key="city.id" :city="city" />
      </template>
    </draggable>
  </div>
</template>
<script setup>
import { ref, watch, defineEmits } from 'vue';
import draggable from 'vuedraggable';
import { useRootStore } from '@/store/root';
import SettingsItem from '@/components/SettingsItem.vue';
import Louder from '@/components/UI/Louder.vue';

const rootStore = useRootStore();

const emit = defineEmits(['isClose']);

const city = ref(null);
const infoMessage = ref(rootStore.message);
const drag = ref(false);
const isLoading = ref(rootStore.isLoading);

const props = defineProps({
  open: {
    type: Boolean,
    require: true,
  },
});

const cities = ref(rootStore.getCities());

watch(
  () => rootStore.getCities(),
  (newValue) => {
    cities.value = newValue;
  }
);
watch(
  () => rootStore.message,
  (newValue) => {
    infoMessage.value = newValue;
  }
);
watch(
  () => rootStore.isLoading,
  (newValue) => {
    isLoading.value = newValue;
  }
);

const addCity = () => {
  rootStore.addCityToCities(city.value);
  city.value = null;
};

const changeCitiesArray = () => {
  drag.value = false;
  rootStore.changeCities(cities.value);
};
</script>
<style></style>
