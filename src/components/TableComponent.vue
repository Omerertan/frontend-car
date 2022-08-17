<template>
  <div>
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="md:overflow-hidden overflow-auto">
            <table class="min-w-full md:w-full w-[1200px]">
              <thead class="bg-slate-200 border-b">
                <tr>
                  <th
                    scope="col"
                    class="text-xs font-medium text-gray-900 px-2 py-1 text-left w-2/12"
                  ></th>
                  <th
                    scope="col"
                    class="text-xs font-medium text-gray-900 px-2 py-1 text-left w-2/12"
                  >
                    Model
                  </th>
                  <th
                    scope="col"
                    class="text-xs font-medium text-gray-900 px-2 py-1 text-left w-3/12"
                  >
                    İlan Başlığı
                  </th>
                  <th
                    scope="col"
                    class="text-xs font-medium text-gray-900 px-2 py-1 text-left w-1/12"
                  >
                    <div
                      class="flex justify-start items-center space-x-1 cursor-pointer hover:text-slate-500"
                      @click="sortDirectionWithSort(2)"
                    >
                      <span>Yıl</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 fill-slate-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                          />
                        </svg>
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="text-xs font-medium text-gray-900 px-6 py-4 text-left w-1/12"
                  >
                    <div
                      class="flex justify-start items-center space-x-1 cursor-pointer hover:text-slate-500"
                      @click="sortDirectionWithSort(0)"
                    >
                      <span>Fiyat</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 fill-slate-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                          />
                        </svg>
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="text-xs font-medium text-gray-900 px-6 py-4 w-1/12"
                  >
                    <div
                      class="flex justify-center items-center space-x-1 cursor-pointer hover:text-slate-500"
                      @click="sortDirectionWithSort(1)"
                    >
                      <span>Tarih</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 fill-slate-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                          />
                        </svg>
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="text-xs font-medium text-gray-900 px-6 py-4 text-left w-1/12"
                  >
                    İl / İlçe
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="odd:bg-white even:bg-slate-50 border-b hover:bg-red-100 hover:cursor-pointer"
                  v-for="car in carList"
                  :key="car.id"
                  @click="detailCar(car.id)"
                >
                  <td class="flex justify-center py-1 text-xs font-medium text-gray-900 ">
                    <img
                      :src="car.photo"
                      class="max-h-32 w-44 rounded-md object-contain  bg-white border"
                    />
                  </td>
                  <td class="text-xs text-gray-900 font-light px-2 py-1">
                    {{ car.modelName }}
                  </td>
                  <td class="text-xs text-gray-900 font-light px-2 py-1">
                    {{ car.title }}
                  </td>
                  <td class="text-xs text-gray-900 font-light px-2 py-1">
                    {{ getYear(car.properties) }}
                  </td>
                  <td class="text-xs text-red-500 font-bold px-2 py-1">
                    {{ car.price.toLocaleString() }} TL
                  </td>
                  <td
                    class="text-xs text-gray-900 font-light px-2 py-1 text-center"
                  >
                    <p>{{ car.dateFormatted.split(" ")[0] }}</p>
                    <p>{{ car.dateFormatted.split(" ")[1] }}</p>
                    <p>{{ car.dateFormatted.split(" ")[2] }}</p>
                  </td>
                  <td
                    class="text-xs text-gray-900 font-light px-2 py-1 text-center"
                  >
                    <p>{{ car.location.cityName }}</p>
                    <p>{{ car.location.townName }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
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
const router = useRouter();

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const carList = computed(() => {
      return store.state.carList;
    });
    const getColor = (carProp) => {
      let color = "";
      carProp.forEach((element) => {
        if (element.name === "color") {
          color = !!element.value ? element.value : "-";
        }
      });
      return color;
    };

    const getKM = (carProp) => {
      let km = "";
      carProp.forEach((element) => {
        if (element.name === "km") {
          km = !!element.value ? element.value.toLocaleString() : "-";
        }
      });
      return km;
    };
    const getYear = (carProp) => {
      let year = "";
      carProp.forEach((element) => {
        if (element.name === "year") {
          year = !!element.value ? element.value : "-";
        }
      });
      return year;
    };

    const detailCar = (id) => {
      router.push({ name: "carDetail", params: { id: id } });
    };

    const sortDirectionWithSort = (id) => {
      store.commit("setSortDirection");
      store.commit("setSort", id);
      store.dispatch("get_carlist");
    };

    return {
      carList,
      getColor,
      getKM,
      getYear,
      detailCar,
      sortDirectionWithSort,
    };
  },
});
</script>
