
function rootReducer(state, action) {
  switch(action.type) {
  case 'SET_DEVICES':
    return { ...state, devices: action.data }

  case 'SET_ENTORNOS':
    return { ...state, entornos: action.data }

  case 'COLLAPSED':
    return { ...state, collapsed: action.data }

  default:
    return { ...state }
  }
}
export default rootReducer;