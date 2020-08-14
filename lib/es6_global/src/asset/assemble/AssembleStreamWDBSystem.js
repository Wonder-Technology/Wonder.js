

import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as BatchCreateSystem$Wonderjs from "./BatchCreateSystem.js";
import * as SetIMGUIFuncSystem$Wonderjs from "./SetIMGUIFuncSystem.js";
import * as BatchOperateStreamSystem$Wonderjs from "./BatchOperateStreamSystem.js";
import * as BuildRootGameObjectSystem$Wonderjs from "./BuildRootGameObjectSystem.js";

function assemble(wd, default11Image, state) {
  var match = !OptionService$Wonderjs.isJsonSerializedValueNone(wd[/* scene */1][/* imgui */2]);
  var state$1 = match ? SetIMGUIFuncSystem$Wonderjs.setIMGUIFunc(wd, state) : state;
  var match$1 = BatchOperateStreamSystem$Wonderjs.batchOperate(wd, default11Image, BatchCreateSystem$Wonderjs.batchCreate(true, wd, state$1));
  var match$2 = match$1[3];
  var match$3 = match$1[2];
  var match$4 = BuildRootGameObjectSystem$Wonderjs.build(wd, /* tuple */[
        match$1[0],
        match$1[1]
      ]);
  return /* tuple */[
          match$4[0],
          match$4[1],
          /* tuple */[
            match$3[0],
            match$3[1],
            match$3[2]
          ],
          /* tuple */[
            match$2[0],
            match$2[1],
            match$2[2]
          ]
        ];
}

export {
  assemble ,
  
}
/* OptionService-Wonderjs Not a pure module */
