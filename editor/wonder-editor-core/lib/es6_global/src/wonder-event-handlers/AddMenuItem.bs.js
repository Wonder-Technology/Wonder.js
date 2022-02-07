

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";

function handler(api, e) {
  var match = api.ui;
  return Curry._1(match.register, e);
}

export {
  handler ,
  
}
/* No side effect */
