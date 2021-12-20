

import * as CreateGameObjectUtils$WonderGameobjectDataoriented from "./CreateGameObjectUtils.bs.js";
import * as GetAllGameObjectUtils$WonderGameobjectDataoriented from "./GetAllGameObjectUtils.bs.js";

function getData(param) {
  return {
          createStateFunc: (function (param) {
              return {
                      maxUID: 0
                    };
            }),
          createGameObjectFunc: CreateGameObjectUtils$WonderGameobjectDataoriented.create,
          getAllGameObjectsFunc: GetAllGameObjectUtils$WonderGameobjectDataoriented.getAll
        };
}

export {
  getData ,
  
}
/* No side effect */
