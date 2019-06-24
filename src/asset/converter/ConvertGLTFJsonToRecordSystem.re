open GLTFType;

open WonderBsJson.Json;

open Decode;

let _convertAsset = json =>
  json
  |> field("asset", json =>
       {
         version: json |> field("version", string),
         generator: json |> optional(field("generator", string)),
       }
     );

let _convertSamplers = json =>
  json
  |> optional(
       field(
         "samplers",
         array(json =>
           {
             magFilter: json |> optional(field("magFilter", int)),
             minFilter: json |> optional(field("minFilter", int)),
             wrapS: json |> optional(field("wrapS", int)),
             wrapT: json |> optional(field("wrapT", int)),
           }
         ),
       ),
     );

let _convertBuffers = json =>
  json
  |> field(
       "buffers",
       array(json =>
         {
           uri: json |> optional(field("uri", string)),
           byteLength: json |> field("byteLength", int),
         }
       ),
     );

let _convertBufferViews = json =>
  json
  |> field(
       "bufferViews",
       array(json =>
         {
           buffer: json |> field("buffer", int),
           byteOffset: json |> optional(field("byteOffset", int)),
           byteLength: json |> field("byteLength", int),
           byteStride: json |> optional(field("byteStride", int)),
           /* target: json |> optional(field("target", int)) */
         }
       ),
     );

let _convertAccessors = json =>
  json
  |> field(
       "accessors",
       array(json =>
         {
           bufferView: json |> optional(field("bufferView", int)),
           byteOffset: json |> optional(field("byteOffset", int)),
           count: json |> field("count", int),
           componentType: json |> field("componentType", int),
           type_: json |> field("type", string),
         }
       ),
     );

let _convertTextures = json =>
  json
  |> optional(
       field(
         "textures",
         array(json =>
           {
             name: json |> optional(field("name", string)),
             sampler: json |> optional(field("sampler", int)),
             source: json |> optional(field("source", int)),
             extras:
               json
               |> optional(
                    field("extras", json =>
                      {
                        flipY: json |> field("flipY", bool),
                        format: json |> field("format", int),
                        type_: json |> field("type_", int),
                      }
                    ),
                  ),
           }
         ),
       ),
     );

let _convertImages = json =>
  json
  |> optional(
       field(
         "images",
         array(json =>
           {
             uri: json |> optional(field("uri", string)),
             name: json |> optional(field("name", string)),
             bufferView: json |> optional(field("bufferView", int)),
             mimeType: json |> optional(field("mimeType", string)),
           }
         ),
       ),
     );

let _convertCustomData = [%raw
  json => {|
      return json.customData;
      |}
];

let _convertScenes = json =>
  json
  |> field(
       "scenes",
       array(json =>
         {
           nodes: json |> optional(field("nodes", array(int))),
           extras:
             json
             |> optional(
                  field("extras", json =>
                    {
                      imgui:
                        json
                        |> optional(
                             field("imgui", json =>
                               (
                                 {
                                   imguiFunc:
                                     json |> field("imguiFunc", string),
                                   customData: _convertCustomData(json),
                                 }: SceneGraphType.imgui
                               )
                             ),
                           ),
                      skybox:
                        json
                        |> optional(
                             field("skybox", json =>
                               (
                                 {cubemap: json |> field("cubemap", int)}: GLTFType.skybox
                               )
                             ),
                           ),
                      isRoot: json |> optional(field("isRoot", bool)),
                    }
                  ),
                ),
           extensions:
             json
             |> optional(
                  field("extensions", json =>
                    (
                      {
                        khr_lights:
                          json
                          |> optional(
                               field("KHR_lights", json =>
                                 (
                                   {light: json |> field("light", int)}: GLTFType.sceneKHRLightsExtension
                                 )
                               ),
                             ),
                      }: GLTFType.sceneExtensions
                    )
                  ),
                ),
         }
       ),
     );

