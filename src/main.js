import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";

const app = createApp(App);
app.use(router.paths);
app.use(store);
app.use(VueViewer);
app.mount("#app");
