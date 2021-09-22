import { createApp } from "vue";
import App from "./App.vue";
import flop from "../packages/components/index";

createApp(App)
  .use(flop)
  .mount("#app");