let _convertExtensions = json =>
  json
  |> optional(
       field("extensions", json =>
         {
           khr_lights:
             json
             |> optional(
                  field("KHR_lights", json =>
                    {
                      lights:
                        json
                        |> field(
                             "lights",
                             array(json =>
                               {
                                 type_: json |> field("type", string),
                                 color:
                                   json
                                   |> optional(field("color", array(float))),
                                 intensity:
                                   json
                                   |> optional(field("intensity", float)),
                                 constantAttenuation:
                                   json
                                   |> optional(
                                        field("constantAttenuation", float),
                                      ),
                                 linearAttenuation:
                                   json
                                   |> optional(
                                        field("linearAttenuation", float),
                                      ),
                                 quadraticAttenuation:
                                   json
                                   |> optional(
                                        field("quadraticAttenuation", float),
                                      ),
                                 range:
                                   json |> optional(field("range", float)),
                               }
                             ),
                           ),
                    }
                  ),
                ),
         }
       ),
     );

let _getScriptMap = (key, json) => {
  let dict: Js.Dict.t(Js.Json.t) = Obj.magic(json: Js.Json.t);
  Js.Dict.get(dict, key) |> Obj.magic;
};

let _convertExtras = json =>
  json
  |> optional(
       field("extras", json =>
         {
           flyCameraControllers:
             json
             |> optional(
                  field(
                    "flyCameraControllers",
                    array(json =>
                      (
                        {
                          moveSpeed: json |> field("moveSpeed", float),
                          rotateSpeed: json |> field("rotateSpeed", float),
                          wheelSpeed: json |> field("wheelSpeed", float),
                          isBindEvent: json |> field("isBindEvent", bool),
                        }: SceneGraphType.flyCameraController
                      )
                    ),
                  ),
                ),
           arcballCameraControllers:
             json
             |> optional(
                  field(
                    "arcballCameraControllers",
                    array(json =>
                      (
                        {
                          distance: json |> field("distance", float),
                          minDistance: json |> field("minDistance", float),
                          phi: json |> field("phi", float),
                          theta: json |> field("theta", float),
                          thetaMargin: json |> field("thetaMargin", float),
                          target:
                            json
                            |> field("target", tuple3(float, float, float)),
                          moveSpeedX: json |> field("moveSpeedX", float),
                          moveSpeedY: json |> field("moveSpeedY", float),
                          rotateSpeed: json |> field("rotateSpeed", float),
                          wheelSpeed: json |> field("wheelSpeed", float),
                          isBindEvent: json |> field("isBindEvent", bool),
                        }: SceneGraphType.arcballCameraController
                      )
                    ),
                  ),
                ),
           basicCameraViews:
             json
             |> optional(
                  field(
                    "basicCameraViews",
                    array(json =>
                      (
                        {isActive: json |> field("isActive", bool)}: basicCameraView
                      )
                    ),
                  ),
                ),
           meshRenderers:
             json
             |> optional(
                  field(
                    "meshRenderers",
                    array(json =>
                      (
                        {
                          drawMode: json |> field("drawMode", int),
                          isRender: json |> field("isRender", bool),
                        }: meshRenderer
                      )
                    ),
                  ),
                ),
           basicMaterials:
             json
             |> optional(
                  field(
                    "basicMaterials",
                    array(json =>
                      (
                        {
                          colorFactor:
                            json
                            |> optional(field("colorFactor", array(float))),
                          name: json |> optional(field("name", string)),
                        }: basicMaterial
                      )
                    ),
                  ),
                ),
           scripts:
             json
             |> optional(
                  field(
                    "scripts",
                    array(json =>
                      (
                        /* WonderLog.Log.print(json) |> ignore; */
                        {
                          isActive: json |> field("isActive", bool),
                          eventFunctionDataMap:
                            _getScriptMap("eventFunctionDataMap", json),
                          /* json
                              |> field("eventFunctionDataMap",dict |> Obj.magic)
                             |> WonderLog.Log.print  */
                          attributeMap:
                            /* json |> field("attributeMap", dict |> Obj.magic), */
                            _getScriptMap("attributeMap", json),
                        }: script
                      )
                    ),
                  ),
                ),
           cubemapTextures:
             json
             |> optional(
                  field(
                    "cubemapTextures",
                    array(json =>
                      (
                        {
                          name: json |> optional(field("name", string)),
                          sampler: json |> field("sampler", int),
                          flipY: json |> field("flipY", bool),
                          pxSource: json |> field("pxSource", int),
                          nxSource: json |> field("nxSource", int),
                          pySource: json |> field("pySource", int),
                          nySource: json |> field("nySource", int),
                          pzSource: json |> field("pzSource", int),
                          nzSource: json |> field("nzSource", int),
                          pxFormat: json |> field("pxFormat", int),
                          nxFormat: json |> field("nxFormat", int),
                          pyFormat: json |> field("pyFormat", int),
                          nyFormat: json |> field("nyFormat", int),
                          pzFormat: json |> field("pzFormat", int),
                          nzFormat: json |> field("nzFormat", int),
                          pxType: json |> field("pxType", int),
                          nxType: json |> field("nxType", int),
                          pyType: json |> field("pyType", int),
                          nyType: json |> field("nyType", int),
                          pzType: json |> field("pzType", int),
                          nzType: json |> field("nzType", int),
                        }: cubemapTexture
                      )
                    ),
                  ),
                ),
         }
       ),
     );

