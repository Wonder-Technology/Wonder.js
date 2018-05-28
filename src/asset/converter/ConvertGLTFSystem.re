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
                   byteStride: json |> optional(field("byteStride", int)),
                   target: json |> optional(field("target", int))
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
                              baseColorTexture: json |> optional(field("baseColorTexture", int)),
                              metallicFactor: json |> optional(field("metallicFactor", float)),
                              roughnessFactor: json |> optional(field("roughnessFactor", float)),
                              metallicRoughnessTexture:
                                json |> optional(field("metallicRoughnessTexture", int))
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

let _buildBufferArray = (gltfFilePath, {buffers}: GLTFType.gltf) =>
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

let _convertToTransformGameObjectIndices = (nodes) =>
  nodes
  |> WonderCommonlib.ArrayService.reduceOneParami(
       [@bs]
       (
         /* (arr, {matrix, translation, rotation, scale}) =>
            matrix |> Js.Option.isSome || translation |> Js.Option.isSome || rotation |> Js.Option.isSome || scale |> Js.Option.isSome  */
         (arr, _, index) =>
           arr |> ArrayService.push(index)
       ),
       [||]
     )
  |> WonderLog.Contract.ensureCheck(
       (transformGameObjectIndices) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|every node should has one transform component|j},
                   ~actual={j|not|j}
                 ),
                 () => transformGameObjectIndices |> Js.Array.length == (nodes |> Js.Array.length)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let _convertToChildrenTransformIndices = (transformGameObjectIndices, nodes) => {
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
              () => transformGameObjectIndices |> Js.Array.length == (nodes |> Js.Array.length)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  /* nodes |> Js.Array.map(({children}: GLTFType.node) => children) */
  nodes
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs] ((arr, {children}: GLTFType.node) => arr |> ArrayService.push(children)),
       [||]
     )
};

let _getCount = (arrs) => arrs |> Js.Array.length;

/*
 let _convertToBasicCameraViewGameObjectIndices = (nodes) =>
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
let _checkEveryComponentShouldHasGameObject = (nodes, componentGameObjectIndices) =>
  componentGameObjectIndices
  |> WonderLog.Contract.ensureCheck(
       (componentGameObjectIndices) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|every component should has gameObject|j},
                   ~actual={j|not|j}
                 ),
                 () =>
                   componentGameObjectIndices
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

let _convertToBasicCameraViewGameObjectIndices = (nodes, cameras) =>
  switch cameras {
  | None => [||]
  | Some(cameras) =>
    let (arr, _) =
      nodes
      |> WonderCommonlib.ArrayService.reduceOneParami(
           [@bs]
           (
             ((arr, basicCameraViewIndex), {camera}: GLTFType.node, index) =>
               switch camera {
               | None => (arr, basicCameraViewIndex)
               | Some(camera) =>
                 /* let {type_} : GLTFType.camera = Array.unsafe_get(cameras, camera);
                    switch type_ {
                    | "perspective" =>
                      Array.unsafe_set(arr, basicCameraViewIndex, index);

                      (arr, basicCameraViewIndex |> succ)
                    } */
                 Array.unsafe_set(arr, basicCameraViewIndex, index);
                 (arr, basicCameraViewIndex |> succ)
               }
           ),
           ([||], 0)
         );
    arr |> _checkEveryComponentShouldHasGameObject(nodes)
  };

let _convertToPerspectiveCameraProjectionGameObjectIndices = (nodes, cameras) =>
  switch cameras {
  | None => [||]
  | Some(cameras) =>
    let (arr, _) =
      nodes
      |> WonderCommonlib.ArrayService.reduceOneParami(
           [@bs]
           (
             ((arr, perspectiveCameraProjectionIndex), {camera}: GLTFType.node, index) =>
               switch camera {
               | None => (arr, perspectiveCameraProjectionIndex)
               | Some(camera) =>
                 let {type_}: GLTFType.camera = Array.unsafe_get(cameras, camera);
                 switch type_ {
                 | "perspective" =>
                   Array.unsafe_set(arr, perspectiveCameraProjectionIndex, index);
                   (arr, perspectiveCameraProjectionIndex |> succ)
                 }
               }
           ),
           ([||], 0)
         );
    arr |> _checkEveryComponentShouldHasGameObject(nodes)
  };

let _getPrimitiveData = (primitives) => {
  WonderLog.Contract.requireCheck(
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
  );
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
     )
};

