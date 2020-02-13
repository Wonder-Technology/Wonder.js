

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ScriptTool$Wonderjs from "../../../../tool/service/script/ScriptTool.js";
import * as ConvertTool$Wonderjs from "../../asset/tool/ConvertTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as OptionService$Wonderjs from "../../../../../src/service/atom/OptionService.js";
import * as PrepareABTool$Wonderjs from "./PrepareABTool.js";
import * as ConvertGLBTool$Wonderjs from "../../asset/tool/ConvertGLBTool.js";
import * as DataViewCommon$Wonderjs from "../../../../../src/asset/generate/DataViewCommon.js";
import * as GenerateABUtils$Wonderjs from "../../../../../src/asset_bundle/utils/GenerateABUtils.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as ABBufferViewUtils$Wonderjs from "../../../../../src/asset_bundle/all/utils/ABBufferViewUtils.js";
import * as BasicMaterialTool$Wonderjs from "../../../../tool/service/material/BasicMaterialTool.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../src/api/texture/CubemapTextureAPI.js";
import * as CubemapTextureTool$Wonderjs from "../../../../tool/service/texture/CubemapTextureTool.js";
import * as CopyTypeArrayService$Wonderjs from "../../../../../src/service/primitive/copy/CopyTypeArrayService.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as GenerateSingleRABSystem$Wonderjs from "../../../../../src/asset_bundle/single/rab/generate/GenerateSingleRABSystem.js";
import * as NameCubemapTextureMainService$Wonderjs from "../../../../../src/service/state/main/texture/cubemap/NameCubemapTextureMainService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as OperateCubemapTextureMainService$Wonderjs from "../../../../../src/service/state/main/texture/cubemap/OperateCubemapTextureMainService.js";
import * as NameBasicSourceTextureMainService$Wonderjs from "../../../../../src/service/state/main/texture/source/basic_source/NameBasicSourceTextureMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../../../../src/service/state/main/texture/source/basic_source/OperateBasicSourceTextureMainService.js";

var prepare = PrepareABTool$Wonderjs.prepare;

function getDefaultShininess(param) {
  return 32.0;
}

function getResourceAssetBundleContent(rab) {
  var dataView = DataViewCommon$Wonderjs.create(rab);
  var match = GenerateABUtils$Wonderjs.readHeader(dataView);
  var jsonByteLength = match[1];
  var jsonStr = GenerateABUtils$Wonderjs.getJsonStr(jsonByteLength, rab);
  GenerateABUtils$Wonderjs.getBuffer(jsonByteLength, rab);
  return JSON.parse(jsonStr);
}

function buildImageData(name, $staropt$star, $staropt$star$1, param) {
  var mimeType = $staropt$star !== undefined ? $staropt$star : "image/png";
  var bufferView = $staropt$star$1 !== undefined ? $staropt$star$1 : 0;
  return /* record */[
          /* name */name,
          /* bufferView */bufferView,
          /* mimeType */mimeType
        ];
}

function buildBasicSourceTextureData(name, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, param) {
  var source = $staropt$star !== undefined ? $staropt$star : 0;
  var magFilter = $staropt$star$1 !== undefined ? $staropt$star$1 : BasicSourceTextureTool$Wonderjs.getDefaultMagFilter(/* () */0);
  var minFilter = $staropt$star$2 !== undefined ? $staropt$star$2 : BasicSourceTextureTool$Wonderjs.getDefaultMinFilter(/* () */0);
  var wrapS = $staropt$star$3 !== undefined ? $staropt$star$3 : BasicSourceTextureTool$Wonderjs.getDefaultWrapS(/* () */0);
  var wrapT = $staropt$star$4 !== undefined ? $staropt$star$4 : BasicSourceTextureTool$Wonderjs.getDefaultWrapT(/* () */0);
  var format = $staropt$star$5 !== undefined ? $staropt$star$5 : BasicSourceTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var type_ = $staropt$star$6 !== undefined ? $staropt$star$6 : BasicSourceTextureTool$Wonderjs.getDefaultType(/* () */0);
  var flipY = $staropt$star$7 !== undefined ? $staropt$star$7 : BasicSourceTextureTool$Wonderjs.getDefaultFlipYBool(/* () */0);
  return /* record */[
          /* name */name,
          /* source */source,
          /* magFilter */magFilter,
          /* minFilter */minFilter,
          /* wrapS */wrapS,
          /* wrapT */wrapT,
          /* format */format,
          /* type_ */type_,
          /* flipY */flipY
        ];
}

