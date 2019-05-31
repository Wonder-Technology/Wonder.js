

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as JudgeABTypeUtils$Wonderjs from "./utils/JudgeABTypeUtils.js";
import * as FindDependencyDataSystem$Wonderjs from "../all/dependency/FindDependencyDataSystem.js";
import * as OperateRABAssetBundleMainService$Wonderjs from "../../service/state/main/assetBundle/OperateRABAssetBundleMainService.js";
import * as OperateSABAssetBundleMainService$Wonderjs from "../../service/state/main/assetBundle/OperateSABAssetBundleMainService.js";
import * as OperateWABAssetBundleMainService$Wonderjs from "../../service/state/main/assetBundle/OperateWABAssetBundleMainService.js";

function getAllNeededABCount(abRelativePath, wabRelativePath, state) {
  return FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByDepthSearch(abRelativePath, OperateWABAssetBundleMainService$Wonderjs.unsafeGetWholeDependencyRelationMap(wabRelativePath, state)).length + 1 | 0;
}

function getLoadedNeededABCount(abRelativePath, wabRelativePath, state) {
  var match = JudgeABTypeUtils$Wonderjs.isSAB(abRelativePath);
  var tmp;
  if (match) {
    var match$1 = OperateSABAssetBundleMainService$Wonderjs.isLoaded(abRelativePath, state);
    tmp = match$1 ? 1 : 0;
  } else {
    var match$2 = JudgeABTypeUtils$Wonderjs.isRAB(abRelativePath);
    if (match$2) {
      var match$3 = OperateRABAssetBundleMainService$Wonderjs.isLoaded(abRelativePath, state);
      tmp = match$3 ? 1 : 0;
    } else {
      tmp = Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getLoadedNeededABCount", "unknown abRelativePath: " + (String(abRelativePath) + ""), "", "", ""));
    }
  }
  return FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByDepthSearch(abRelativePath, OperateWABAssetBundleMainService$Wonderjs.unsafeGetWholeDependencyRelationMap(wabRelativePath, state)).filter((function (rabRelativePath) {
                return OperateRABAssetBundleMainService$Wonderjs.isLoaded(rabRelativePath, state);
              })).length + tmp | 0;
}

var RAB = /* module */[
  /* getAllNeededABCount */getAllNeededABCount,
  /* getLoadedNeededABCount */getLoadedNeededABCount
];

export {
  RAB ,
  
}
/* Log-WonderLog Not a pure module */
