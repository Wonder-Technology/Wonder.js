open Js.Promise;

external arrayFloat3ToTuple : array(float) => (float, float, float) = "%identity";

external arrayFloat4ToTuple : array(float) => (float, float, float, float) = "%identity";

/* TODO duplicate */
/* let _fetch = [@bs] ((filePath) => Fetch.fetch(filePath)); */
let _convertGLTFJsonToRecord = (json) : GLTFType.gltf =>
  GLTFType.(
    Json.(
      Decode.{
        asset:
          json
          |> field(
               "asset",
               (json) => {
                 version: json |> field("version", string),
                 generator: json |> optional(field("generator", string))
               }
             ),
        scenes:
          json
          |> field(
               "scenes",
               array((json) => {nodes: json |> optional(field("nodes", array(int)))})
             ),
        scene: json |> field("scene", int),
        images:
          json
          |> optional(
               field("images", array((json) => {uri: json |> optional(field("uri", string))}))
             ),
        textures:
          json
          |> optional(
               field(
                 "textures",
                 array(
                   (json) => {
                     sampler: json |> optional(field("sampler", int)),
                     source: json |> optional(field("source", int))
                   }
                 )
               )
             ),
        samplers:
          json
          |> optional(
               field(
                 "samplers",
                 array(
                   (json) => {
                     magFilter: json |> optional(field("magFilter", int)),
                     minFilter: json |> optional(field("minFilter", int)),
                     wrapS: json |> optional(field("wrapS", int)),
                     wrapT: json |> optional(field("wrapT", int))
                   }
                 )
               )
             ),
        buffers:
          json
          |> field(
               "buffers",
               array(
                 (json) => {
                   uri: json |> optional(field("uri", string)),
                   byteLength: json |> field("byteLength", int)
                 }
               )
             ),
        bufferViews:
          json
          |> field(
               "bufferViews",
               array(
                 (json) => {
                   buffer: json |> field("buffer", int),
                   byteOffset: json |> optional(field("byteOffset", int)),
                   byteLength: json |> field("byteLength", int),
                   byteStride: json |> optional(field("byteStride", int))
                   /* target: json |> optional(field("target", int)) */
                 }
               )
             ),
        accessors:
          json
          |> field(
               "accessors",
               array(
                 (json) => {
                   bufferView: json |> optional(field("bufferView", int)),
                   byteOffset: json |> optional(field("byteOffset", int)),
                   count: json |> field("count", int),
                   componentType: json |> field("componentType", int),
                   type_: json |> field("type", string)
                 }
               )
             ),
        cameras:
          json
          |> optional(
               field(
                 "cameras",
                 array(
                   (json) => {
                     type_: json |> field("type", string),
                     perspective:
                       json
                       |> optional(
                            field(
                              "perspective",
                              (json) => {
                                aspectRatio: json |> optional(field("aspectRatio", float)),
                                yfov: json |> field("yfov", float),
                                zfar: json |> optional(field("zfar", float)),
                                znear: json |> field("znear", float)
                              }
                            )
                          ),
                     orthographic:
                       json
                       |> optional(
                            field(
                              "orthographic",
                              (json) => {
                                xmag: json |> field("xmag", float),
                                ymag: json |> field("ymag", float),
                                zfar: json |> field("zfar", float),
                                znear: json |> field("znear", float)
                              }
                            )
                          )
                   }
                 )
               )
             ),
        nodes:
          json
          |> field(
               "nodes",
               array(
                 (json) => {
                   camera: json |> optional(field("camera", int)),
                   mesh: json |> optional(field("mesh", int)),
                   matrix: json |> optional(field("matrix", array(float))),
                   translation: json |> optional(field("translation", array(float))),
                   rotation: json |> optional(field("rotation", array(float))),
                   scale: json |> optional(field("scale", array(float))),
                   children: json |> optional(field("children", array(int)))
                 }
               )
             ),
        meshes:
          json
          |> field(
               "meshes",
               array(
                 (json) => {
                   primitives:
                     json
                     |> field(
                          "primitives",
                          array(
                            (json) => {
                              attributes:
                                json
                                |> field(
                                     "attributes",
                                     (json) => {
                                       position: json |> field("POSITION", int),
                                       normal: json |> optional(field("NORMAL", int)),
                                       texCoord_0: json |> optional(field("TEXCOORD_0", int)),
                                       texCoord_1: json |> optional(field("TEXCOORD_1", int))
                                     }
                                   ),
                              indices: json |> optional(field("indices", int)),
                              material: json |> optional(field("material", int))
                            }
                          )
                        )
                 }
               )
             ),
        materials:
          json
          |> field(
               "materials",
               array(
                 (json) => {
                   pbrMetallicRoughness:
                     json
                     |> optional(
                          field(
                            "pbrMetallicRoughness",
                            (json) => {
                              baseColorFactor:
                                json |> optional(field("baseColorFactor", array(float))),
                              baseColorTexture:
                                json
                                |> optional(
                                     field(
                                       "baseColorTexture",
                                       (json) => {
                                         index: json |> field("index", int),
                                         texCoord: json |> optional(field("texCoord", int))
                                       }
                                     )
                                   ),
                              metallicFactor: json |> optional(field("metallicFactor", float)),
                              roughnessFactor: json |> optional(field("roughnessFactor", float)),
                              metallicRoughnessTexture:
                                json
                                |> optional(
                                     field(
                                       "metallicRoughnessTexture",
                                       (json) => {
                                         index: json |> field("index", int),
                                         texCoord: json |> optional(field("texCoord", int))
                                       }
                                     )
                                   )
                            }
                          )
                        )
                 }
               )
             )
      }
    )
  );

let _getSourcePath = (filePath, sourceRelativePath) =>
  PathService.resolve(filePath, sourceRelativePath);