function buildCubemapTextureData(name, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, $staropt$star$12, $staropt$star$13, $staropt$star$14, $staropt$star$15, $staropt$star$16, $staropt$star$17, $staropt$star$18, $staropt$star$19, $staropt$star$20, $staropt$star$21, $staropt$star$22, param) {
  var magFilter = $staropt$star !== undefined ? $staropt$star : CubemapTextureTool$Wonderjs.getDefaultMagFilter(/* () */0);
  var minFilter = $staropt$star$1 !== undefined ? $staropt$star$1 : CubemapTextureTool$Wonderjs.getDefaultMinFilter(/* () */0);
  var wrapS = $staropt$star$2 !== undefined ? $staropt$star$2 : CubemapTextureTool$Wonderjs.getDefaultWrapS(/* () */0);
  var wrapT = $staropt$star$3 !== undefined ? $staropt$star$3 : CubemapTextureTool$Wonderjs.getDefaultWrapT(/* () */0);
  var pxFormat = $staropt$star$4 !== undefined ? $staropt$star$4 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var nxFormat = $staropt$star$5 !== undefined ? $staropt$star$5 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var pyFormat = $staropt$star$6 !== undefined ? $staropt$star$6 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var nyFormat = $staropt$star$7 !== undefined ? $staropt$star$7 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var pzFormat = $staropt$star$8 !== undefined ? $staropt$star$8 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var nzFormat = $staropt$star$9 !== undefined ? $staropt$star$9 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var pxType = $staropt$star$10 !== undefined ? $staropt$star$10 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var nxType = $staropt$star$11 !== undefined ? $staropt$star$11 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var pyType = $staropt$star$12 !== undefined ? $staropt$star$12 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var nyType = $staropt$star$13 !== undefined ? $staropt$star$13 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var pzType = $staropt$star$14 !== undefined ? $staropt$star$14 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var nzType = $staropt$star$15 !== undefined ? $staropt$star$15 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var pxSource = $staropt$star$16 !== undefined ? Caml_option.valFromOption($staropt$star$16) : 0;
  var nxSource = $staropt$star$17 !== undefined ? Caml_option.valFromOption($staropt$star$17) : 1;
  var pySource = $staropt$star$18 !== undefined ? Caml_option.valFromOption($staropt$star$18) : 2;
  var nySource = $staropt$star$19 !== undefined ? Caml_option.valFromOption($staropt$star$19) : 3;
  var pzSource = $staropt$star$20 !== undefined ? Caml_option.valFromOption($staropt$star$20) : 4;
  var nzSource = $staropt$star$21 !== undefined ? Caml_option.valFromOption($staropt$star$21) : 5;
  var flipY = $staropt$star$22 !== undefined ? $staropt$star$22 : CubemapTextureTool$Wonderjs.getDefaultFlipYBool(/* () */0);
  return /* record */[
          /* name */name,
          /* magFilter */magFilter,
          /* minFilter */minFilter,
          /* wrapS */wrapS,
          /* wrapT */wrapT,
          /* flipY */flipY,
          /* pxSource */pxSource,
          /* nxSource */nxSource,
          /* pySource */pySource,
          /* nySource */nySource,
          /* pzSource */pzSource,
          /* nzSource */nzSource,
          /* pxFormat */pxFormat,
          /* nxFormat */nxFormat,
          /* pyFormat */pyFormat,
          /* nyFormat */nyFormat,
          /* pzFormat */pzFormat,
          /* nzFormat */nzFormat,
          /* pxType */pxType,
          /* nxType */nxType,
          /* pyType */pyType,
          /* nyType */nyType,
          /* pzType */pzType,
          /* nzType */nzType
        ];
}

