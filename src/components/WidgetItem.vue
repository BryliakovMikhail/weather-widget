<template>
  <li class="widget-item" v-if="city">
    <h2 class="widget-item__city">{{ city.name }}, {{ city.sys.country }}</h2>
    <div class="temperature-wrap">
      <img
        :src="`http://bryliakovmikhail.com/server_img/weather-widget/weather-main/${city.weather[0].description}.png`"
        alt="weather"
        class="widget-item__img"
      />
      <div class="widget-item__temperature">
        {{ Math.round(city.main.temp) }}°C
      </div>
    </div>
    <div class="widget-item__descr">
      Feels like {{ Math.round(city.main.feels_like) }} °C.
      {{ city.weather[0].main }}.
      {{ city.weather[0].description }}
    </div>
    <div class="info">
      <div class="info__item">
        {{ city.wind?.speed }} m/s
        {{ directionOfWind }}
      </div>
      <div class="info__item">{{ getPressureMm(city.main?.pressure) }} Mm</div>
    </div>
    <div class="more-info">
      <div class="more-info__item">Humidity: {{ city.main?.humidity }}%</div>
      <div class="more-info__item">Dev point: {{ devPoint }} %</div>

      <div class="more-info__item">
        Visibility: {{ getVisibilityKm(city.visibility) }}km
      </div>
    </div>
  </li>
</template>
<script setup>
import { computed } from 'vue';
import getPressureMm from '@/utils/getPressureMm';
import getVisibilityKm from '@/utils/getVisibilityKm';
const props = defineProps({
  city: {
    type: [Object, null],
    require: true,
  },
});

const directionOfWind = computed(() => {
  const deg = props.city.wind?.deg;
  let direction = '';

  if ((deg >= 0 && deg <= 22.5) || (deg >= 337.5 && deg <= 360)) {
    direction = 'N';
  }
  if (deg > 22.5 && deg <= 67.5) {
    direction = 'NW';
  }
  if (deg > 67.5 && deg <= 112.5) {
    direction = 'W';
  }
  if (deg > 112.5 && deg <= 157.5) {
    direction = 'SW';
  }
  if (deg > 157.5 && deg <= 202.5) {
    direction = 'S';
  }
  if (deg > 202.5 && deg <= 247.5) {
    direction = 'SE';
  }
  if (deg > 247.5 && deg <= 292.5) {
    direction = 'E';
  }
  if (deg > 292.5 && deg < 337.5) {
    direction = 'NE';
  }
  return direction;
});

const devPoint = computed(() => {
  const temp = props.city.main?.temp;
  const humidity = props.city.main.humidity;
  const a = 17.27;
  const b = 237.7;

  const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100);
  const dewPointTemperature = Math.round((b * alpha) / (a - alpha));

  return dewPointTemperature;
});
</script>
<style></style>