/* let _isBase64: string => Js.boolean = [%bs.raw
     {|
               function(uri){

               return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(uri)
                   || uri.substr(0, 5) === "data:";
               }
               |}
   ]; */
let _isBase64 = (str) =>
  [%re {|/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/g|}]
  |> Js.Re.test(str)
  || str
  |> Js.String.substring(~from=0, ~to_=5) === "data:";

/* let _loadImages = (gltfFilePath, {images}: GLTFType.gltf) => {
     open GLTFType;
     let imageMap = WonderCommonlib.HashMapService.createEmpty();
     switch images {
     | None => Most.just(imageMap)
     | Some(images) =>
       images
       |> WonderCommonlib.ArrayService.reduceOneParam(
            [@bs]
            (
              (streamArr, {uri}: image) =>
                switch uri {
                | None =>
                  WonderLog.Log.fatal(
                    WonderLog.Log.buildFatalMessage(
                      ~title="_loadImages",
                      ~description={j|image->uri should exist|j},
                      ~reason="",
                      ~solution={j||j},
                      ~params={j||j}
                    )
                  )
                | Some(uri) =>
                  switch (_isBase64(uri)) {
                  | true =>
                    WonderLog.Log.fatal(
                      WonderLog.Log.buildFatalMessage(
                        ~title="_loadImages",
                        ~description={j|not support base64 uri|j},
                        ~reason="",
                        ~solution={j||j},
                        ~params={j||j}
                      )
                    )
                  | _ =>
                    let filePath = _getSourcePath(gltfFilePath, uri);
                    streamArr
                    |> ArrayService.push(
                         LoadImageSystem.load(filePath)
                         |> Most.tap(
                              (image) =>
                                imageMap
                                |> WonderCommonlib.HashMapService.set(filePath, image)
                                |> ignore
                            )
                       )
                  }
                }
            ),
            [||]
          )
       |> Most.mergeArray
       |> Most.map((_) => imageMap)
     }
   };

   let _loadBuffers = (gltfFilePath, {buffers}: GLTFType.gltf) => {
     open GLTFType;
     let arrayBufferMap = WonderCommonlib.HashMapService.createEmpty();
     buffers
     |> WonderCommonlib.ArrayService.reduceOneParam(
          [@bs]
          (
            (streamArr, {uri}: buffer) =>
              switch uri {
              | None =>
                WonderLog.Log.fatal(
                  WonderLog.Log.buildFatalMessage(
                    ~title="_loadBuffers",
                    ~description={j|buffer->uri should exist|j},
                    ~reason="",
                    ~solution={j||j},
                    ~params={j||j}
                  )
                )
              | Some(uri) =>
                /* TODO duplicate */
                switch (_isBase64(uri)) {
                | true =>
                  WonderLog.Log.fatal(
                    WonderLog.Log.buildFatalMessage(
                      ~title="_loadBuffers",
                      ~description={j|not support base64 uri|j},
                      ~reason="",
                      ~solution={j||j},
                      ~params={j||j}
                    )
                  )
                | _ =>
                  let filePath = _getSourcePath(gltfFilePath, uri);
                  streamArr
                  |> ArrayService.push(
                       FetchCommon.createFetchArrayBufferStream(filePath, _fetch)
                       |> Most.tap(
                            (arrayBuffer) =>
                              arrayBufferMap
                              |> WonderCommonlib.HashMapService.set(filePath, arrayBuffer)
                              |> ignore
                          )
                     )
                }
              }
          ),
          [||]
        )
     |> Most.mergeArray
     |> Most.map((_) => arrayBufferMap)
   }; */
let _buildImageArray = ({images}: GLTFType.gltf) : Most.stream('a) => {
  open GLTFType;
  /* let imageMap = WonderCommonlib.HashMapService.createEmpty(); */
  let imageArr = [||];
  switch images {
  | None => Most.just(imageArr)
  | Some(images) =>
    images
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (streamArr, {uri}: image) =>
             switch uri {
             | None =>
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="_loadImages",
                   ~description={j|image->uri should exist|j},
                   ~reason="",
                   ~solution={j||j},
                   ~params={j||j}
                 )
               )
             | Some(uri) =>
               switch (_isBase64(uri)) {
               | false =>
                 WonderLog.Log.fatal(
                   WonderLog.Log.buildFatalMessage(
                     ~title="_loadImages",
                     ~description={j|only support base64 uri|j},
                     ~reason="",
                     ~solution={j||j},
                     ~params={j||j}
                   )
                 )
               | true =>
                 /* let filePath = _getSourcePath(gltfFilePath, uri); */
                 streamArr
                 |> ArrayService.push(
                      LoadImageSystem.loadBase64Image(uri)
                      |> Most.tap(
                           (image) =>
                             imageArr
                             |> ArrayService.push(image)
                             /* imageMap
                                |> WonderCommonlib.HashMapService.set(filePath, image) */
                             |> ignore
                         )
                    )
               }
             }
         ),
         [||]
       )
    |> Most.mergeArray
    |> Most.map((_) => imageArr)
  }
};

let _decodeArrayBuffer = (base64Str: string) => {
  open Js.Typed_array;
  let arr = base64Str |> Js.String.split(",");
  let base64 = arr |> Js.Array.length > 1 ? arr[1] : arr[0];
  let decodedString = File.atob(base64);
  let bufferLength = decodedString |> Js.String.length;
  let arrayBuffer = ArrayBuffer.make(bufferLength);
  let typeArr = Uint8Array.fromBuffer(arrayBuffer);
  let typeArr =
    ArrayService.range(0, bufferLength - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (typeArr, i) => {
             Uint8Array.unsafe_set(
               typeArr,
               i,
               decodedString |> Js.String.charCodeAt(i) |> Obj.magic
             );
             typeArr
           }
         ),
         typeArr
       );
  typeArr |> Uint8Array.buffer
};

