

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";

function getLoadedRAB(rabRelativePath, state) {
  return ImmutableHashMapService$WonderCommonlib.get(rabRelativePath, state[/* assetBundleRecord */45][/* assembleRABData */0][/* loadedRABMap */1]);
}

function unsafeGetLoadedRAB(rabRelativePath, state) {
  return OptionService$Wonderjs.unsafeGetWithMessage(Log$WonderLog.buildAssertMessage("rab arrayBuffer in rabRelativePath:" + (String(rabRelativePath) + " loaded"), "not"), getLoadedRAB(rabRelativePath, state));
}

function setLoadedRAB(rabRelativePath, rab, state) {
  var assetBundleRecord = state[/* assetBundleRecord */45];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = assetBundleRecord[/* assembleRABData */0];
  newrecord[/* assetBundleRecord */45] = /* record */[
    /* assembleRABData : record */[
      /* isLoadedMap */init[/* isLoadedMap */0],
      /* loadedRABMap */ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, rab, assetBundleRecord[/* assembleRABData */0][/* loadedRABMap */1]),
      /* isAssembledMap */init[/* isAssembledMap */2],
      /* textureMap */init[/* textureMap */3],
      /* imageMap */init[/* imageMap */4],
      /* basicMaterialMap */init[/* basicMaterialMap */5],
      /* lightMaterialMap */init[/* lightMaterialMap */6],
      /* geometryMap */init[/* geometryMap */7],
      /* scriptEventFunctionDataMap */init[/* scriptEventFunctionDataMap */8],
      /* scriptAttributeMap */init[/* scriptAttributeMap */9]
    ],
    /* assembleSABData */assetBundleRecord[/* assembleSABData */1],
    /* wabData */assetBundleRecord[/* wabData */2]
  ];
  return newrecord;
}

function _markIsLoaded(rabRelativePath, isLoaded, state) {
  var assetBundleRecord = state[/* assetBundleRecord */45];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = assetBundleRecord[/* assembleRABData */0];
  newrecord[/* assetBundleRecord */45] = /* record */[
    /* assembleRABData : record */[
      /* isLoadedMap */ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, isLoaded, assetBundleRecord[/* assembleRABData */0][/* isLoadedMap */0]),
      /* loadedRABMap */init[/* loadedRABMap */1],
      /* isAssembledMap */init[/* isAssembledMap */2],
      /* textureMap */init[/* textureMap */3],
      /* imageMap */init[/* imageMap */4],
      /* basicMaterialMap */init[/* basicMaterialMap */5],
      /* lightMaterialMap */init[/* lightMaterialMap */6],
      /* geometryMap */init[/* geometryMap */7],
      /* scriptEventFunctionDataMap */init[/* scriptEventFunctionDataMap */8],
      /* scriptAttributeMap */init[/* scriptAttributeMap */9]
    ],
    /* assembleSABData */assetBundleRecord[/* assembleSABData */1],
    /* wabData */assetBundleRecord[/* wabData */2]
  ];
  return newrecord;
}

function markLoaded(rabRelativePath, state) {
  return _markIsLoaded(rabRelativePath, true, state);
}

function markNotLoaded(rabRelativePath, state) {
  return _markIsLoaded(rabRelativePath, false, state);
}

function isLoaded(rabRelativePath, state) {
  var match = ImmutableHashMapService$WonderCommonlib.get(rabRelativePath, state[/* assetBundleRecord */45][/* assembleRABData */0][/* isLoadedMap */0]);
  if (match !== undefined) {
    return match;
  } else {
    return false;
  }
}

