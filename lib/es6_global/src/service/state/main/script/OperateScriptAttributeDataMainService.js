

import * as Js_option from "./../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as ImmutableHashMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";

function createScriptAttribute(param) {
  return ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
}

function _getTypeFromJsObj (jsObj){
    return jsObj.type;
    };

function _createScriptAttributeField(attributeFieldJsObj) {
  var type_ = _getTypeFromJsObj(attributeFieldJsObj);
  var tmp;
  switch (type_) {
    case "float" : 
        tmp = /* Float */1;
        break;
    case "int" : 
        tmp = /* Int */0;
        break;
    default:
      tmp = Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_createScriptAttributeField", "unknown type: " + (String(type_) + ""), "", "", ""));
  }
  return /* record */[
          /* type_ */tmp,
          /* defaultValue */attributeFieldJsObj.defaultValue,
          /* value */attributeFieldJsObj.defaultValue
        ];
}

function addScriptAttributeFieldJsObj(fieldName, attributeFieldJsObj, attribute) {
  return ImmutableHashMapService$WonderCommonlib.set(fieldName, _createScriptAttributeField(attributeFieldJsObj), attribute);
}

var removeScriptAttributeField = ImmutableHashMapService$WonderCommonlib.deleteVal;

var getScriptAttributeEntries = ImmutableHashMapService$WonderCommonlib.getValidEntries;

var getScriptAttributeField = ImmutableHashMapService$WonderCommonlib.get;

function getScriptAttributeFieldValue(fieldName, attribute) {
  return Js_option.map((function (param) {
                return param[/* value */2];
              }), ImmutableHashMapService$WonderCommonlib.get(fieldName, attribute));
}

function unsafeGetScriptAttributeFieldValue(fieldName, attribute) {
  return OptionService$Wonderjs.unsafeGet(getScriptAttributeFieldValue(fieldName, attribute));
}

function setScriptAttributeFieldValue(fieldName, value, attribute) {
  var match = ImmutableHashMapService$WonderCommonlib.get(fieldName, attribute);
  if (match !== undefined) {
    var field = match;
    return ImmutableHashMapService$WonderCommonlib.set(fieldName, /* record */[
                /* type_ */field[/* type_ */0],
                /* defaultValue */field[/* defaultValue */1],
                /* value */value
              ], attribute);
  } else {
    return attribute;
  }
}

function getScriptAttributeFieldDefaultValue(fieldName, attribute) {
  return Js_option.map((function (param) {
                return param[/* defaultValue */1];
              }), ImmutableHashMapService$WonderCommonlib.get(fieldName, attribute));
}

function unsafeGetScriptAttributeFieldDefaultValue(fieldName, attribute) {
  return OptionService$Wonderjs.unsafeGet(getScriptAttributeFieldDefaultValue(fieldName, attribute));
}

function setScriptAttributeFieldDefaultValueAndValue(fieldName, value, attribute) {
  var match = ImmutableHashMapService$WonderCommonlib.get(fieldName, attribute);
  if (match !== undefined) {
    return ImmutableHashMapService$WonderCommonlib.set(fieldName, /* record */[
                /* type_ */match[/* type_ */0],
                /* defaultValue */value,
                /* value */value
              ], attribute);
  } else {
    return attribute;
  }
}

export {
  createScriptAttribute ,
  _getTypeFromJsObj ,
  _createScriptAttributeField ,
  addScriptAttributeFieldJsObj ,
  removeScriptAttributeField ,
  getScriptAttributeEntries ,
  getScriptAttributeField ,
  getScriptAttributeFieldValue ,
  unsafeGetScriptAttributeFieldValue ,
  setScriptAttributeFieldValue ,
  getScriptAttributeFieldDefaultValue ,
  unsafeGetScriptAttributeFieldDefaultValue ,
  setScriptAttributeFieldDefaultValueAndValue ,
  
}
/* Log-WonderLog Not a pure module */
