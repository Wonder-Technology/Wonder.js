

import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as BuildMaterialUtils$Wonderjs from "./utils/BuildMaterialUtils.js";
import * as OperateBasicMaterialMainService$Wonderjs from "../../../service/state/main/material/basic/OperateBasicMaterialMainService.js";

function build(param, materialDataArr, state) {
  var color = OperateBasicMaterialMainService$Wonderjs.getColor(param[0], state);
  return ArrayService$Wonderjs.push(/* record */[
              /* colorFactor */BuildMaterialUtils$Wonderjs.buildColorFactor(color),
              /* name */param[1]
            ], materialDataArr);
}

export {
  build ,
  
}
/* ArrayService-Wonderjs Not a pure module */