function _markIsAssembled(rabRelativePath, isAssembled, state) {
  var assetBundleRecord = state[/* assetBundleRecord */45];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = assetBundleRecord[/* assembleRABData */0];
  newrecord[/* assetBundleRecord */45] = /* record */[
    /* assembleRABData : record */[
      /* isLoadedMap */init[/* isLoadedMap */0],
      /* loadedRABMap */init[/* loadedRABMap */1],
      /* isAssembledMap */ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, isAssembled, assetBundleRecord[/* assembleRABData */0][/* isAssembledMap */2]),
      /* textureMap */init[/* textureMap */3],
      /* imageMap */init[/* imageMap */4],
      /* basicMaterialMap */init[/* basicMaterialMap */5],
      /* lightMaterialMap */init[/* lightMaterialMap */6],
      /* geometryMap */init[/* geometryMap */7],
      /* scriptEventFunctionDataMap */init[/* scriptEventFunctionDataMap */8],
      /* scriptAttributeMap */init[/* scriptAttributeMap */9]
    ],
    /* assembleSABData */assetBundleRecord[/* assembleSABData */1],
    /* wabData */assetBundleRecord[/* wabData */2]
  ];
  return newrecord;
}

function markAssembled(rabRelativePath, state) {
  return _markIsAssembled(rabRelativePath, true, state);
}

function markNotAssembled(rabRelativePath, state) {
  return _markIsAssembled(rabRelativePath, false, state);
}

function isAssembled(rabRelativePath, state) {
  var match = ImmutableHashMapService$WonderCommonlib.get(rabRelativePath, state[/* assetBundleRecord */45][/* assembleRABData */0][/* isAssembledMap */2]);
  if (match !== undefined) {
    return match;
  } else {
    return false;
  }
}

function releaseLoadedRAB(rabRelativePath, state) {
  var assetBundleRecord = state[/* assetBundleRecord */45];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = assetBundleRecord[/* assembleRABData */0];
  newrecord[/* assetBundleRecord */45] = /* record */[
    /* assembleRABData : record */[
      /* isLoadedMap */init[/* isLoadedMap */0],
      /* loadedRABMap */ImmutableHashMapService$WonderCommonlib.deleteVal(rabRelativePath, assetBundleRecord[/* assembleRABData */0][/* loadedRABMap */1]),
      /* isAssembledMap */init[/* isAssembledMap */2],
      /* textureMap */init[/* textureMap */3],
      /* imageMap */init[/* imageMap */4],
      /* basicMaterialMap */init[/* basicMaterialMap */5],
      /* lightMaterialMap */init[/* lightMaterialMap */6],
      /* geometryMap */init[/* geometryMap */7],
      /* scriptEventFunctionDataMap */init[/* scriptEventFunctionDataMap */8],
      /* scriptAttributeMap */init[/* scriptAttributeMap */9]
    ],
    /* assembleSABData */assetBundleRecord[/* assembleSABData */1],
    /* wabData */assetBundleRecord[/* wabData */2]
  ];
  return markNotLoaded(rabRelativePath, newrecord);
}

function releaseAssembleRABData(rabRelativePath, state) {
  var assetBundleRecord = state[/* assetBundleRecord */45];
  var assembleRABData = assetBundleRecord[/* assembleRABData */0];
  var newrecord = Caml_array.caml_array_dup(state);
  return markNotAssembled(rabRelativePath, (newrecord[/* assetBundleRecord */45] = /* record */[
                /* assembleRABData : record */[
                  /* isLoadedMap */assembleRABData[/* isLoadedMap */0],
                  /* loadedRABMap */assembleRABData[/* loadedRABMap */1],
                  /* isAssembledMap */assembleRABData[/* isAssembledMap */2],
                  /* textureMap */ImmutableHashMapService$WonderCommonlib.deleteVal(rabRelativePath, assembleRABData[/* textureMap */3]),
                  /* imageMap */ImmutableHashMapService$WonderCommonlib.deleteVal(rabRelativePath, assembleRABData[/* imageMap */4]),
                  /* basicMaterialMap */ImmutableHashMapService$WonderCommonlib.deleteVal(rabRelativePath, assembleRABData[/* basicMaterialMap */5]),
                  /* lightMaterialMap */ImmutableHashMapService$WonderCommonlib.deleteVal(rabRelativePath, assembleRABData[/* lightMaterialMap */6]),
                  /* geometryMap */ImmutableHashMapService$WonderCommonlib.deleteVal(rabRelativePath, assembleRABData[/* geometryMap */7]),
                  /* scriptEventFunctionDataMap */ImmutableHashMapService$WonderCommonlib.deleteVal(rabRelativePath, assembleRABData[/* scriptEventFunctionDataMap */8]),
                  /* scriptAttributeMap */ImmutableHashMapService$WonderCommonlib.deleteVal(rabRelativePath, assembleRABData[/* scriptAttributeMap */9])
                ],
                /* assembleSABData */assetBundleRecord[/* assembleSABData */1],
                /* wabData */assetBundleRecord[/* wabData */2]
              ], newrecord));
}

