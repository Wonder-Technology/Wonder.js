

import * as AddComponentService$Wonderjs from "../../../primitive/component/AddComponentService.js";

function handleAddComponent(script, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* isScriptEventFunctionEnable */record[/* isScriptEventFunctionEnable */1],
          /* disposedIndexArray */record[/* disposedIndexArray */2],
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(script, gameObjectUid, record[/* gameObjectMap */3]),
          /* isActiveMap */record[/* isActiveMap */4],
          /* scriptEventFunctionDataMap */record[/* scriptEventFunctionDataMap */5],
          /* scriptAttributeMap */record[/* scriptAttributeMap */6]
        ];
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