let _buildBufferArray = ({buffers}: GLTFType.gltf) =>
  GLTFType.(
    buffers
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (arrayBufferArr, {uri}: buffer) =>
             switch uri {
             | None =>
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="_loadBuffers",
                   ~description={j|buffer->uri should exist|j},
                   ~reason="",
                   ~solution={j||j},
                   ~params={j||j}
                 )
               )
             | Some(uri) =>
               switch (_isBase64(uri)) {
               | false =>
                 WonderLog.Log.fatal(
                   WonderLog.Log.buildFatalMessage(
                     ~title="_loadBuffers",
                     ~description={j|only support base64 uri|j},
                     ~reason="",
                     ~solution={j||j},
                     ~params={j||j}
                   )
                 )
               | true => arrayBufferArr |> ArrayService.push(_decodeArrayBuffer(uri))
               }
             }
         ),
         [||]
       )
  );

/* let _getIndexMarkedNotHas = () => (-1); */
let _convertToScene = ({scenes, scene}: GLTFType.gltf) : WDType.scene => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|only has one scene|j}, ~actual={j|not|j}),
              () => scenes |> Js.Array.length == 1
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  {gameObjects: Array.unsafe_get(scenes, scene).nodes |> OptionService.unsafeGet}
};

let _checkGameObjectAndComponentIndicesCountShouldEqual =
    (
      ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData) as componentGameObjectIndexData
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|gameObjectIndices' count === componentIndices' count|j},
                ~actual={j|not|j}
              ),
              () => gameObjectIndices |> Js.Array.length == (componentIndices |> Js.Array.length)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  componentGameObjectIndexData
};

let _convertToTransformGameObjectIndexData = (nodes) => {
  let (gameObjectIndices, componentIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           ((gameObjectIndices, componentIndices), _, index) => (
             gameObjectIndices |> ArrayService.push(index),
             componentIndices |> ArrayService.push(index)
           )
         ),
         ([||], [||])
       );
  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual
  |> WonderLog.Contract.ensureCheck(
       ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|every node should has one transform component|j},
                   ~actual={j|not|j}
                 ),
                 () => gameObjectIndices |> Js.Array.length == (nodes |> Js.Array.length)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     )
};

let _convertToChildrenTransformIndexData =
    (transformGameObjectIndexData: WDType.componentGameObjectIndexData, nodes) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|every node should has one transform component|j},
                ~actual={j|not|j}
              ),
              () =>
                transformGameObjectIndexData.gameObjectIndices
                |> Js.Array.length == (nodes |> Js.Array.length)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let (parentTransformIndices, childrenTransformIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           ((parentTransformIndices, childrenTransformIndices), {children}: GLTFType.node, index) =>
             switch children {
             | None => (parentTransformIndices, childrenTransformIndices)
             | Some(children) => (
                 parentTransformIndices |> ArrayService.push(index),
                 childrenTransformIndices |> ArrayService.push(children)
               )
             }
         ),
         ([||], [||])
       );
  ({parentTransformIndices, childrenTransformIndices}: WDType.childrenTransformIndexData)
  |> WonderLog.Contract.ensureCheck(
       ({parentTransformIndices, childrenTransformIndices}: WDType.childrenTransformIndexData) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|parentTransformIndices' count === childrenTransformIndices' count|j},
                   ~actual={j|not|j}
                 ),
                 () =>
                   parentTransformIndices
                   |> Js.Array.length == (childrenTransformIndices |> Js.Array.length)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     )
};

let _getCount = (arrs) => arrs |> Js.Array.length;

/*
 let _convertToBasicCameraViewGameObjectIndexData = (nodes) =>
   nodes
   |> WonderCommonlib.ArrayService.reduceOneParami(
        [@bs]
        (
          (arr, {camera}: GLTFType.node, index) =>
            switch camera {
            | None => arr |> ArrayService.push(_getIndexMarkedNotHas())
            | Some(_) => arr |> ArrayService.push(index)
            }
        ),
        [||]
      ); */
let _checkEveryComponentShouldHasGameObject = (nodes, componentGameObjectIndexData) =>
  componentGameObjectIndexData
  |> WonderLog.Contract.ensureCheck(
       (componentGameObjectIndexData) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|every component should has gameObject|j},
                   ~actual={j|not|j}
                 ),
                 () =>
                   componentGameObjectIndexData
                   |> WonderCommonlib.ArrayService.forEach(
                        [@bs]
                        (
                          (index) => {
                            index >= 0;
                            index <= _getCount(nodes)
                          }
                        )
                      )
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let _convertToBasicCameraViewGameObjectIndexData = (nodes, cameras) => {
  let (gameObjectIndices, componentIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           ((gameObjectIndices, componentIndices), {camera}: GLTFType.node, index) =>
             switch camera {
             | None => (gameObjectIndices, componentIndices)
             | Some(camera) => (
                 gameObjectIndices |> ArrayService.push(index),
                 componentIndices |> ArrayService.push(camera)
               )
             }
         ),
         ([||], [||])
       );
  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual
};

