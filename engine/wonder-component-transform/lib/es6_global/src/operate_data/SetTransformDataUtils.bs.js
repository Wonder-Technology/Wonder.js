

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as OptionSt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypeTransform from "../../../../../../node_modules/wonder-component-type-transform/lib/es6_global/index.bs.js";
import * as UpdateTransformUtils$WonderComponentTransform from "./UpdateTransformUtils.bs.js";
import * as HierachyTransformUtils$WonderComponentTransform from "./HierachyTransformUtils.bs.js";
import * as ModelMatrixTransformUtils$WonderComponentTransform from "./ModelMatrixTransformUtils.bs.js";

function setData(state, transform, dataName, dataValue) {
  if (dataName !== Index$WonderComponentTypeTransform.dataName.parent) {
    if (dataName === Index$WonderComponentTypeTransform.dataName.localPosition) {
      return ModelMatrixTransformUtils$WonderComponentTransform.setLocalPosition(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.localRotation) {
      return ModelMatrixTransformUtils$WonderComponentTransform.setLocalRotation(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.localScale) {
      return ModelMatrixTransformUtils$WonderComponentTransform.setLocalScale(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.localEulerAngles) {
      return ModelMatrixTransformUtils$WonderComponentTransform.setLocalEulerAngles(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.position) {
      return UpdateTransformUtils$WonderComponentTransform.updateAndSetPosition(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.rotation) {
      return UpdateTransformUtils$WonderComponentTransform.updateAndSetRotation(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.scale) {
      return UpdateTransformUtils$WonderComponentTransform.updateAndSetScale(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.eulerAngles) {
      return UpdateTransformUtils$WonderComponentTransform.updateAndSetEulerAngles(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.update) {
      return UpdateTransformUtils$WonderComponentTransform.mutableUpdate(state, transform);
    } else {
      return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName, "", "", ""));
    }
  }
  var parent = OptionSt$WonderCommonlib.fromNullable(dataValue);
  if (parent !== undefined) {
    return HierachyTransformUtils$WonderComponentTransform.setParent(state, parent, transform);
  } else {
    return HierachyTransformUtils$WonderComponentTransform.removeParent(state, transform);
  }
}

export {
  setData ,
  
}
/* No side effect */
