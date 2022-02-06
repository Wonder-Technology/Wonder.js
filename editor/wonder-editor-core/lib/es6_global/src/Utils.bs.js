

import * as UI$WonderEditorCore from "./UI.bs.js";
import * as EventManager$WonderEditorCore from "./EventManager.bs.js";

function buildAPI(param) {
  return {
          ui: UI$WonderEditorCore.buildAPI(undefined),
          eventManager: EventManager$WonderEditorCore.buildAPI(undefined)
        };
}

export {
  buildAPI ,
  
}
/* No side effect */
