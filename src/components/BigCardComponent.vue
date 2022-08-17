<template>
  <div>
    <h4>BigCardComponent</h4> 
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "../store";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();

    store.dispatch("get_carByID", route.params.id);

    const car = computed(() => {
      return store.state.car;
    });

    return {
      car,
    };
  },
});
</script>
