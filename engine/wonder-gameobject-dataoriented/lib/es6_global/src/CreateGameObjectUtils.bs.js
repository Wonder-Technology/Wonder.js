


function create(state) {
  var uid = state.maxUID;
  state.maxUID = uid + 1 | 0;
  return [
          state,
          uid
        ];
}

export {
  create ,
  
}
/* No side effect */