function buildLightMaterialData(name, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var diffuseMap = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var diffuseColor = $staropt$star$1 !== undefined ? $staropt$star$1 : ConvertGLBTool$Wonderjs.getDefaultDiffuseColor(/* () */0);
  var shininess = $staropt$star$2 !== undefined ? $staropt$star$2 : 32.0;
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(diffuseMap);
  return /* record */[
          /* name */name,
          /* diffuseColor */diffuseColor,
          /* diffuseMap */match ? ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0) : OptionService$Wonderjs.unsafeGetJsonSerializedValue(diffuseMap),
          /* shininess */shininess
        ];
}

function buildGeometryData(name, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var indexDataType = $staropt$star !== undefined ? $staropt$star : /* Index16 */0;
  var vertexBufferView = $staropt$star$1 !== undefined ? $staropt$star$1 : 0;
  var normalBufferView = $staropt$star$2 !== undefined ? $staropt$star$2 : ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0);
  var texCoordBufferView = $staropt$star$3 !== undefined ? $staropt$star$3 : ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0);
  var indexBufferView = $staropt$star$4 !== undefined ? $staropt$star$4 : 1;
  return /* record */[
          /* name */name,
          /* indexDataType */indexDataType,
          /* vertexBufferView */vertexBufferView,
          /* normalBufferView */normalBufferView,
          /* texCoordBufferView */texCoordBufferView,
          /* indexBufferView */indexBufferView
        ];
}

var ResourceAssetBundleContent = /* module */[
  /* getResourceAssetBundleContent */getResourceAssetBundleContent,
  /* buildImageData */buildImageData,
  /* buildBasicSourceTextureData */buildBasicSourceTextureData,
  /* buildCubemapTextureData */buildCubemapTextureData,
  /* buildLightMaterialData */buildLightMaterialData,
  /* buildGeometryData */buildGeometryData
];

function buildTextureResourceData(textureComponent, imageDataIndex) {
  return /* record */[
          /* textureComponent */textureComponent,
          /* imageDataIndex */imageDataIndex
        ];
}

function buildImageData$1($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uint8Array = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : new Uint8Array(/* array */[
          1,
          2,
          3
        ]);
  var name = $staropt$star$1 !== undefined ? $staropt$star$1 : "image1";
  var mimeType = $staropt$star$2 !== undefined ? $staropt$star$2 : "image/png";
  return /* record */[
          /* uint8Array */uint8Array,
          /* name */name,
          /* mimeType */mimeType
        ];
}

function createBasicSourceTextureResourceData(state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "basicSourceTexture1";
  var magFilter = $staropt$star$1 !== undefined ? $staropt$star$1 : BasicSourceTextureTool$Wonderjs.getDefaultMagFilter(/* () */0);
  var minFilter = $staropt$star$2 !== undefined ? $staropt$star$2 : BasicSourceTextureTool$Wonderjs.getDefaultMinFilter(/* () */0);
  var wrapS = $staropt$star$3 !== undefined ? $staropt$star$3 : BasicSourceTextureTool$Wonderjs.getDefaultWrapS(/* () */0);
  var wrapT = $staropt$star$4 !== undefined ? $staropt$star$4 : BasicSourceTextureTool$Wonderjs.getDefaultWrapT(/* () */0);
  var format = $staropt$star$5 !== undefined ? $staropt$star$5 : BasicSourceTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var type_ = $staropt$star$6 !== undefined ? $staropt$star$6 : BasicSourceTextureTool$Wonderjs.getDefaultType(/* () */0);
  var flipY = $staropt$star$7 !== undefined ? $staropt$star$7 : BasicSourceTextureTool$Wonderjs.getDefaultFlipYBool(/* () */0);
  var imageDataIndex = $staropt$star$8 !== undefined ? $staropt$star$8 : 0;
  var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
  var texture = match[1];
  var state$1 = NameBasicSourceTextureMainService$Wonderjs.setName(texture, name, OperateBasicSourceTextureMainService$Wonderjs.setFlipY(texture, flipY, OperateBasicSourceTextureMainService$Wonderjs.setType(texture, type_, OperateBasicSourceTextureMainService$Wonderjs.setFormat(texture, format, OperateBasicSourceTextureMainService$Wonderjs.setMinFilter(texture, minFilter, OperateBasicSourceTextureMainService$Wonderjs.setMagFilter(texture, magFilter, OperateBasicSourceTextureMainService$Wonderjs.setWrapT(texture, wrapT, OperateBasicSourceTextureMainService$Wonderjs.setWrapS(texture, wrapS, match[0]))))))));
  return /* tuple */[
          state$1,
          /* record */[
            /* textureComponent */texture,
            /* imageDataIndex */imageDataIndex
          ]
        ];
}