let _convertToLightMaterialGameObjectIndices = (nodes, meshes, materials) =>
  nodes
  |> WonderCommonlib.ArrayService.reduceOneParami(
       [@bs]
       (
         (arr, {mesh}: GLTFType.node, index) =>
           switch mesh {
           | None => arr
           | Some(mesh) =>
             let {primitives}: GLTFType.mesh = Array.unsafe_get(meshes, mesh);
             let {material}: GLTFType.primitive = _getPrimitiveData(primitives);
             switch material {
             | None => arr
             | Some(material) =>
               Array.unsafe_set(arr, material, index);
               arr
             }
           }
       ),
       [||]
     )
  |> _checkEveryComponentShouldHasGameObject(nodes);

let _convertToGeometryGameObjectIndices = (nodes) =>
  nodes
  |> WonderCommonlib.ArrayService.reduceOneParami(
       [@bs]
       (
         (arr, {mesh}: GLTFType.node, index) =>
           switch mesh {
           | None => arr
           | Some(mesh) =>
             Array.unsafe_set(arr, mesh, index);
             arr
           }
       ),
       [||]
     )
  |> _checkEveryComponentShouldHasGameObject(nodes);

let _convertToGameObjectIndices =
    ({nodes, meshes, cameras, materials}: GLTFType.gltf)
    : WDType.gameObjectIndices => {
  let transformGameObjectIndices = _convertToTransformGameObjectIndices(nodes);
  {
    transformGameObjectIndices,
    childrenTransformIndices: _convertToChildrenTransformIndices(transformGameObjectIndices, nodes),
    basicCameraViewGameObjectIndices: _convertToBasicCameraViewGameObjectIndices(nodes, cameras),
    perspectiveCameraProjectionGameObjectIndices:
      _convertToPerspectiveCameraProjectionGameObjectIndices(nodes, cameras),
    lightMaterialGameObjectIndices:
      _convertToLightMaterialGameObjectIndices(nodes, meshes, materials),
    geometryGameObjectIndices: _convertToGeometryGameObjectIndices(nodes)
  }
};

let _setMapMaterialIndices = (materialMap, materialIndex, mapMaterialIndices) =>
  switch materialMap {
  | None => mapMaterialIndices
  | Some(materialMap) =>
    Array.unsafe_set(mapMaterialIndices, materialMap, materialIndex);
    mapMaterialIndices
  };

/* let _convertToMaterialIndices = ({nodes, materials}: GLTFType.gltf) : WDType.materialIndices => {
     let (diffuseMapMaterialIndices, specularMapMaterialIndices) =
       materials
       |> WonderCommonlib.ArrayService.reduceOneParami(
            [@bs]
            (
              (
                (diffuseMapMaterialIndices, specularMapMaterialIndices),
                {pbrMetallicRoughness}: GLTFType.material,
                index
              ) =>
                switch pbrMetallicRoughness {
                | None => (diffuseMapMaterialIndices, specularMapMaterialIndices)
                | Some(pbrMetallicRoughness) =>
                  let {baseColorTexture, metallicRoughnessTexture}: GLTFType.pbrMetallicRoughness = pbrMetallicRoughness;
                  (
                    _setMapMaterialIndices(baseColorTexture, index, diffuseMapMaterialIndices),
                    _setMapMaterialIndices(
                      metallicRoughnessTexture,
                      index,
                      specularMapMaterialIndices
                    )
                  )
                }
            ),
            ([||], [||])
          );
     {
       diffuseMapMaterialIndices:
         diffuseMapMaterialIndices |> _checkEveryComponentShouldHasGameObject(nodes),
       specularMapMaterialIndices:
         specularMapMaterialIndices |> _checkEveryComponentShouldHasGameObject(nodes)
     }
   }; */
let _convertToMaterialIndices = ({nodes, materials}: GLTFType.gltf) : WDType.materialIndices => {
  let diffuseMapMaterialIndices =
    materials
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           (diffuseMapMaterialIndices, {pbrMetallicRoughness}: GLTFType.material, index) =>
             switch pbrMetallicRoughness {
             | None => diffuseMapMaterialIndices
             | Some(pbrMetallicRoughness) =>
               let {baseColorTexture, metallicRoughnessTexture}: GLTFType.pbrMetallicRoughness = pbrMetallicRoughness;
               _setMapMaterialIndices(baseColorTexture, index, diffuseMapMaterialIndices)
             }
         ),
         [||]
       );
  {
    diffuseMapMaterialIndices:
      diffuseMapMaterialIndices |> _checkEveryComponentShouldHasGameObject(nodes)
  }
};

