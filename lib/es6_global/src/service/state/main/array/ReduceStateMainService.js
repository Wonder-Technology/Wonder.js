


function reduceState(func, state, arr) {
  var mutableState = state;
  for(var i = 0 ,i_finish = arr.length - 1 | 0; i <= i_finish; ++i){
    mutableState = func(mutableState, arr[i]);
  }
  return mutableState;
}

export {
  reduceState ,
  
}
/* No side effect */
