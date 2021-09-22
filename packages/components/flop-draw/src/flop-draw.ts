import type { ExtractPropTypes } from 'vue'

export const flopDrawProps = {
  list: {
    type: Array,
    default: function() {
      return []
    },
  },
} 

export type flopDrawProps = ExtractPropTypes<typeof flopDrawProps>