let _convertToImageAndSamplerTextureIndices = ({nodes, textures}: GLTFType.gltf) =>
  switch textures {
  | None => ([||], [||])
  | Some(textures) =>
    let (imageTextureIndices, samplerTextureIndices) =
      textures
      |> WonderCommonlib.ArrayService.reduceOneParami(
           [@bs]
           (
             (
               (imageTextureIndices, samplerTextureIndices),
               {sampler, source}: GLTFType.texture,
               index
             ) => (
               switch source {
               | None => imageTextureIndices
               | Some(source) =>
                 Array.unsafe_set(imageTextureIndices, source, index);
                 imageTextureIndices
               },
               switch sampler {
               | None => samplerTextureIndices
               | Some(sampler) =>
                 Array.unsafe_set(samplerTextureIndices, sampler, index);
                 samplerTextureIndices
               }
             )
           ),
           ([||], [||])
         );
    (
      imageTextureIndices |> _checkEveryComponentShouldHasGameObject(nodes),
      samplerTextureIndices |> _checkEveryComponentShouldHasGameObject(nodes)
    )
  };

let _convertToIndices = (gltf: GLTFType.gltf) : WDType.indices => {
  let (imageTextureIndices, samplerTextureIndices) = _convertToImageAndSamplerTextureIndices(gltf);
  {
    gameObjectIndices: _convertToGameObjectIndices(gltf),
    materialIndices: _convertToMaterialIndices(gltf),
    imageTextureIndices,
    samplerTextureIndices
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
  let out = [||];
  if (trace > 0.) {
    let s = Js.Math.sqrt(trace +. 1.0) *. 2.;
    out[3] = 0.25 *. s;
    out[0] = (mat[6] -. mat[9]) /. s;
    out[1] = (mat[8] -. mat[2]) /. s;
    out[2] = (mat[1] -. mat[4]) /. s
  } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
    let s = Js.Math.sqrt(1.0 +. mat[0] -. mat[5] -. mat[10]) *. 2.;
    out[3] = (mat[6] -. mat[9]) /. s;
    out[0] = 0.25 *. s;
    out[1] = (mat[1] +. mat[4]) /. s;
    out[2] = (mat[8] +. mat[2]) /. s
  } else if (mat[5] > mat[10]) {
    let s = Js.Math.sqrt(1.0 +. mat[5] -. mat[0] -. mat[10]) *. 2.;
    out[3] = (mat[8] -. mat[2]) /. s;
    out[0] = (mat[1] +. mat[4]) /. s;
    out[1] = 0.25 *. s;
    out[2] = (mat[6] +. mat[9]) /. s
  } else {
    let s = Js.Math.sqrt(1.0 +. mat[10] -. mat[0] -. mat[5]) *. 2.;
    out[3] = (mat[1] -. mat[4]) /. s;
    out[0] = (mat[8] +. mat[2]) /. s;
    out[1] = (mat[6] +. mat[9]) /. s;
    out[2] = 0.25 *. s
  };
  out |> arrayFloat4ToTuple
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
                      | None => (0., 0., 0.)
                      | Some(translation) => translation |> arrayFloat3ToTuple
                      },
                    rotation:
                      switch rotation {
                      | None => (0., 0., 0., 1.)
                      | Some(rotation) => rotation |> arrayFloat4ToTuple
                      },
                    scale:
                      switch scale {
                      | None => (1., 1., 1.)
                      | Some(scale) => scale |> arrayFloat3ToTuple
                      }
                  }: WDType.transform
                )
           | Some(matrix) =>
             arr
             |> ArrayService.push(
                  {
                    translation: _getTranslationTuple(matrix),
                    rotation: _getRotationTuple(matrix),
                    scale: _getScaleTuple(matrix)
                  }: WDType.transform
                )
           }
       ),
       [||]
     );

let _convertToBasicCameraViews = ({cameras}: GLTFType.gltf) : WDType.basicCameraViews => {
  /* count: nodes |> Js.Array.filter(({camera}) => camera |> Js.Option.isSome) |> Js.Array.length */
  count:
    switch cameras {
    | None => 0
    | Some(cameras) => cameras |> Js.Array.length
    }
};

let _convertToPerspectiveCameraProjections = ({cameras}: GLTFType.gltf) =>
  /* switch cameras {
     | None => [||]
     | Some(cameras) =>
       nodes
       |> WonderCommonlib.ArrayService.reduceOneParam(
            [@bs]
            (
              (arr, {camera}: GLTFType.camera) =>
                switch camera {
                | None => arr
                | Some(camera) =>
                  let {type_, perspective} = Array.unsafe_get(cameras, camera);
                  switch type_ {
                  | "perspective" =>
                    let {aspectRatio, yfov, zfar, znear} = perspective |> OptionService.unsafeGet;
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
                         ({near: znear, far: zfar, fovy, aspect: aspectRatio})
                  }
                }
            ),
            [||]
          )
     }; */
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