function setAssembleRABData(rabRelativePath, param, state) {
  var assetBundleRecord = state[/* assetBundleRecord */45];
  var assembleRABData = assetBundleRecord[/* assembleRABData */0];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* assetBundleRecord */45] = /* record */[
    /* assembleRABData : record */[
      /* isLoadedMap */assembleRABData[/* isLoadedMap */0],
      /* loadedRABMap */assembleRABData[/* loadedRABMap */1],
      /* isAssembledMap */assembleRABData[/* isAssembledMap */2],
      /* textureMap */ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, param[1], assembleRABData[/* textureMap */3]),
      /* imageMap */ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, param[0], assembleRABData[/* imageMap */4]),
      /* basicMaterialMap */ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, param[2], assembleRABData[/* basicMaterialMap */5]),
      /* lightMaterialMap */ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, param[3], assembleRABData[/* lightMaterialMap */6]),
      /* geometryMap */ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, param[4], assembleRABData[/* geometryMap */7]),
      /* scriptEventFunctionDataMap */ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, param[5], assembleRABData[/* scriptEventFunctionDataMap */8]),
      /* scriptAttributeMap */ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, param[6], assembleRABData[/* scriptAttributeMap */9])
    ],
    /* assembleSABData */assetBundleRecord[/* assembleSABData */1],
    /* wabData */assetBundleRecord[/* wabData */2]
  ];
  return newrecord;
}

function findDataInAllDependencyRABByName(allDependencyRABRelativePath, name, state, findDataByNameFunc) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (result, dependencyAbRelativePath) {
                var match = Js_option.isSome(result);
                if (match) {
                  return result;
                } else {
                  return Curry._3(findDataByNameFunc, dependencyAbRelativePath, name, state);
                }
              }), undefined, allDependencyRABRelativePath);
}

function unsafeFindDataInAllDependencyRABByName(allDependencyRABRelativePath, name, state, findDataByNameFunc) {
  return OptionService$Wonderjs.unsafeGetWithMessage(Log$WonderLog.buildAssertMessage("data by name:" + (String(name) + " exist in all dependency rabs"), "not"), findDataInAllDependencyRABByName(allDependencyRABRelativePath, name, state, findDataByNameFunc));
}

function _findDataByName(rabRelativePath, name, dataMap) {
  return Js_option.andThen((function (map) {
                return ImmutableHashMapService$WonderCommonlib.get(name, map);
              }), ImmutableHashMapService$WonderCommonlib.get(rabRelativePath, dataMap));
}

function findBasicMaterialByName(rabRelativePath, name, state) {
  return _findDataByName(rabRelativePath, name, state[/* assetBundleRecord */45][/* assembleRABData */0][/* basicMaterialMap */5]);
}

function unsafeFindBasicMaterialByName(rabRelativePath, name, state) {
  return OptionService$Wonderjs.unsafeGetWithMessage(Log$WonderLog.buildAssertMessage("basicMaterial by name:" + (String(name) + (" exist in rabRelativePath:" + (String(rabRelativePath) + ""))), "not"), findBasicMaterialByName(rabRelativePath, name, state));
}

function findLightMaterialByName(rabRelativePath, name, state) {
  return _findDataByName(rabRelativePath, name, state[/* assetBundleRecord */45][/* assembleRABData */0][/* lightMaterialMap */6]);
}

function unsafeFindLightMaterialByName(rabRelativePath, name, state) {
  return OptionService$Wonderjs.unsafeGetWithMessage(Log$WonderLog.buildAssertMessage("lightMaterial by name:" + (String(name) + (" exist in rabRelativePath:" + (String(rabRelativePath) + ""))), "not"), findLightMaterialByName(rabRelativePath, name, state));
}