let _convertToPerspectiveCameraProjectionGameObjectIndexData =
    (nodes, cameras)
    : WDType.componentGameObjectIndexData =>
  switch cameras {
  | None => {gameObjectIndices: [||], componentIndices: [||]}
  | Some(cameras) =>
    let (perspectiveCameraActualIndexMap, _) =
      cameras
      |> WonderCommonlib.ArrayService.reduceOneParami(
           [@bs]
           (
             (
               (perspectiveCameraActualIndexMap, perspectiveCameraActualIndex),
               {type_}: GLTFType.camera,
               perspectiveCameraIndex
             ) =>
               switch type_ {
               | "perspective" => (
                   perspectiveCameraActualIndexMap
                   |> WonderCommonlib.SparseMapService.set(
                        perspectiveCameraIndex,
                        perspectiveCameraActualIndex
                      ),
                   perspectiveCameraActualIndex |> succ
                 )
               | _ => (perspectiveCameraActualIndexMap, perspectiveCameraActualIndex)
               }
           ),
           (WonderCommonlib.SparseMapService.createEmpty(), 0)
         );
    let (gameObjectIndices, componentIndices) =
      nodes
      |> WonderCommonlib.ArrayService.reduceOneParami(
           [@bs]
           (
             ((gameObjectIndices, componentIndices), {camera}: GLTFType.node, index) =>
               switch camera {
               | None => (gameObjectIndices, componentIndices)
               | Some(camera) =>
                 let {type_}: GLTFType.camera = Array.unsafe_get(cameras, camera);
                 switch type_ {
                 | "perspective" => (
                     gameObjectIndices |> ArrayService.push(index),
                     componentIndices
                     |> ArrayService.push(
                          perspectiveCameraActualIndexMap
                          |> WonderCommonlib.SparseMapService.unsafeGet(camera)
                        )
                   )
                 | _ => (gameObjectIndices, componentIndices)
                 }
               }
           ),
           ([||], [||])
         );
    ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
    |> _checkGameObjectAndComponentIndicesCountShouldEqual
  };

let _getPrimitiveData = (primitives) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|primitives has only one primitive data|j},
                   ~actual={j|not|j}
                 ),
                 () => primitives |> Js.Array.length == 1
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  primitives[0]
  |> WonderLog.Contract.ensureCheck(
       ({attributes, indices}: GLTFType.primitive) => {
         open WonderLog;
         open Contract;
         open Operators;
         test(
           Log.buildAssertMessage(~expect={j|only has TEXCOORD_0|j}, ~actual={j|not|j}),
           () => attributes.texCoord_1 |> Js.Option.isNone |> assertTrue
         );
         test(
           Log.buildAssertMessage(~expect={j|indices exist|j}, ~actual={j|not|j}),
           () => indices |> Js.Option.isSome |> assertTrue
         )
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let _convertToLightMaterialGameObjectIndexData = (nodes, meshes, materials) => {
  let (gameObjectIndices, componentIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           ((gameObjectIndices, componentIndices), {mesh}: GLTFType.node, index) =>
             switch mesh {
             | None => (gameObjectIndices, componentIndices)
             | Some(mesh) =>
               let {primitives}: GLTFType.mesh = Array.unsafe_get(meshes, mesh);
               let {material}: GLTFType.primitive = _getPrimitiveData(primitives);
               switch material {
               | None => (gameObjectIndices, componentIndices)
               | Some(material) => (
                   gameObjectIndices |> ArrayService.push(index),
                   componentIndices |> ArrayService.push(material)
                 )
               }
             }
         ),
         ([||], [||])
       );
  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual
};

let _convertToGeometryGameObjectIndexData = (nodes) => {
  let (gameObjectIndices, componentIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           ((gameObjectIndices, componentIndices), {mesh}: GLTFType.node, index) =>
             switch mesh {
             | None => (gameObjectIndices, componentIndices)
             | Some(mesh) => (
                 gameObjectIndices |> ArrayService.push(index),
                 componentIndices |> ArrayService.push(mesh)
               )
             }
         ),
         ([||], [||])
       );
  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual
};

let _convertToGameObjectIndexData =
    ({nodes, meshes, cameras, materials}: GLTFType.gltf)
    : WDType.gameObjectIndices => {
  let transformGameObjectIndexData = _convertToTransformGameObjectIndexData(nodes);
  {
    transformGameObjectIndexData,
    childrenTransformIndexData:
      _convertToChildrenTransformIndexData(transformGameObjectIndexData, nodes),
    basicCameraViewGameObjectIndexData:
      _convertToBasicCameraViewGameObjectIndexData(nodes, cameras),
    perspectiveCameraProjectionGameObjectIndexData:
      _convertToPerspectiveCameraProjectionGameObjectIndexData(nodes, cameras),
    lightMaterialGameObjectIndexData:
      _convertToLightMaterialGameObjectIndexData(nodes, meshes, materials),
    customGeometryGameObjectIndexData: _convertToGeometryGameObjectIndexData(nodes)
  }
};

let _setMapMaterialIndices = (materialMap, materialIndex, (materialIndices, diffuseMapIndices)) =>
  switch materialMap {
  | None => (materialIndices, diffuseMapIndices)
  | Some(({index}: GLTFType.textureInfo)) => (
      materialIndices |> ArrayService.push(materialIndex),
      diffuseMapIndices |> ArrayService.push(index)
    )
  };

let _convertToMaterialIndices = ({nodes, materials}: GLTFType.gltf) : WDType.materialIndices => {
  let (materialIndices, diffuseMapIndices) =
    materials
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           ((materialIndices, diffuseMapIndices), {pbrMetallicRoughness}: GLTFType.material, index) =>
             switch pbrMetallicRoughness {
             | None => (materialIndices, diffuseMapIndices)
             | Some(pbrMetallicRoughness) =>
               let {baseColorTexture, metallicRoughnessTexture}: GLTFType.pbrMetallicRoughness = pbrMetallicRoughness;
               _setMapMaterialIndices(
                 baseColorTexture,
                 index,
                 (materialIndices, diffuseMapIndices)
               )
             }
         ),
         ([||], [||])
       );
  (
    {diffuseMapMaterialIndices: {materialIndices, mapIndices: diffuseMapIndices}}: WDType.materialIndices
  )
  |> WonderLog.Contract.ensureCheck(
       ({diffuseMapMaterialIndices: {materialIndices, mapIndices}}: WDType.materialIndices) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|materialIndices' count === mapIndices' count|j},
                   ~actual={j|not|j}
                 ),
                 () => materialIndices |> Js.Array.length == (mapIndices |> Js.Array.length)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     )
};

