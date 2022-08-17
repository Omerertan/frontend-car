<template>
  <div class="w-full py-4">
    <div>
      <nav aria-label="Page navigation" class="flex justify-center">
        <ul class="inline-flex space-x-2">
          <li>
            <button
              class="flex items-center justify-center w-10 h-10 text-red-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-red-100"
              @click="changeCurrentPage(currentPage - 1)"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          <li>
            <button
              class="w-10 h-10 transition-colors duration-150 rounded-full focus:shadow-outline"
              :class="{
                'bg-red-500 border  border-red-500 text-white':
                  currentPage === 1,
                'text-red-500 hover:bg-red-100': currentPage !== 1,
              }"
              @click="changeCurrentPage(1)"
            >
              1
            </button>
          </li>
          <li>
            <button
              class="w-10 h-10 transition-colors duration-150 rounded-full focus:shadow-outline"
              :class="{
                'bg-red-500 border  border-red-500 text-white':
                  currentPage === 2,
                'text-red-500 hover:bg-red-100': currentPage !== 2,
              }"
              @click="changeCurrentPage(2)"
            >
              2
            </button>
          </li>
          <li>
            <button
              class="w-10 h-10 transition-colors duration-150 rounded-full focus:shadow-outline"
              :class="{
                'bg-red-500 border  border-red-500 text-white':
                  currentPage === 3,
                'text-red-500 hover:bg-red-100': currentPage !== 3,
              }"
              @click="changeCurrentPage(3)"
            >
              3
            </button>
          </li>
          <li>
            <button
              class="w-10 h-10 transition-colors duration-150 rounded-full focus:shadow-outline"
              :class="{
                'bg-red-500 border  border-red-500 text-white':
                  currentPage === 4,
                'text-red-500 hover:bg-red-100': currentPage !== 4,
              }"
              @click="changeCurrentPage(4)"
            >
              4
            </button>
          </li>
          <li>
            <button
              class="w-10 h-10 transition-colors duration-150 border border-r-0 rounded-full focus:shadow-outline"
              :class="{
                'bg-red-500 border  border-red-500 text-white':
                  currentPage === 5,
                'text-red-500 hover:bg-red-100': currentPage !== 5,
              }"
              @click="changeCurrentPage(5)"
            >
              5
            </button>
          </li>
          <li>
            <button
              class="flex items-center justify-center w-10 h-10 text-red-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-red-100"
              @click="changeCurrentPage(currentPage + 1)"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div
      class="w-full flex justify-center items-center space-x-2 text-sm font-medium pt-4"
    >
      <div>Her sayfada</div>
      <div class="space-x-2">
        <button
          class="w-8 h-8 transition-colors duration-150 rounded-full focus:shadow-outline font-medium"
          :class="{
            'bg-red-500 text-white': pageSize === 20,
            'bg-red-100  text-black': pageSize !== 20,
          }"
          @click="changePageSize(20)"
        >
          20
        </button>
        <button
          class="w-8 h-8 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-red-200 font-medium"
          :class="{
            'bg-red-500 text-white': pageSize === 50,
            'bg-red-100  text-black': pageSize !== 50,
          }"
          @click="changePageSize(50)"
        >
          50
        </button>
      </div>
      <div>sonuç göster</div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, watch } from "vue";
import { useStore } from "../store";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();

    const pageSize = computed(() => {
      return store.state.take;
    });

    const changePageSize = (size) => {
      store.commit("changePageSize", size);
      store.dispatch("get_carlist");
    };

    const currentPage = computed(() => {
      return store.state.currentPage;
    });

    const changeCurrentPage = (currentPage) => {
      store.commit("changeCurrentPage", currentPage);
      store.dispatch("get_carlist");
    };

    return {
      changePageSize,
      pageSize,
      currentPage,
      changeCurrentPage,
    };
  },
});
</script>
