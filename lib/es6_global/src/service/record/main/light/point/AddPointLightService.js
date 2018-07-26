

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(light, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */record[/* intensities */3],
          /* constants */record[/* constants */4],
          /* linears */record[/* linears */5],
          /* quadratics */record[/* quadratics */6],
          /* ranges */record[/* ranges */7],
          /* mappedIndexMap */record[/* mappedIndexMap */8],
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(light, gameObjectUid, record[/* gameObjectMap */9])
        ];
}

export {
  handleAddComponent ,
  
}
/* No side effect */
