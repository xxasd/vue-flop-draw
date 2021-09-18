import type { ExtractPropTypes } from 'vue'

export const flowDrawProps = {
  list: {
    type: Array,
    default: function() {
      return []
    },
  },
} 

export type FlowDrawProps = ExtractPropTypes<typeof flowDrawProps>