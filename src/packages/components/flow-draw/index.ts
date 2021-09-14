import FlowDraw from "./src/FlowDraw.vue";
import { withInstall } from "@/utils/with-Install";

export const VueFlowDraw = withInstall(FlowDraw);
export default VueFlowDraw;

export * from "./src/flow-draw";