let _convertToImageAndSamplerTextureIndices = ({nodes, textures}: GLTFType.gltf) =>
  switch textures {
  | None => (([||], [||]), ([||], [||]))
  | Some(textures) =>
    textures
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           (
             ((imageTextureIndices, imageIndices), (samplerTextureIndices, samplerIndices)),
             {sampler, source}: GLTFType.texture,
             index
           ) => (
             switch source {
             | None => (imageTextureIndices, imageIndices)
             | Some(source) => (
                 imageTextureIndices |> ArrayService.push(index),
                 imageIndices |> ArrayService.push(source)
               )
             },
             switch sampler {
             | None => (samplerTextureIndices, samplerIndices)
             | Some(sampler) => (
                 samplerTextureIndices |> ArrayService.push(index),
                 samplerIndices |> ArrayService.push(sampler)
               )
             }
           )
         ),
         (([||], [||]), ([||], [||]))
       )
    |> WonderLog.Contract.ensureCheck(
         (((imageTextureIndices, imageIndices), (samplerTextureIndices, samplerIndices))) => {
           open WonderLog;
           open Contract;
           open Operators;
           test(
             Log.buildAssertMessage(
               ~expect={j|imageTextureIndices' count == imageIndices' count|j},
               ~actual={j|not|j}
             ),
             () => imageTextureIndices |> Js.Array.length == (imageIndices |> Js.Array.length)
           );
           test(
             Log.buildAssertMessage(
               ~expect={j|samplerTextureIndices' count == samplerIndices' count|j},
               ~actual={j|not|j}
             ),
             () => samplerTextureIndices |> Js.Array.length == (samplerIndices |> Js.Array.length)
           )
         },
         IsDebugMainService.getIsDebug(StateDataMain.stateData)
       )
  };

let _convertToIndices = (gltf: GLTFType.gltf) : WDType.indices => {
  let ((imageTextureIndices, imageIndices), (samplerTextureIndices, samplerIndices)) =
    _convertToImageAndSamplerTextureIndices(gltf);
  {
    gameObjectIndices: _convertToGameObjectIndexData(gltf),
    materialIndices: _convertToMaterialIndices(gltf),
    imageTextureIndices: {textureIndices: imageTextureIndices, imageIndices},
    samplerTextureIndices: {textureIndices: samplerTextureIndices, samplerIndices}
  }
};

let _getTranslationTuple = (mat) => (mat[12], mat[13], mat[14]);

let _getScaleTuple = (mat) => {
  let m11 = mat[0];
  let m12 = mat[1];
  let m13 = mat[2];
  let m21 = mat[4];
  let m22 = mat[5];
  let m23 = mat[6];
  let m31 = mat[8];
  let m32 = mat[9];
  let m33 = mat[10];
  (
    Js.Math.sqrt(m11 *. m11 +. m12 *. m12 +. m13 *. m13),
    Js.Math.sqrt(m21 *. m21 +. m22 *. m22 +. m23 *. m23),
    Js.Math.sqrt(m31 *. m31 +. m32 *. m32 +. m33 *. m33)
  )
};

let _getRotationTuple = (mat) => {
  let trace = mat[0] +. mat[5] +. mat[10];
  /* let out = [||];*/
  /* if (trace > 0.) {
       let s = Js.Math.sqrt(trace +. 1.0) *. 2.;
       Array.unsafe_set(out, 3, 0.25 *. s);
       Array.unsafe_set(out, 0, (mat[6] -. mat[9]) /. s);
       Array.unsafe_set(out, 1, (mat[8] -. mat[2]) /. s);
       Array.unsafe_set(out, 2, (mat[1] -. mat[4]) /. s)
     } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
       let s = Js.Math.sqrt(1.0 +. mat[0] -. mat[5] -. mat[10]) *. 2.;
       Array.unsafe_set(out, 3, (mat[6] -. mat[9]) /. s);
       Array.unsafe_set(out, 0, 0.25 *. s);
       Array.unsafe_set(out, 1, (mat[1] +. mat[4]) /. s);
       Array.unsafe_set(out, 2, (mat[8] +. mat[2]) /. s);
     } else if (mat[5] > mat[10]) {
       let s = Js.Math.sqrt(1.0 +. mat[5] -. mat[0] -. mat[10]) *. 2.;
       Array.unsafe_set(out, 3, (mat[8] -. mat[2]) /. s);
       Array.unsafe_set(out, 0, (mat[1] +. mat[4]) /. s);
       Array.unsafe_set(out, 1, 0.25 *. s);
       Array.unsafe_set(out, 2, (mat[6] +. mat[9]) /. s)

     } else {
       let s = Js.Math.sqrt(1.0 +. mat[10] -. mat[0] -. mat[5]) *. 2.;
       Array.unsafe_set(out, 3, (mat[1] -. mat[4]) /. s);
       Array.unsafe_set(out, 0, (mat[8] +. mat[2]) /. s);
       Array.unsafe_set(out, 1, (mat[6] +. mat[9]) /. s);
       Array.unsafe_set(out, 2, 0.25 *. s)
     }; */
  if (trace > 0.) {
    let s = Js.Math.sqrt(trace +. 1.0) *. 2.;
    ((mat[6] -. mat[9]) /. s, (mat[8] -. mat[2]) /. s, (mat[1] -. mat[4]) /. s, 0.25 *. s)
  } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
    let s = Js.Math.sqrt(1.0 +. mat[0] -. mat[5] -. mat[10]) *. 2.;
    (0.25 *. s, (mat[1] +. mat[4]) /. s, (mat[8] +. mat[2]) /. s, (mat[6] -. mat[9]) /. s)
  } else if (mat[5] > mat[10]) {
    let s = Js.Math.sqrt(1.0 +. mat[5] -. mat[0] -. mat[10]) *. 2.;
    ((mat[1] +. mat[4]) /. s, 0.25 *. s, (mat[6] +. mat[9]) /. s, (mat[8] -. mat[2]) /. s)
  } else {
    let s = Js.Math.sqrt(1.0 +. mat[10] -. mat[0] -. mat[5]) *. 2.;
    ((mat[8] +. mat[2]) /. s, (mat[6] +. mat[9]) /. s, 0.25 *. s, (mat[1] -. mat[4]) /. s)
  }
};