function createCubemapTextureResourceData(state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, $staropt$star$12, $staropt$star$13, $staropt$star$14, $staropt$star$15, $staropt$star$16, $staropt$star$17, $staropt$star$18, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "cubemapTexture1";
  var magFilter = $staropt$star$1 !== undefined ? $staropt$star$1 : CubemapTextureTool$Wonderjs.getDefaultMagFilter(/* () */0);
  var minFilter = $staropt$star$2 !== undefined ? $staropt$star$2 : CubemapTextureTool$Wonderjs.getDefaultMinFilter(/* () */0);
  var wrapS = $staropt$star$3 !== undefined ? $staropt$star$3 : CubemapTextureTool$Wonderjs.getDefaultWrapS(/* () */0);
  var wrapT = $staropt$star$4 !== undefined ? $staropt$star$4 : CubemapTextureTool$Wonderjs.getDefaultWrapT(/* () */0);
  var pxFormat = $staropt$star$5 !== undefined ? $staropt$star$5 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var nxFormat = $staropt$star$6 !== undefined ? $staropt$star$6 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var pyFormat = $staropt$star$7 !== undefined ? $staropt$star$7 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var nyFormat = $staropt$star$8 !== undefined ? $staropt$star$8 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var pzFormat = $staropt$star$9 !== undefined ? $staropt$star$9 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var nzFormat = $staropt$star$10 !== undefined ? $staropt$star$10 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var pxType = $staropt$star$11 !== undefined ? $staropt$star$11 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var nxType = $staropt$star$12 !== undefined ? $staropt$star$12 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var pyType = $staropt$star$13 !== undefined ? $staropt$star$13 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var nyType = $staropt$star$14 !== undefined ? $staropt$star$14 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var pzType = $staropt$star$15 !== undefined ? $staropt$star$15 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var nzType = $staropt$star$16 !== undefined ? $staropt$star$16 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var flipY = $staropt$star$17 !== undefined ? $staropt$star$17 : CubemapTextureTool$Wonderjs.getDefaultFlipYBool(/* () */0);
  var imageDataIndex = $staropt$star$18 !== undefined ? $staropt$star$18 : 0;
  var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state);
  var texture = match[1];
  var state$1 = NameCubemapTextureMainService$Wonderjs.setName(texture, name, OperateCubemapTextureMainService$Wonderjs.setFlipY(texture, flipY, OperateCubemapTextureMainService$Wonderjs.setNZType(texture, nzType, OperateCubemapTextureMainService$Wonderjs.setPZType(texture, pzType, OperateCubemapTextureMainService$Wonderjs.setNYType(texture, nyType, OperateCubemapTextureMainService$Wonderjs.setPYType(texture, pyType, OperateCubemapTextureMainService$Wonderjs.setNXType(texture, nxType, OperateCubemapTextureMainService$Wonderjs.setPXType(texture, pxType, OperateCubemapTextureMainService$Wonderjs.setNZFormat(texture, nzFormat, OperateCubemapTextureMainService$Wonderjs.setPZFormat(texture, pzFormat, OperateCubemapTextureMainService$Wonderjs.setNYFormat(texture, nyFormat, OperateCubemapTextureMainService$Wonderjs.setPYFormat(texture, pyFormat, OperateCubemapTextureMainService$Wonderjs.setNXFormat(texture, nxFormat, OperateCubemapTextureMainService$Wonderjs.setPXFormat(texture, pxFormat, OperateCubemapTextureMainService$Wonderjs.setMinFilter(texture, minFilter, OperateCubemapTextureMainService$Wonderjs.setMagFilter(texture, magFilter, OperateCubemapTextureMainService$Wonderjs.setWrapT(texture, wrapT, OperateCubemapTextureMainService$Wonderjs.setWrapS(texture, wrapS, match[0]))))))))))))))))));
  return /* tuple */[
          state$1,
          /* record */[
            /* textureComponent */texture,
            /* imageDataIndex */imageDataIndex
          ]
        ];
}