function findImageByName(rabRelativePath, name, state) {
  return _findDataByName(rabRelativePath, name, state[/* assetBundleRecord */45][/* assembleRABData */0][/* imageMap */4]);
}

function unsafeFindImageByName(rabRelativePath, name, state) {
  return OptionService$Wonderjs.unsafeGetWithMessage(Log$WonderLog.buildAssertMessage("image by name:" + (String(name) + (" exist in rabRelativePath:" + (String(rabRelativePath) + ""))), "not"), findImageByName(rabRelativePath, name, state));
}

function findTextureByName(rabRelativePath, name, state) {
  return _findDataByName(rabRelativePath, name, state[/* assetBundleRecord */45][/* assembleRABData */0][/* textureMap */3]);
}

function unsafeFindTextureByName(rabRelativePath, name, state) {
  return OptionService$Wonderjs.unsafeGetWithMessage(Log$WonderLog.buildAssertMessage("texture by name:" + (String(name) + (" exist in rabRelativePath:" + (String(rabRelativePath) + ""))), "not"), findTextureByName(rabRelativePath, name, state));
}

function findGeometryByName(rabRelativePath, name, state) {
  return _findDataByName(rabRelativePath, name, state[/* assetBundleRecord */45][/* assembleRABData */0][/* geometryMap */7]);
}

function unsafeFindGeometryByName(rabRelativePath, name, state) {
  return OptionService$Wonderjs.unsafeGetWithMessage(Log$WonderLog.buildAssertMessage("geometry by name:" + (String(name) + (" exist in rabRelativePath:" + (String(rabRelativePath) + ""))), "not"), findGeometryByName(rabRelativePath, name, state));
}

function findScriptEventFunctionDataByName(rabRelativePath, name, state) {
  return _findDataByName(rabRelativePath, name, state[/* assetBundleRecord */45][/* assembleRABData */0][/* scriptEventFunctionDataMap */8]);
}

function unsafeFindScriptEventFunctionDataByName(rabRelativePath, name, state) {
  return OptionService$Wonderjs.unsafeGetWithMessage(Log$WonderLog.buildAssertMessage("scriptEventFunction data by name:" + (String(name) + (" exist in rabRelativePath:" + (String(rabRelativePath) + ""))), "not"), findScriptEventFunctionDataByName(rabRelativePath, name, state));
}

function findScriptAttributeByName(rabRelativePath, name, state) {
  return _findDataByName(rabRelativePath, name, state[/* assetBundleRecord */45][/* assembleRABData */0][/* scriptAttributeMap */9]);
}

function unsafeFindScriptAttributeByName(rabRelativePath, name, state) {
  return OptionService$Wonderjs.unsafeGetWithMessage(Log$WonderLog.buildAssertMessage("scriptAttribute by name:" + (String(name) + (" exist in rabRelativePath:" + (String(rabRelativePath) + ""))), "not"), findScriptAttributeByName(rabRelativePath, name, state));
}

export {
  getLoadedRAB ,
  unsafeGetLoadedRAB ,
  setLoadedRAB ,
  _markIsLoaded ,
  markLoaded ,
  markNotLoaded ,
  isLoaded ,
  _markIsAssembled ,
  markAssembled ,
  markNotAssembled ,
  isAssembled ,
  releaseLoadedRAB ,
  releaseAssembleRABData ,
  setAssembleRABData ,
  findDataInAllDependencyRABByName ,
  unsafeFindDataInAllDependencyRABByName ,
  _findDataByName ,
  findBasicMaterialByName ,
  unsafeFindBasicMaterialByName ,
  findLightMaterialByName ,
  unsafeFindLightMaterialByName ,
  findImageByName ,
  unsafeFindImageByName ,
  findTextureByName ,
  unsafeFindTextureByName ,
  findGeometryByName ,
  unsafeFindGeometryByName ,
  findScriptEventFunctionDataByName ,
  unsafeFindScriptEventFunctionDataByName ,
  findScriptAttributeByName ,
  unsafeFindScriptAttributeByName ,
  
}
/* Log-WonderLog Not a pure module */
