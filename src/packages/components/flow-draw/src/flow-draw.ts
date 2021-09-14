import { buildProp } from '@/utils/props'
import type { ExtractPropTypes } from 'vue'

export const flowDrawProps = {
  value: buildProp<string | number>({
    type: [String, Number],
    default: '',
  }),
  list: {
    type: Array,
    default: function() {
      return []
    },
  },
} as const
export type FlowDrawProps = ExtractPropTypes<typeof flowDrawProps>