function createBasicMaterialResourceData(state, $staropt$star, $staropt$star$1, param) {
  var color = $staropt$star !== undefined ? $staropt$star : BasicMaterialTool$Wonderjs.getDefaultColor(state);
  var name = $staropt$star$1 !== undefined ? $staropt$star$1 : "basicMaterial1";
  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
  var material = match[1];
  var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, BasicMaterialAPI$Wonderjs.setBasicMaterialName(material, name, match[0]));
  return /* tuple */[
          state$1,
          material
        ];
}

function createLightMaterialResourceData(state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var diffuseMap = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var diffuseColor = $staropt$star$1 !== undefined ? $staropt$star$1 : ConvertGLBTool$Wonderjs.getDefaultDiffuseColor(/* () */0);
  var shininess = $staropt$star$2 !== undefined ? $staropt$star$2 : 32.0;
  var name = $staropt$star$3 !== undefined ? $staropt$star$3 : "lightMaterial1";
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var state$1 = match[0];
  var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialShininess(material, shininess, LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, diffuseColor, LightMaterialAPI$Wonderjs.setLightMaterialName(material, name, diffuseMap !== undefined ? LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, diffuseMap, state$1) : state$1)));
  return /* tuple */[
          state$2,
          material
        ];
}

function createGeometryResourceData(state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "geometry1";
  var vertices = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : new Float32Array(/* array */[
          10,
          5,
          3
        ]);
  var normals = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  var texCoords = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : undefined;
  var indices16 = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : Caml_option.some(new Uint16Array(/* array */[0]));
  var indices32 = $staropt$star$5 !== undefined ? Caml_option.valFromOption($staropt$star$5) : undefined;
  var match = GeometryAPI$Wonderjs.createGeometry(state);
  var geometry = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GeometryAPI$Wonderjs.setGeometryName(geometry, name, match$1[0]));
  var normals$1 = Js_option.getWithDefault(new Float32Array(/* array */[]), normals);
  var texCoords$1 = Js_option.getWithDefault(new Float32Array(/* array */[]), texCoords);
  var state$2 = GeometryAPI$Wonderjs.setGeometryNormals(geometry, normals$1, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry, texCoords$1, GeometryAPI$Wonderjs.setGeometryVertices(geometry, vertices, state$1)));
  var state$3 = indices16 !== undefined ? GeometryAPI$Wonderjs.setGeometryIndices16(geometry, Caml_option.valFromOption(indices16), state$2) : state$2;
  var state$4 = indices32 !== undefined ? GeometryAPI$Wonderjs.setGeometryIndices32(geometry, Caml_option.valFromOption(indices32), state$3) : state$3;
  return /* tuple */[
          state$4,
          gameObject,
          geometry,
          name,
          /* tuple */[
            CopyTypeArrayService$Wonderjs.copyFloat32Array(GeometryAPI$Wonderjs.getGeometryVertices(geometry, state$4)),
            CopyTypeArrayService$Wonderjs.copyFloat32Array(GeometryAPI$Wonderjs.getGeometryTexCoords(geometry, state$4)),
            CopyTypeArrayService$Wonderjs.copyFloat32Array(GeometryAPI$Wonderjs.getGeometryNormals(geometry, state$4)),
            CopyTypeArrayService$Wonderjs.copyUint16Array(GeometryAPI$Wonderjs.getGeometryIndices16(geometry, state$4)),
            CopyTypeArrayService$Wonderjs.copyUint32Array(GeometryAPI$Wonderjs.getGeometryIndices32(geometry, state$4))
          ]
        ];
}

