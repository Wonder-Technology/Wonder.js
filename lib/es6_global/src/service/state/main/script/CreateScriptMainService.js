

import * as IndexComponentService$Wonderjs from "../../../primitive/component/IndexComponentService.js";
import * as RecordScriptMainService$Wonderjs from "./RecordScriptMainService.js";

function create(state) {
  var scriptRecord = RecordScriptMainService$Wonderjs.getRecord(state);
  var match = IndexComponentService$Wonderjs.generateIndex(scriptRecord[/* index */0], scriptRecord[/* disposedIndexArray */2]);
  state[/* scriptRecord */25] = /* record */[
    /* index */match[1],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */match[2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */scriptRecord[/* scriptEventFunctionDataMap */5],
    /* scriptAttributeMap */scriptRecord[/* scriptAttributeMap */6]
  ];
  return /* tuple */[
          state,
          match[0]
        ];
}

export {
  create ,
  
}
/* No side effect */