let _convertToTransforms = ({nodes}: GLTFType.gltf) : array(WDType.transform) =>
  nodes
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (arr, {matrix, translation, rotation, scale}: GLTFType.node) =>
           switch matrix {
           | None =>
             arr
             |> ArrayService.push(
                  {
                    translation:
                      switch translation {
                      | None => None
                      | Some(translation) => Some(translation |> arrayFloat3ToTuple)
                      },
                    rotation:
                      switch rotation {
                      | None => None
                      | Some(rotation) => Some(rotation |> arrayFloat4ToTuple)
                      },
                    scale:
                      switch scale {
                      | None => None
                      | Some(scale) => Some(scale |> arrayFloat3ToTuple)
                      }
                  }: WDType.transform
                )
           | Some(matrix) =>
             arr
             |> ArrayService.push(
                  {
                    translation: Some(_getTranslationTuple(matrix)),
                    rotation: Some(_getRotationTuple(matrix)),
                    scale: Some(_getScaleTuple(matrix))
                  }: WDType.transform
                )
           }
       ),
       [||]
     );

let _convertToBasicCameraViews = ({cameras}: GLTFType.gltf) : WDType.basicCameraViews => {
  count:
    switch cameras {
    | None => 0
    | Some(cameras) => cameras |> Js.Array.length
    }
};

let _convertToPerspectiveCameraProjections = ({cameras}: GLTFType.gltf) =>
  switch cameras {
  | None => [||]
  | Some(cameras) =>
    cameras
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (arr, {type_, perspective}: GLTFType.camera) =>
             switch type_ {
             | "perspective" =>
               let {aspectRatio, yfov, zfar, znear}: GLTFType.perspective =
                 perspective |> OptionService.unsafeGet;
               arr
               |> ArrayService.push
                    /* near: Some(znear),
                       far: switch(zfar){
                       | None =>
                       /* TODO how to use infinite projection matrix? */
                       Some(10000)
                       | Some(zfar) => Some(zfar)
                       },
                       fovy: Some(yfov),
                       aspect: aspectRatio */
                    (
                      {near: znear, far: zfar, fovy: yfov, aspect: aspectRatio}: WDType.perspectiveCameraProjection
                    )
             | _ => arr
             }
         ),
         [||]
       )
  };

let _convertToLightMaterials = ({materials}: GLTFType.gltf) : array(WDType.lightMaterial) =>
  materials
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (arr, {pbrMetallicRoughness}: GLTFType.material) =>
           switch pbrMetallicRoughness {
           | None => arr
           | Some(pbrMetallicRoughness) =>
             let {
               baseColorFactor,
               /* baseColorTexture: option(textureIndex), */
               metallicFactor,
               roughnessFactor
               /* metallicRoughnessTexture: option(textureIndex) */
             }: GLTFType.pbrMetallicRoughness = pbrMetallicRoughness;
             arr
             |> ArrayService.push(
                  {
                    diffuseColor: baseColorFactor
                    /* specularColor: metallicFactor,
                       shininess: roughnessFactor */
                  }: WDType.lightMaterial
                )
           }
       ),
       [||]
     );

let _convertToGeometry = ({primitives}: GLTFType.mesh) : option(WDType.customGeometry) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            /* TODO test */
            test(
              Log.buildAssertMessage(~expect={j|not has texCoord_1|j}, ~actual={j|has|j}),
              () => {
                let {attributes, indices}: GLTFType.primitive = _getPrimitiveData(primitives);
                attributes.texCoord_1 |> assertNotExist
              }
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  primitives |> Js.Array.length > 1 ?
    None :
    {
      let {attributes, indices}: GLTFType.primitive = _getPrimitiveData(primitives);
      let {position, normal, texCoord_0}: GLTFType.attributes = attributes;
      Some({position, normal, texCoord: texCoord_0, index: indices |> OptionService.unsafeGet})
    }
};

let _convertToGeometrys = ({meshes}: GLTFType.gltf) =>
  meshes
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs] ((arr, mesh) => arr |> ArrayService.push(_convertToGeometry(mesh))),
       [||]
     );