function createScriptEventFunctionDataResourceData(state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "scriptEventFunctionData1";
  var initFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildInitEventFunc */6](/* () */0);
  var updateFunc = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildUpdateEventFunc */7](/* () */0);
  var disposeFunc = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildSetLocalPositionEventFunc */4](/* () */0);
  return /* tuple */[
          state,
          /* record */[
            /* name */name,
            /* eventFunctionData */ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptEventFunctionData */0](Caml_option.some(initFunc), Caml_option.some(updateFunc), Caml_option.some(disposeFunc))
          ]
        ];
}

function createScriptAttributeResourceData(state, $staropt$star, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "scriptAttribute1";
  return /* tuple */[
          state,
          /* record */[
            /* name */name,
            /* attribute */ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptAttribute */2](name)
          ]
        ];
}

function buildResourceData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, param) {
  var basicMaterials = $staropt$star !== undefined ? $staropt$star : /* array */[];
  var lightMaterials = $staropt$star$1 !== undefined ? $staropt$star$1 : /* array */[];
  var basicSourceTextures = $staropt$star$2 !== undefined ? $staropt$star$2 : /* array */[];
  var cubemapTextures = $staropt$star$3 !== undefined ? $staropt$star$3 : /* array */[];
  var geometrys = $staropt$star$4 !== undefined ? $staropt$star$4 : /* array */[];
  var scriptEventFunctionDataArr = $staropt$star$5 !== undefined ? $staropt$star$5 : /* array */[];
  var scriptAttributeDataArr = $staropt$star$6 !== undefined ? $staropt$star$6 : /* array */[];
  var basicSourceTextureImageDataMap = $staropt$star$7 !== undefined ? $staropt$star$7 : ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0);
  var cubemapTextureImageDataMap = $staropt$star$8 !== undefined ? $staropt$star$8 : ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0);
  return /* record */[
          /* basicMaterials */basicMaterials,
          /* lightMaterials */lightMaterials,
          /* basicSourceTextures */basicSourceTextures,
          /* cubemapTextures */cubemapTextures,
          /* geometrys */geometrys,
          /* scriptEventFunctionDataArr */scriptEventFunctionDataArr,
          /* scriptAttributeDataArr */scriptAttributeDataArr,
          /* basicSourceTextureImageDataMap */basicSourceTextureImageDataMap,
          /* cubemapTextureImageDataMap */cubemapTextureImageDataMap
        ];
}

var ResourceData = /* module */[
  /* buildTextureResourceData */buildTextureResourceData,
  /* buildImageData */buildImageData$1,
  /* createBasicSourceTextureResourceData */createBasicSourceTextureResourceData,
  /* createCubemapTextureResourceData */createCubemapTextureResourceData,
  /* createBasicMaterialResourceData */createBasicMaterialResourceData,
  /* createLightMaterialResourceData */createLightMaterialResourceData,
  /* createGeometryResourceData */createGeometryResourceData,
  /* createScriptEventFunctionDataResourceData */createScriptEventFunctionDataResourceData,
  /* createScriptAttributeResourceData */createScriptAttributeResourceData,
  /* buildResourceData */buildResourceData
];