let _convertCameras = json =>
  json
  |> optional(
       field(
         "cameras",
         array(json =>
           {
             type_: json |> field("type", string),
             perspective:
               json
               |> optional(
                    field("perspective", json =>
                      {
                        aspectRatio:
                          json |> optional(field("aspectRatio", float)),
                        yfov: json |> field("yfov", float),
                        zfar: json |> optional(field("zfar", float)),
                        znear: json |> field("znear", float),
                      }
                    ),
                  ),
             orthographic:
               json
               |> optional(
                    field("orthographic", json =>
                      {
                        xmag: json |> field("xmag", float),
                        ymag: json |> field("ymag", float),
                        zfar: json |> field("zfar", float),
                        znear: json |> field("znear", float),
                      }
                    ),
                  ),
           }
         ),
       ),
     );

let _convertMeshes = json =>
  json
  |> field(
       "meshes",
       array(json =>
         {
           name: json |> optional(field("name", string)),
           primitives:
             json
             |> field(
                  "primitives",
                  array(json =>
                    {
                      attributes:
                        json
                        |> field("attributes", json =>
                             {
                               position: json |> field("POSITION", int),
                               normal:
                                 json |> optional(field("NORMAL", int)),
                               texCoord_0:
                                 json |> optional(field("TEXCOORD_0", int)),
                               texCoord_1:
                                 json |> optional(field("TEXCOORD_1", int)),
                             }
                           ),
                      indices: json |> optional(field("indices", int)),
                      material: json |> optional(field("material", int)),
                      mode: json |> optional(field("mode", int)),
                    }
                  ),
                ),
         }
       ),
     );

let _convertMaterials = json =>
  json
  |> optional(
       field(
         "materials",
         array(json =>
           {
             extensions:
               json
               |> optional(
                    field("extensions", json =>
                      {
                        khr_materials_pbrSpecularGlossiness:
                          json
                          |> optional(
                               field(
                                 "KHR_materials_pbrSpecularGlossiness", json =>
                                 {
                                   diffuseFactor:
                                     json
                                     |> optional(
                                          field(
                                            "diffuseFactor",
                                            array(float),
                                          ),
                                        ),
                                   diffuseTexture:
                                     json
                                     |> optional(
                                          field("diffuseTexture", json =>
                                            {
                                              index:
                                                json |> field("index", int),
                                              texCoord:
                                                json
                                                |> optional(
                                                     field("texCoord", int),
                                                   ),
                                            }
                                          ),
                                        ),
                                   glossinessFactor:
                                     json
                                     |> optional(
                                          field("glossinessFactor", float),
                                        ),
                                   specularFactor:
                                     json
                                     |> optional(
                                          field(
                                            "specularFactor",
                                            array(float),
                                          ),
                                        ),
                                   specularGlossinessTexture:
                                     json
                                     |> optional(
                                          field(
                                            "specularGlossinessTexture", json =>
                                            {
                                              index:
                                                json |> field("index", int),
                                              texCoord:
                                                json
                                                |> optional(
                                                     field("texCoord", int),
                                                   ),
                                            }
                                          ),
                                        ),
                                 }
                               ),
                             ),
                      }
                    ),
                  ),
             name: json |> optional(field("name", string)),
             pbrMetallicRoughness:
               json
               |> optional(
                    field("pbrMetallicRoughness", json =>
                      {
                        baseColorFactor:
                          json
                          |> optional(
                               field("baseColorFactor", array(float)),
                             ),
                        baseColorTexture:
                          json
                          |> optional(
                               field("baseColorTexture", json =>
                                 {
                                   index: json |> field("index", int),
                                   texCoord:
                                     json |> optional(field("texCoord", int)),
                                 }
                               ),
                             ),
                        metallicFactor:
                          json |> optional(field("metallicFactor", float)),
                        roughnessFactor:
                          json |> optional(field("roughnessFactor", float)),
                        metallicRoughnessTexture:
                          json
                          |> optional(
                               field("metallicRoughnessTexture", json =>
                                 {
                                   index: json |> field("index", int),
                                   texCoord:
                                     json |> optional(field("texCoord", int)),
                                 }
                               ),
                             ),
                      }
                    ),
                  ),
           }
         ),
       ),
     );

