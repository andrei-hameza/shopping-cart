import { createTransform } from 'redux-persist-immutable'

/**
 * Removes keys from the state before saving it to storage
 *
 * @param {String[]} keys - Keys that should be removed from state before saving
 * @return {Object} - Returns object with transformation functions
 */

const saveSubsetFilter = keys => createTransform(
  // transform state coming from redux on its way to being serialized and stored
  (inboundState, key) => {
    return inboundState.filter((value, key) => keys.indexOf(key) >= 0)
  },
  // transform state coming from storage, on its way to be rehydrated into redux
  (outboundState, key) => {
    return outboundState
  }
)

export default saveSubsetFilter
