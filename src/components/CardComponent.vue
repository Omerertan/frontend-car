<template>
  <div>
    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 pt-4">
      <div
        class="p-2 border border-slate-300 bg-slate-100 rounded-lg hover:shadow-md cursor-pointer"
        v-for="car in carList"
        :key="car.id"
        @click="detailCar(car.id)"
      >
        <div class="flex justify-center min-h-[180px] max-h-[180px]">
          <img :src="car.photo" class="max-h-48 w-96 object-contain rounded-md bg-white" />
        </div>
        <div class="pt-4 px-2">
          <div class="flex justify-between">
            <div class="font-bold">{{ car.location.cityName }}</div>
            <div v-if="car.properties[0].value">
              {{ Number(car.properties[0].value).toLocaleString() + " km" }}
            </div>
          </div>
          <div class="flex justify-start">
            <div v-if="car.modelName">
              {{ car.modelName }}
            </div>
          </div>
          <div class="flex justify-end text-lg font-bold text-red-500 pt-4">
            <div>{{ car.price.toLocaleString() + " TL" }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const carList = computed(() => {
      return store.state.carList;
    });

    const detailCar = (id) => {
      router.push({ name: "carDetail", params: { id: id } });
    };

    return {
      carList,
      detailCar,
    };
  },
});
</script>
