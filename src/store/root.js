import { defineStore } from 'pinia';
import axios from 'axios';
import { BASE_URL, API_KEY } from '@/constants/api';

export const useRootStore = defineStore('root', {
  state: () => ({
    cities: JSON.parse(localStorage.getItem('cities')) || [],
    message: '',
    isLoading: false,
  }),
  actions: {
    addCityToCities(cityName) {
      this.isLoading = true;
      axios
        .get(`${BASE_URL}?q=${cityName}&units=metric&appid=${API_KEY}`)
        .then((response) => {
          this.isLoading = false;
          const cityData = response.data;

          let item = this.cities.find((city) => {
            return city.id === cityData.id;
          });

          if (item) {
            item = cityData;
          } else {
            this.cities.push(cityData);
          }
          localStorage.setItem('cities', JSON.stringify(this.cities));
          this.message = 'City has added!';
          setTimeout(()=> {
            this.message = ''
          }, 2000)
        })
        .catch((err) => {
          this.isLoading = false
          this.message = 'City not found';
          setTimeout(()=> {
            this.message = ''
          }, 5000)
        });
    },
    getCities() {
      return this.cities;
    },
    getMessage() {
      return this.message;
    },
    changeCities(arr) {
      this.cities = arr;
      localStorage.setItem('cities', JSON.stringify(this.cities));
    },
    deleteCity(cityId) {
      this.cities = this.cities.filter((item) => {
        return item.id !== cityId;
      });
      localStorage.setItem('cities', JSON.stringify(this.cities));
      this.message = 'City has deleted';
          setTimeout(()=> {
            this.message = ''
          }, 1500)
    },
  },
});
