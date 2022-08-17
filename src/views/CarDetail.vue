<template>
  <div class="mx-auto">
    <h3 class="text-lg font-semibold py-6">{{ car.title }}</h3>

    <div class="grid md:grid-cols-2 gap-8 sm:grid-cols-1">
      <div class="!sm:w-3/4 !w-full">
        <viewer :images="car.photos">
          <swiper
            :navigation="true"
            :modules="modules"
            class="mySwiper"
            effect="fade"
          >
            <swiper-slide
              v-for="(photo, index) in car.photos"
              :key="index"
              class="!w-full"
            >
              <img
                :src="photo"
                class="cursor-zoom-in w-full max-h-[512px] object-cover"
              />
            </swiper-slide>
          </swiper>
        </viewer>
      </div>
      <div class="w-full px-2">
        <div class="md:w-1/2">
          <div class="text-red-500 font-bold pb-4 text-lg">
            <p>{{ `${!!car.price ? car.price.toLocaleString() : ""} TL` }}</p>
          </div>
          <div class="font-bold text-sm pb-4">
            <p>
              {{ car.location.cityName ? car.location.cityName : "" }}
              {{ car.location.townName ? `/ ${car.location.townName}` : "" }}
            </p>
          </div>
          <div class="flex space-x-2 text-sm py-1 border-y border-slate-200">
            <div class="font-bold flex-none w-32">İlan No:</div>
            <div class="w-11/12">{{ car.id }}</div>
          </div>
          <div class="flex space-x-2 text-sm py-1 border-b border-slate-200">
            <div class="font-bold flex-none w-32">İlan Tarihi:</div>
            <div class="w-11/12">{{ car.dateFormatted }}</div>
          </div>
          <div
            v-if="!!brand"
            class="flex space-x-2 text-sm py-1 border-b border-slate-200"
          >
            <div class="font-bold flex-none w-32">Marka:</div>
            <div class="w-11/12 capitalize">{{ brand }}</div>
          </div>
          <div class="flex space-x-2 text-sm py-1 border-b border-slate-200">
            <div class="font-bold flex-none w-32">Seri:</div>
            <div class="w-11/12">{{ series }}</div>
          </div>
          <div class="flex space-x-2 text-sm py-1 border-b border-slate-200">
            <div class="font-bold flex-none w-32">Model:</div>
            <div class="w-11/12">{{ model }}</div>
          </div>
          <div class="flex space-x-2 text-sm py-1 border-b border-slate-200">
            <div class="font-bold flex-none w-32">Yıl:</div>
            <div class="w-11/12 capitalize">{{ car.properties[2].value }}</div>
          </div>
          <div class="flex space-x-2 text-sm py-1 border-b border-slate-200">
            <div class="font-bold flex-none w-32">Kilometre:</div>
            <div class="w-11/12 capitalize">
              {{ car.properties[0].value.toLocaleString() }}
            </div>
          </div>
          <div class="flex space-x-2 text-sm py-1 border-b border-slate-200">
            <div class="font-bold flex-none w-32">Vites Tipi:</div>
            <div class="w-11/12 capitalize">
              {{ car.properties[3].value }}
            </div>
          </div>
          <div class="flex space-x-2 text-sm py-1 border-b border-slate-200">
            <div class="font-bold flex-none w-32">Yakıt Tipi:</div>
            <div class="w-11/12 capitalize">
              {{ car.properties[4].value }}
            </div>
          </div>
        </div>
        <div
          class="rounded-md mt-4 bg-blue-50 shadow-md md:w-1/2 w-full px-4 py-4 text-slate-700"
        >
          <h4 class="font-semibold text-center">İlan Sahibi</h4>
          <hr />
          <div class="py-2">
            <span class="font-medium">Adı Soyadı: </span>
            <span>{{ car.userInfo.nameSurname }}</span>
          </div>
          <div class="py-2">
            <span class="font-medium">Telefon Numarası: </span>
            <span> {{ car.userInfo.phone }}</span>
          </div>
          <div></div>
        </div>
      </div>
    </div>

    <div class="py-8 my-4">
      <div class="bg-slate-100 pb-4">
        <!-- {{ car }} -->
        <h4 class="text-base font-bold px-8 py-4 text-red-500">AÇIKLAMA</h4>
        <hr />
        <div class="mt-4 px-8" v-html="car.text"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "../store";
import { useRoute } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    store.dispatch("get_carByID", route.params.id);

    const car = computed(() => {
      return store.state.car;
    });

    const brand = computed(() => {
      let category = car.value.category.name;

      if (category && category.includes("otomobil/")) {
        return category.split("otomobil/")[1].split("-")[0];
      } else if (category && category.includes("arazi-suv-pick-up/")) {
        return category.split("arazi-suv-pick-up/")[1].split("-")[0];
      } else if (category && category.includes("minivan-van_panelvan/")) {
        return category.split("minivan-van_panelvan/")[1].split("-")[0];
      }
    });

    const series = computed(() => {
      return car.value.modelName.split(" ")[0];
    });

    const model = computed(() => {
      let str = car.value.modelName.split(" ");
      return [str[1], str[2], str[3]].join(" ");
    });

    return {
      car,
      brand,
      series,
      model,
      modules: [Navigation],
    };
  },
});
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  height: 100%;
  object-fit: contain;
}
</style>
