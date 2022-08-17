<template>
  <div>
    <div class="rounded-md px-2 py-4 flex justify-end">
      <div class="flex space-x-2 items-center">
        <div class="text-sm font-bold text-slate-500">Görünüm:</div>
        <div
          class="hover:bg-slate-100 rounded-sm cursor-pointer flex justify-center items-center"
          :class="{ 'bg-slate-200': selectView === 1 }"
          @click="changeView(1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-slate-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <!-- <div
          class="hover:bg-slate-100 rounded-sm cursor-pointer flex justify-center items-center"
          :class="{ 'bg-slate-200': selectView === 2 }"
          @click="changeView(2)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-slate-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div> -->
        <div
          class="hover:bg-slate-100 rounded-sm cursor-pointer flex justify-center items-center"
          :class="{ 'bg-slate-200': selectView === 3 }"
          @click="changeView(3)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-slate-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke-width="1"
          >
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </div>
      </div>
    </div>
    <hr />
    <TableComponent v-if="selectView === 1" />
    <BigCardComponent v-if="selectView === 2" />
    <CardComponent v-if="selectView === 3" />
    <Pagination />
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "../store";
import TableComponent from "../components/TableComponent.vue";
import BigCardComponent from "../components/BigCardComponent.vue";
import CardComponent from "../components/CardComponent.vue";
import Pagination from "../components/Pagination.vue";

export default defineComponent({
  components: {
    TableComponent,
    BigCardComponent,
    CardComponent,
    Pagination,
  },
  setup() {
    const store = useStore();

    const changeView = (id) => {
      store.commit("changeView", id);
    };

    const selectView = computed(() => {
      return store.state.selectView;
    });

    return {
      changeView,
      selectView,
    };
  },
});
</script>
