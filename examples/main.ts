import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import flow from "../packages/components/index";

createApp(App)
  .use(flow)
  .mount("#app");
