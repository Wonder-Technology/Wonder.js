

import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";

function _getDisposedIndex(disposedIndexArray) {
  return /* tuple */[
          disposedIndexArray,
          Caml_option.undefined_to_opt(disposedIndexArray.pop())
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
