

import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

function _getDisposedIndex(disposedIndexArray) {
  return /* tuple */[
          disposedIndexArray,
          Js_primitive.undefined_to_opt(disposedIndexArray.pop())
        ];
}

function generateIndex(index, disposedIndexArray) {
  var match = _getDisposedIndex(disposedIndexArray);
  var match$1 = match[1];
  var disposedIndexArray$1 = match[0];
  if (match$1 !== undefined) {
    return /* tuple */[
            match$1,
            index,
            disposedIndexArray$1
          ];
  } else {
    return /* tuple */[
            index,
            index + 1 | 0,
            disposedIndexArray$1
          ];
  }
}

export {
  _getDisposedIndex ,
  generateIndex ,
  
}
/* No side effect */
