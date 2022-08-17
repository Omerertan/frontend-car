<template>
  <div class=" mx-auto">
    <router-view name="main" />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "./store";

export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch("get_carlist");
    return {};
  },
});
</script>

<style scoped></style>
