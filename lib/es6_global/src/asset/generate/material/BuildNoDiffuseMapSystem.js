

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as OperateLightMaterialMainService$Wonderjs from "../../../service/state/main/material/light/OperateLightMaterialMainService.js";

function build(param, param$1, param$2, state) {
  var match = param$1[1];
  var match$1 = param$1[0];
  var diffuseColor = OperateLightMaterialMainService$Wonderjs.getDiffuseColor(param[0], state);
  return /* tuple */[
          /* tuple */[
            ArrayService$Wonderjs.push(/* record */[
                  /* baseColorFactor *//* array */[
                    Caml_array.caml_array_get(diffuseColor, 0),
                    Caml_array.caml_array_get(diffuseColor, 1),
                    Caml_array.caml_array_get(diffuseColor, 2),
                    1.0
                  ],
                  /* baseColorTexture */undefined,
                  /* name */param[1]
                ], match$1[0]),
            match$1[1],
            match$1[2],
            match$1[3]
          ],
          /* tuple */[
            match[0],
            match[1],
            match[2]
          ],
          /* tuple */[
            param$2[0],
            param$2[1],
            param$2[2]
          ]
        ];
}

export {
  build ,
  
}
/* ArrayService-Wonderjs Not a pure module */
