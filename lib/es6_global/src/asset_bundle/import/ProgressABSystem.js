

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as JudgeABTypeUtils$Wonderjs from "./utils/JudgeABTypeUtils.js";
import * as FindDependencyDataSystem$Wonderjs from "../all/dependency/FindDependencyDataSystem.js";
import * as OperateRABAssetBundleMainService$Wonderjs from "../../service/state/main/assetBundle/OperateRABAssetBundleMainService.js";
import * as OperateSABAssetBundleMainService$Wonderjs from "../../service/state/main/assetBundle/OperateSABAssetBundleMainService.js";
import * as OperateWABAssetBundleMainService$Wonderjs from "../../service/state/main/assetBundle/OperateWABAssetBundleMainService.js";

function getAllNeededABCount(abRelativePath, wabRelativePath, state) {
  return FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByDepthSearch(abRelativePath, OperateWABAssetBundleMainService$Wonderjs.unsafeGetWholeDependencyRelationMap(wabRelativePath, state)).length + 1 | 0;
}

function _getLoadedDependencyRABCount(abRelativePath, wabRelativePath, state) {
  return FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByDepthSearch(abRelativePath, OperateWABAssetBundleMainService$Wonderjs.unsafeGetWholeDependencyRelationMap(wabRelativePath, state)).filter((function (rabRelativePath) {
                return OperateRABAssetBundleMainService$Wonderjs.isLoaded(rabRelativePath, state);
              })).length;
}

function _getLoadedABSelfCount(abRelativePath, state) {
  var match = JudgeABTypeUtils$Wonderjs.isSAB(abRelativePath);
  if (match) {
    var match$1 = OperateSABAssetBundleMainService$Wonderjs.isLoaded(abRelativePath, state);
    if (match$1) {
      return 1;
    } else {
      return 0;
    }
  } else {
    var match$2 = JudgeABTypeUtils$Wonderjs.isRAB(abRelativePath);
    if (match$2) {
      var match$3 = OperateRABAssetBundleMainService$Wonderjs.isLoaded(abRelativePath, state);
      if (match$3) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getLoadedNeededABCount", "unknown abRelativePath: " + (String(abRelativePath) + ""), "", "", ""));
    }
  }
}

function getLoadedNeededABCount(abRelativePath, wabRelativePath, state) {
  return _getLoadedDependencyRABCount(abRelativePath, wabRelativePath, state) + _getLoadedABSelfCount(abRelativePath, state) | 0;
}

var RAB = /* module */[
  /* getAllNeededABCount */getAllNeededABCount,
  /* _getLoadedDependencyRABCount */_getLoadedDependencyRABCount,
  /* _getLoadedABSelfCount */_getLoadedABSelfCount,
  /* getLoadedNeededABCount */getLoadedNeededABCount
];

export {
  RAB ,
  
}
/* Log-WonderLog Not a pure module */
