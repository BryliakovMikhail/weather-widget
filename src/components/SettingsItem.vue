<template>
  <li class="item">
    <BurgerBtn class="item__btn handle" />
    <div class="city">{{ city.name }}, {{ city.sys.country }}</div>
    <DeleteBtn class="delete" @click.prevent="deleteCity(city.id)" />
  </li>
</template>
<script setup>
import { useRootStore } from '@/store/root';
import BurgerBtn from '@/components/UI/BurgerBtn.vue';
import DeleteBtn from '@/components/UI/DeleteBtn.vue';

const props = defineProps({
  city: {
    type: Object,
    require: true,
  },
});

const rootStore = useRootStore();

const deleteCity = (cityId) => {
  rootStore.deleteCity(cityId);
};
</script>
<style></style>