function prepareCubemapTextureResourceData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, param) {
  var image1Name = $staropt$star !== undefined ? $staropt$star : "i1";
  var image2Name = $staropt$star$1 !== undefined ? $staropt$star$1 : "i2";
  var image3Name = $staropt$star$2 !== undefined ? $staropt$star$2 : "i3";
  var image4Name = $staropt$star$3 !== undefined ? $staropt$star$3 : "i4";
  var image5Name = $staropt$star$4 !== undefined ? $staropt$star$4 : "i5";
  var image6Name = $staropt$star$5 !== undefined ? $staropt$star$5 : "i6";
  var image1MimeType = $staropt$star$6 !== undefined ? $staropt$star$6 : "image/png";
  var image2MimeType = $staropt$star$7 !== undefined ? $staropt$star$7 : "image/png";
  var image3MimeType = $staropt$star$8 !== undefined ? $staropt$star$8 : "image/png";
  var image4MimeType = $staropt$star$9 !== undefined ? $staropt$star$9 : "image/png";
  var image5MimeType = $staropt$star$10 !== undefined ? $staropt$star$10 : "image/png";
  var image6MimeType = $staropt$star$11 !== undefined ? $staropt$star$11 : "image/png";
  var image1 = buildImageData$1(undefined, image1Name, image1MimeType, /* () */0);
  var image2 = buildImageData$1(undefined, image2Name, image2MimeType, /* () */0);
  var image3 = buildImageData$1(undefined, image3Name, image3MimeType, /* () */0);
  var image4 = buildImageData$1(undefined, image4Name, image4MimeType, /* () */0);
  var image5 = buildImageData$1(undefined, image5Name, image5MimeType, /* () */0);
  var image6 = buildImageData$1(undefined, image6Name, image6MimeType, /* () */0);
  var imageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, /* record */[
        /* pxImageData */image1,
        /* nxImageData */image2,
        /* pyImageData */image3,
        /* nyImageData */image4,
        /* pzImageData */image5,
        /* nzImageData */image6
      ], ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
  return /* tuple */[
          "cubemapTexture1",
          /* tuple */[
            imageDataMap,
            /* tuple */[
              image1,
              image2,
              image3,
              image4,
              image5,
              image6
            ]
          ]
        ];
}

function createCubemapTextureResourceData$1(state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, $staropt$star$12, param) {
  var image1Name = $staropt$star !== undefined ? $staropt$star : "i1";
  var image2Name = $staropt$star$1 !== undefined ? $staropt$star$1 : "i2";
  var image3Name = $staropt$star$2 !== undefined ? $staropt$star$2 : "i3";
  var image4Name = $staropt$star$3 !== undefined ? $staropt$star$3 : "i4";
  var image5Name = $staropt$star$4 !== undefined ? $staropt$star$4 : "i5";
  var image6Name = $staropt$star$5 !== undefined ? $staropt$star$5 : "i6";
  var image1MimeType = $staropt$star$6 !== undefined ? $staropt$star$6 : "image/png";
  var image2MimeType = $staropt$star$7 !== undefined ? $staropt$star$7 : "image/png";
  var image3MimeType = $staropt$star$8 !== undefined ? $staropt$star$8 : "image/png";
  var image4MimeType = $staropt$star$9 !== undefined ? $staropt$star$9 : "image/png";
  var image5MimeType = $staropt$star$10 !== undefined ? $staropt$star$10 : "image/png";
  var image6MimeType = $staropt$star$11 !== undefined ? $staropt$star$11 : "image/png";
  var flipY = $staropt$star$12 !== undefined ? $staropt$star$12 : false;
  var match = prepareCubemapTextureResourceData(image1Name, image2Name, image3Name, image4Name, image5Name, image6Name, image1MimeType, image2MimeType, image3MimeType, image4MimeType, image5MimeType, image6MimeType, /* () */0);
  var match$1 = match[1];
  var match$2 = match$1[1];
  var textureName = match[0];
  var match$3 = createCubemapTextureResourceData(state, textureName, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, flipY, 0, /* () */0);
  return /* tuple */[
          match$3[0],
          match$3[1],
          textureName,
          /* tuple */[
            match$1[0],
            /* tuple */[
              match$2[0],
              match$2[1],
              match$2[2],
              match$2[3],
              match$2[4],
              match$2[5]
            ]
          ]
        ];
}

var Test = /* module */[
  /* prepareCubemapTextureResourceData */prepareCubemapTextureResourceData,
  /* createCubemapTextureResourceData */createCubemapTextureResourceData$1
];

function generateOneRAB(state) {
  var image1 = buildImageData$1(undefined, undefined, undefined, /* () */0);
  var basicSourceTextureImageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, image1, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
  var match = createBasicSourceTextureResourceData(state, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
  var resourceData1 = buildResourceData(undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
  return GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, match[0]);
}

export {
  prepare ,
  getDefaultShininess ,
  ResourceAssetBundleContent ,
  ResourceData ,
  Test ,
  generateOneRAB ,
  
}
/* ScriptTool-Wonderjs Not a pure module */