let _convertToSamplers = ({samplers}: GLTFType.gltf) : array(WDType.sampler) =>
  switch samplers {
  | None => [||]
  | Some(samplers) =>
    samplers
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (arr, {magFilter, minFilter, wrapS, wrapT}: GLTFType.sampler) =>
             arr
             |> ArrayService.push(
                  {
                    magFilter:
                      switch magFilter {
                      | None => WDType.LINEAR
                      | Some(magFilter) =>
                        switch magFilter {
                        | 9728 => WDType.NEAREST
                        | 9729 => WDType.LINEAR
                        | magFilter =>
                          WonderLog.Log.fatal(
                            WonderLog.Log.buildFatalMessage(
                              ~title="_convertToSamplers",
                              ~description={j|unknown magFilter: $magFilter|j},
                              ~reason="",
                              ~solution={j||j},
                              ~params={j||j}
                            )
                          )
                        }
                      },
                    minFilter:
                      switch minFilter {
                      | None => WDType.NEAREST
                      | Some(minFilter) =>
                        switch minFilter {
                        | 9728 => WDType.NEAREST
                        | 9729 => WDType.LINEAR
                        | 9984 => WDType.NEAREST_MIPMAP_NEAREST
                        | 9985 => WDType.LINEAR_MIPMAP_NEAREST
                        | 9986 => WDType.NEAREST_MIPMAP_LINEAR
                        | 9987 => WDType.LINEAR_MIPMAP_LINEAR
                        | minFilter =>
                          WonderLog.Log.fatal(
                            WonderLog.Log.buildFatalMessage(
                              ~title="_convertToSamplers",
                              ~description={j|unknown minFilter: $minFilter|j},
                              ~reason="",
                              ~solution={j||j},
                              ~params={j||j}
                            )
                          )
                        }
                      },
                    wrapS:
                      switch wrapS {
                      | None => WDType.CLAMP_TO_EDGE
                      | Some(wrapS) =>
                        switch wrapS {
                        | 33071 => WDType.CLAMP_TO_EDGE
                        | 33648 => WDType.MIRRORED_REPEAT
                        | 10497 => WDType.REPEAT
                        | wrapS =>
                          WonderLog.Log.fatal(
                            WonderLog.Log.buildFatalMessage(
                              ~title="_convertToSamplers",
                              ~description={j|unknown wrapS: $wrapS|j},
                              ~reason="",
                              ~solution={j||j},
                              ~params={j||j}
                            )
                          )
                        }
                      },
                    wrapT:
                      switch wrapT {
                      | None => WDType.CLAMP_TO_EDGE
                      | Some(wrapT) =>
                        switch wrapT {
                        | 33071 => WDType.CLAMP_TO_EDGE
                        | 33648 => WDType.MIRRORED_REPEAT
                        | 10497 => WDType.REPEAT
                        | wrapT =>
                          WonderLog.Log.fatal(
                            WonderLog.Log.buildFatalMessage(
                              ~title="_convertToSamplers",
                              ~description={j|unknown wrapT: $wrapT|j},
                              ~reason="",
                              ~solution={j||j},
                              ~params={j||j}
                            )
                          )
                        }
                      }
                  }: WDType.sampler
                )
         ),
         [||]
       )
  };

let _convertToImages = ({images}: GLTFType.gltf) : array(WDType.image) =>
  switch images {
  | None => [||]
  | Some(images) =>
    images
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (arr, {uri}: GLTFType.image) =>
             switch uri {
             | None =>
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="_convertToImages",
                   ~description={j|uri should exist|j},
                   ~reason="",
                   ~solution={j||j},
                   ~params={j||j}
                 )
               )
             | Some(uri) => arr |> ArrayService.push({uri: uri}: WDType.image)
             }
         ),
         [||]
       )
  };

let _convertToAccessors = ({accessors}: GLTFType.gltf) : array(WDType.accessor) =>
  accessors
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (arr, {bufferView, byteOffset, count, componentType, type_}: GLTFType.accessor) =>
           arr
           |> ArrayService.push(
                {
                  bufferView:
                    switch bufferView {
                    | None =>
                      WonderLog.Log.fatal(
                        WonderLog.Log.buildFatalMessage(
                          ~title="_convertToAccessors",
                          ~description={j|bufferView should exist|j},
                          ~reason="",
                          ~solution={j||j},
                          ~params={j||j}
                        )
                      )
                    | Some(bufferView) => bufferView
                    },
                  byteOffset:
                    switch byteOffset {
                    | None => 0
                    | Some(byteOffset) => byteOffset
                    },
                  count,
                  componentType:
                    switch componentType {
                    | 5120 => WDType.BYTE
                    | 5121 => WDType.UNSIGNED_BYTE
                    | 5122 => WDType.SHORT
                    | 5123 => WDType.UNSIGNED_SHORT
                    | 5125 => WDType.UNSIGNED_INT
                    | 5126 => WDType.FLOAT
                    | componentType =>
                      WonderLog.Log.fatal(
                        WonderLog.Log.buildFatalMessage(
                          ~title="_convertToAccessors",
                          ~description={j|unknown componentType: $componentType|j},
                          ~reason="",
                          ~solution={j||j},
                          ~params={j||j}
                        )
                      )
                    },
                  type_:
                    switch type_ {
                    | "SCALAR" => WDType.SCALAR
                    | "VEC2" => WDType.VEC2
                    | "VEC3" => WDType.VEC3
                    | "VEC4" => WDType.VEC4
                    | "MAT2" => WDType.MAT2
                    | "MAT3" => WDType.MAT3
                    | "MAT4" => WDType.MAT4
                    | type_ =>
                      WonderLog.Log.fatal(
                        WonderLog.Log.buildFatalMessage(
                          ~title="_convertToAccessors",
                          ~description={j|unknown type_:$type_|j},
                          ~reason="",
                          ~solution={j||j},
                          ~params={j||j}
                        )
                      )
                    }
                }: WDType.accessor
              )
       ),
       [||]
     );

let _convertToBufferViews = ({bufferViews}: GLTFType.gltf) : array(WDType.bufferView) =>
  bufferViews
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (arr, {buffer, byteOffset, byteLength, byteStride}: GLTFType.bufferView) =>
           arr
           |> ArrayService.push(
                {
                  buffer,
                  byteOffset:
                    switch byteOffset {
                    | None => 0
                    | Some(byteOffset) => byteOffset
                    },
                  byteLength,
                  byteStride
                  /* target:
                     switch (target |> OptionService.unsafeGet) {
                     | 34962 => WDType.ARRAY_BUFFER
                     | 34963 => WDType.ELEMENT_ARRAY_BUFFER
                     | target =>
                       WonderLog.Log.fatal(
                         WonderLog.Log.buildFatalMessage(
                           ~title="_convertToBufferViews",
                           ~description={j|unknown target: $target|j},
                           ~reason="",
                           ~solution={j||j},
                           ~params={j||j}
                         )
                       )
                     } */
                }: WDType.bufferView
              )
       ),
       [||]
     );

