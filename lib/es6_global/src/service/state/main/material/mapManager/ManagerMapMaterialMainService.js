

import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MapUnitService$Wonderjs from "../../../../primitive/material/MapUnitService.js";
import * as BufferMaterialService$Wonderjs from "../../../../record/main/material/BufferMaterialService.js";
import * as EmptyMapUnitArrayMapService$Wonderjs from "../../../../record/main/material/EmptyMapUnitArrayMapService.js";

function getMap(material, textureCountPerMaterial, param, param$1) {
  var mapUnit = param[0](material, param$1[1]);
  var match = MapUnitService$Wonderjs.hasMap(mapUnit);
  if (match) {
    return Caml_option.some(param[1](/* tuple */[
                    material,
                    mapUnit,
                    textureCountPerMaterial
                  ], param$1[0]));
  }
  
}

function _changeMap(param, mapUnit, setTextureIndexFunc, param$1) {
  return /* tuple */[
          setTextureIndexFunc(/* tuple */[
                param[0],
                mapUnit,
                param$1[0]
              ], param[1], param$1[1]),
          param$1[2],
          param$1[3]
        ];
}

function setMap(material, texture, param, param$1) {
  var emptyMapUnitArrayMap = param$1[3];
  var mapUnits = param$1[2];
  var textureIndices = param$1[1];
  var textureCountPerMaterial = param$1[0];
  var setTextureIndexFunc = param[2];
  var mapUnit = param[0](material, mapUnits);
  var match = MapUnitService$Wonderjs.hasMap(mapUnit);
  if (match) {
    return _changeMap(/* tuple */[
                material,
                texture
              ], mapUnit, setTextureIndexFunc, /* tuple */[
                textureCountPerMaterial,
                textureIndices,
                mapUnits,
                emptyMapUnitArrayMap
              ]);
  } else {
    var match$1 = EmptyMapUnitArrayMapService$Wonderjs.unsafeGetEmptyMapUnitAndPop(material, emptyMapUnitArrayMap);
    var mapUnit$1 = match$1[0];
    return /* tuple */[
            setTextureIndexFunc(/* tuple */[
                  material,
                  mapUnit$1,
                  textureCountPerMaterial
                ], texture, textureIndices),
            param[1](material, mapUnit$1, mapUnits),
            match$1[1]
          ];
  }
}

function removeMap(material, param, param$1) {
  var emptyMapUnitArrayMap = param$1[3];
  var mapUnits = param$1[2];
  var textureIndices = param$1[1];
  var defaultTexture = BufferMaterialService$Wonderjs.getDefaultTextureIndex(/* () */0);
  var mapUnit = param[0](material, mapUnits);
  var match = MapUnitService$Wonderjs.hasMap(mapUnit);
  if (match) {
    return /* tuple */[
            param[2](/* tuple */[
                  material,
                  defaultTexture,
                  param$1[0]
                ], defaultTexture, textureIndices),
            param[1](material, MapUnitService$Wonderjs.getDefaultUnit(/* () */0), mapUnits),
            EmptyMapUnitArrayMapService$Wonderjs.addEmptyMapUnit(material, mapUnit, emptyMapUnitArrayMap)
          ];
  } else {
    return /* tuple */[
            textureIndices,
            mapUnits,
            emptyMapUnitArrayMap
          ];
  }
}

export {
  getMap ,
  _changeMap ,
  setMap ,
  removeMap ,
  
}
/* EmptyMapUnitArrayMapService-Wonderjs Not a pure module */
