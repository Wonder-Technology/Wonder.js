

import * as PMatrixService$Wonderjs from "../../../primitive/PMatrixService.js";
import * as DirtyArrayService$Wonderjs from "../../../primitive/DirtyArrayService.js";
import * as IndexComponentService$Wonderjs from "../../../primitive/component/IndexComponentService.js";

function create(record) {
  var match = IndexComponentService$Wonderjs.generateIndex(record[/* index */0], record[/* disposedIndexArray */8]);
  var index = match[0];
  return /* tuple */[
          /* record */[
            /* index */match[1],
            /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(index, record[/* dirtyArray */1]),
            /* pMatrixMap */PMatrixService$Wonderjs.setDefaultPMatrix(index, record[/* pMatrixMap */2]),
            /* nearMap */record[/* nearMap */3],
            /* farMap */record[/* farMap */4],
            /* fovyMap */record[/* fovyMap */5],
            /* aspectMap */record[/* aspectMap */6],
            /* gameObjectMap */record[/* gameObjectMap */7],
            /* disposedIndexArray */match[2]
          ],
          index
        ];
}

export {
  create ,
  
}
/* PMatrixService-Wonderjs Not a pure module */