let _convertNodes = json =>
  json
  |> field(
       "nodes",
       array(json =>
         {
           name: json |> optimizedOptional(optimizedField("name", string)),
           camera: json |> optimizedOptional(optimizedField("camera", int)),
           mesh: json |> optimizedOptional(optimizedField("mesh", int)),
           matrix:
             json
             |> optimizedOptional(optimizedField("matrix", array(float))),
           translation:
             json
             |> optimizedOptional(
                  optimizedField("translation", array(float)),
                ),
           rotation:
             json
             |> optimizedOptional(optimizedField("rotation", array(float))),
           scale:
             json
             |> optimizedOptional(optimizedField("scale", array(float))),
           children:
             json
             |> optimizedOptional(optimizedField("children", array(int))),
           extras:
             json
             |> optimizedOptional(
                  optimizedField("extras", json =>
                    {
                      basicCameraView:
                        json
                        |> optimizedOptional(
                             optimizedField("basicCameraView", int),
                           ),
                      meshRenderer:
                        json
                        |> optimizedOptional(
                             optimizedField("meshRenderer", int),
                           ),
                      basicMaterial:
                        json
                        |> optimizedOptional(
                             optimizedField("basicMaterial", int),
                           ),
                      lightMaterial:
                        json
                        |> optimizedOptional(
                             optimizedField("lightMaterial", int),
                           ),
                      flyCameraController:
                        json
                        |> optimizedOptional(
                             optimizedField("flyCameraController", int),
                           ),
                      arcballCameraController:
                        json
                        |> optimizedOptional(
                             optimizedField("arcballCameraController", int),
                           ),
                      script:
                        json
                        |> optimizedOptional(optimizedField("script", int)),
                      isActive:
                        json
                        |> optimizedOptional(
                             optimizedField("isActive", bool),
                           ),
                      isRoot:
                        json
                        |> optimizedOptional(optimizedField("isRoot", bool)),
                    }
                  ),
                ),
           extensions:
             json
             |> optional(
                  field("extensions", json =>
                    (
                      {
                        khr_lights:
                          json
                          |> optional(
                               field("KHR_lights", json =>
                                 (
                                   {light: json |> field("light", int)}: GLTFType.nodeKHRLightsExtension
                                 )
                               ),
                             ),
                      }: GLTFType.nodeExtensions
                    )
                  ),
                ),
         }
       ),
     );

let convert = json => {
  extensionsUsed: json |> optional(field("extensionsUsed", array(string))),
  extensions: _convertExtensions(json),
  extras: _convertExtras(json),
  asset: _convertAsset(json),
  scenes: _convertScenes(json),
  scene: json |> optional(field("scene", int)),
  images: _convertImages(json),
  textures: _convertTextures(json),
  samplers: _convertSamplers(json),
  buffers: _convertBuffers(json),
  bufferViews: _convertBufferViews(json),
  accessors: _convertAccessors(json),
  cameras: _convertCameras(json),
  nodes: _convertNodes(json),
  meshes: _convertMeshes(json),
  materials: _convertMaterials(json),
};