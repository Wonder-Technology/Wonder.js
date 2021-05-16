

import * as IndexComponentService$Wonderjs from "../../../primitive/component/IndexComponentService.js";

function create(record) {
  var match = IndexComponentService$Wonderjs.generateIndex(record[/* index */0], record[/* disposedIndexArray */3]);
  return /* tuple */[
          /* record */[
            /* index */match[1],
            /* isActiveMap */record[/* isActiveMap */1],
            /* gameObjectMap */record[/* gameObjectMap */2],
            /* disposedIndexArray */match[2]
          ],
          match[0]
        ];
}

export {
  create ,
  
}
/* No side effect */