let _convertToGeometrys = ({meshes}: GLTFType.gltf) : array(WDType.geometry) =>
  meshes
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (arr, {primitives}: GLTFType.mesh) => {
           let {attributes, indices}: GLTFType.primitive = _getPrimitiveData(primitives);
           let {position, normal, texCoord_0}: GLTFType.attributes = attributes;
           arr
           |> ArrayService.push(
                {
                  position,
                  normal,
                  texCoord: texCoord_0,
                  index: indices |> OptionService.unsafeGet
                }: WDType.geometry
              )
         }
       ),
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
         (arr, {buffer, byteOffset, byteLength, byteStride, target}: GLTFType.bufferView) =>
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
                  byteStride,
                  target:
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
                    }
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

let _convertMultiPrimitivesToNodes = ({nodes, meshes} as gltf: GLTFType.gltf) : GLTFType.gltf => {
  let (newNodes, newMeshs) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           ((newNodes, newMeshs), {mesh} as node: GLTFType.node) =>
             switch mesh {
             | None =>
               /* newNodes */
               (newNodes |> ArrayService.push(node), newMeshs)
             | Some(mesh) =>
               let primitives = Array.unsafe_get(meshes, mesh).primitives;
               switch (primitives |> Js.Array.length) {
               | 0
               | 1 => (newNodes |> ArrayService.push(node), newMeshs)
               | _ =>
                 primitives
                 |> WonderCommonlib.ArrayService.reduceOneParam(
                      [@bs]
                      (
                        ((newNodes, newMeshs), primitive) => {
                          let meshIndex = (newMeshs |> Js.Array.length) - 1;
                          (
                            newNodes |> ArrayService.push({...node, mesh: Some(meshIndex |> succ)}),
                            newMeshs
                            |> ArrayService.push({primitives: [|primitive|]}: GLTFType.mesh)
                          )
                        }
                      ),
                      (newNodes, newMeshs)
                    )
               }
             }
         ),
         ([||], meshes |> Js.Array.copy)
       );
  {...gltf, nodes: newNodes, meshes: newMeshs}
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
    geometrys: _convertToGeometrys(gltf),
    basicSourceTextures: {count: _getCount(nodes)},
    samplers: _convertToSamplers(gltf),
    images: _convertToImages(gltf),
    accessors: _convertToAccessors(gltf),
    bufferViews: _convertToBufferViews(gltf),
    buffers: _convertToBuffers(gltf)
  }
};

let convert = (gltfFileContent: string) => {
  /* result: imageMap(path, image), bufferMap(path, arraybuffer), .wd record */
  /* FetchCommon.createFetchJsonStream(gltfFilePath, _fetch)
     |> Most.map((json) => _convertGLTFJsonToRecord(json))
     |> Most.flatMap(
          (gltf) =>
            /* Most.from([|_convertGLTFToWD(gltf), _loadImages(gltf), _loadBuffers(gltf)|]) */
            [|
              _convertGLTFToWD(gltf),
              _loadImages(gltfFilePath, gltf),
              _loadBuffers(gltfFilePath, gltf)
            |]
            |> Most.mergeArray
            |> Most.reduce((arr, result) => arr |> ArrayService.push(result), [||])
        )
     |> Most.map((arr) => (arr[0], arr[1], arr[2])); */
  /* FetchCommon.createFetchJsonStream(gltfFilePath, _fetch)
     |> Most.map((json) => _convertGLTFJsonToRecord(json))
     |> Most.flatMap(
          (gltf) =>
            /* Most.from([|_convertGLTFToWD(gltf), _loadImages(gltf), _loadBuffers(gltf)|]) */
            [|
              _convertGLTFToWD(gltf),
              _loadImages(gltfFilePath, gltf),
              _loadBuffers(gltfFilePath, gltf)
            |]
            |> Most.mergeArray
            |> Most.reduce((arr, result) => arr |> ArrayService.push(result), [||])
        )
     |> Most.map((arr) => (arr[0], arr[1], arr[2])); */
  let gltf = _convertGLTFJsonToRecord(gltfFileContent |> Js.Json.parseExn);
  _buildImageArray(gltf)
  |> Most.map((imageArr) => (_convertGLTFToWD(gltf), imageArr, _buildBufferArray(gltf)))
};