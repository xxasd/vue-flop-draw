import type { ExtractPropTypes } from 'vue'

const flowDrawProps = {
  list: {
    type: Array,
    default: function() {
      return []
    },
  },
} 

export type FlowDrawProps = Partial<ExtractPropTypes<typeof flowDrawProps>>