let _convertToBuffers = ({buffers}: GLTFType.gltf) : array(WDType.buffer) =>
  buffers
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (arr, {uri, byteLength}: GLTFType.buffer) =>
           switch uri {
           | None =>
             WonderLog.Log.fatal(
               WonderLog.Log.buildFatalMessage(
                 ~title="_convertToBuffers",
                 ~description={j|uri should exist|j},
                 ~reason="",
                 ~solution={j||j},
                 ~params={j||j}
               )
             )
           | Some(uri) => arr |> ArrayService.push({uri, byteLength}: WDType.buffer)
           }
       ),
       [||]
     );

/* TODO refactor */
let _convertMultiPrimitivesToNodes = ({nodes, meshes} as gltf: GLTFType.gltf) : GLTFType.gltf => {
  let meshesLen = meshes |> Js.Array.length;
  let (multiPrimitivesMeshMap, newMeshIndex) =
    meshes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           ((multiPrimitivesMeshMap, newMeshIndex), {primitives}: GLTFType.mesh, meshIndex) =>
             switch (primitives |> Js.Array.length) {
             | 0
             | 1 => (multiPrimitivesMeshMap, newMeshIndex)
             | primitivesLen =>
               let newMeshDataArr =
                 primitives
                 |> WonderCommonlib.ArrayService.reduceOneParami(
                      [@bs]
                      (
                        (newMeshDataArr, primitive, primitiveIndex) =>
                          newMeshDataArr
                          |> ArrayService.push((
                               {primitives: [|primitive|]}: GLTFType.mesh,
                               newMeshIndex + primitiveIndex
                             ))
                      ),
                      [||]
                    );
               (
                 multiPrimitivesMeshMap
                 |> WonderCommonlib.SparseMapService.set(meshIndex, newMeshDataArr),
                 newMeshIndex + (newMeshDataArr |> Js.Array.length)
               )
             }
         ),
         (WonderCommonlib.SparseMapService.createEmpty(), meshesLen)
       );
  let newMeshes =
    multiPrimitivesMeshMap
    |> SparseMapService.reduceiValid(
         [@bs]
         (
           (newMeshes, newMeshDataArr, _) =>
             newMeshes
             |> Js.Array.concat(newMeshDataArr |> Js.Array.map(((newMesh, _)) => newMesh))
         ),
         meshes |> Js.Array.copy
       );
  let (newNodes, newNodesOfMultiPrimitives, newNodeIndex) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           ((newNodes, newNodesOfMultiPrimitives, newNodeIndex), {mesh} as node: GLTFType.node) =>
             switch mesh {
             | None => (
                 newNodes |> ArrayService.push(node),
                 newNodesOfMultiPrimitives,
                 newNodeIndex
               )
             | Some(mesh) =>
               switch (multiPrimitivesMeshMap |> WonderCommonlib.SparseMapService.get(mesh)) {
               | None => (
                   newNodes |> ArrayService.push(node),
                   newNodesOfMultiPrimitives,
                   newNodeIndex
                 )
               | Some(newMeshDataArr) =>
                 let newNodesOfMultiPrimitives =
                   newMeshDataArr
                   |> WonderCommonlib.ArrayService.reduceOneParam(
                        [@bs]
                        (
                          (newNodesOfMultiPrimitives, (_, meshIndex)) =>
                            newNodesOfMultiPrimitives
                            |> ArrayService.push({...node, children: None, mesh: Some(meshIndex)})
                        ),
                        newNodesOfMultiPrimitives
                      );
                 let newChildren =
                   ArrayService.range(
                     newNodeIndex,
                     newNodeIndex + (newMeshDataArr |> Js.Array.length) - 1
                   );
                 (
                   newNodes
                   |> ArrayService.push({
                        ...node,
                        mesh: None,
                        children:
                          switch node.children {
                          | None => Some(newChildren)
                          | Some(children) => Some(children |> Js.Array.concat(newChildren))
                          }
                      }),
                   newNodesOfMultiPrimitives,
                   newNodeIndex + (newMeshDataArr |> Js.Array.length)
                 )
               }
             }
         ),
         ([||], [||], nodes |> Js.Array.length)
       );
  let newNodes = newNodes |> Js.Array.concat(newNodesOfMultiPrimitives);
  {...gltf, nodes: newNodes, meshes: newMeshes}
};

let _convertGLTFToWD = (gltf: GLTFType.gltf) : WDType.wd => {
  let ({asset, scenes, scene, nodes}: GLTFType.gltf) as gltf =
    _convertMultiPrimitivesToNodes(gltf);
  {
    asset: {version: asset.version, generator: "GLTF2WD"},
    scene: _convertToScene(gltf),
    gameObjects: {count: _getCount(nodes)},
    indices: _convertToIndices(gltf),
    transforms: _convertToTransforms(gltf),
    basicCameraViews: _convertToBasicCameraViews(gltf),
    perspectiveCameraProjections: _convertToPerspectiveCameraProjections(gltf),
    lightMaterials: _convertToLightMaterials(gltf),
    customGeometrys: _convertToGeometrys(gltf),
    basicSourceTextures: {count: _getCount(nodes)},
    samplers: _convertToSamplers(gltf),
    images: _convertToImages(gltf),
    accessors: _convertToAccessors(gltf),
    bufferViews: _convertToBufferViews(gltf),
    buffers: _convertToBuffers(gltf)
  }
};

let convert = (gltfFileContent: string) => {
  let gltf = _convertGLTFJsonToRecord(gltfFileContent |> Js.Json.parseExn);
  _buildImageArray(gltf)
  |> Most.map((imageArr) => (_convertGLTFToWD(gltf), imageArr, _buildBufferArray(gltf)))
};