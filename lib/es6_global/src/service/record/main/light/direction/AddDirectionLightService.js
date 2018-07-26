

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(light, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */record[/* intensities */3],
          /* mappedIndexMap */record[/* mappedIndexMap */4],
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(light, gameObjectUid, record[/* gameObjectMap */5])
        ];
}

export {
  handleAddComponent ,
  
}
/* No side effect */
