

import * as IndexComponentService$Wonderjs from "../../../primitive/component/IndexComponentService.js";

function create(record) {
  var match = IndexComponentService$Wonderjs.generateIndex(record[/* index */0], record[/* disposedIndexArray */4]);
  return /* tuple */[
          /* record */[
            /* index */match[1],
            /* basicMaterialRenderGameObjectMap */record[/* basicMaterialRenderGameObjectMap */1],
            /* lightMaterialRenderGameObjectMap */record[/* lightMaterialRenderGameObjectMap */2],
            /* gameObjectMap */record[/* gameObjectMap */3],
            /* disposedIndexArray */match[2]
          ],
          match[0]
        ];
}

export {
  create ,
  
}
/* No side effect */
