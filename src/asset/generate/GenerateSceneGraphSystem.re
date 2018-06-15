open Json;

open Encode;

open StateDataMainType;

open GenerateSceneGraphType;

/* TODO duplicate */
let _getChildren = (parent, transformRecord) =>
  HierachyTransformService.unsafeGetChildren(parent, transformRecord);

let _hasMap = (gameObject, {gameObjectRecord} as state) =>
  switch (
    GetComponentGameObjectService.getLightMaterialComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => false
  | Some(lightMaterial) =>
    OperateLightMaterialMainService.hasDiffuseMap(lightMaterial, state)
    || OperateLightMaterialMainService.hasSpecularMap(lightMaterial, state)
  };

let _getAllNodeData = (sceneGameObject, state) => {
  let boxGeometryType = CurrentComponentDataMapService.getBoxGeometryType();
  let customGeometryType =
    CurrentComponentDataMapService.getCustomGeometryType();

  let rec _getNodeData =
          (
            state,
            (nodeIndex, meshIndex, materialIndex, cameraIndex),
            (
              (boxGeometryDataMap, customGeometryDataMap),
              lightMaterialDataMap,
            ),
            (
              meshPointDataMap,
              meshMaterialMap,
              materialDataMap,
              cameraDataMap,
            ),
            (transformArr, nodeDataArr),
          ) =>
    transformArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (
             {gameObjectRecord} as state,
             (nodeIndex, meshIndex, materialIndex, cameraIndex),
             (
               (boxGeometryDataMap, customGeometryDataMap),
               lightMaterialDataMap,
             ),
             (
               meshPointDataMap,
               meshMaterialMap,
               materialDataMap,
               cameraDataMap,
             ),
             nodeDataArr,
           ),
           transform,
         ) => {
           let (
             {
               defaultLocalPosition,
               defaultLocalRotation,
               defaultLocalScale,
               localPositions,
               localRotations,
               localScales,
             } as transformRecord
           ): TransformType.transformRecord =
             RecordTransformMainService.getRecord(state);

           let gameObject =
             GameObjectTransformService.unsafeGetGameObject(
               transform,
               transformRecord,
             );

           let childrenTransformArr =
             _getChildren(transform, transformRecord);

           let childrenGameObjectArr =
             childrenTransformArr
             |> Js.Array.map(transform =>
                  GameObjectTransformService.unsafeGetGameObject(
                    transform,
                    transformRecord,
                  )
                );

           let (
             meshIndex,
             pointData,
             newMeshIndex,
             (boxGeometryDataMap, customGeometryDataMap),
           ) =
             switch (
               GetComponentGameObjectService.getGeometryComponentData(.
                 gameObject,
                 gameObjectRecord,
               )
             ) {
             | None => (
                 None,
                 None,
                 meshIndex,
                 (boxGeometryDataMap, customGeometryDataMap),
               )

             | Some((geometry, type_)) =>
               switch (type_) {
               | type_ when type_ === boxGeometryType =>
                 switch (
                   boxGeometryDataMap
                   |> WonderCommonlib.SparseMapService.get(geometry)
                 ) {
                 | Some((existedMeshIndex, pointData)) => (
                     Some(existedMeshIndex),
                     pointData,
                     meshIndex,
                     (boxGeometryDataMap, customGeometryDataMap),
                   )

                 | None =>
                   let pointData =
                     Some((
                       GetBoxGeometryVerticesMainService.getVertices(. state),
                       GetBoxGeometryNormalsMainService.getNormals(. state),
                       _hasMap(gameObject, state) ?
                         Some(
                           GetBoxGeometryTexCoordsMainService.getTexCoords(.
                             state,
                           ),
                         ) :
                         None,
                       GetBoxGeometryIndicesMainService.getIndices(. state),
                     ));

                   (
                     Some(meshIndex),
                     pointData,
                     meshIndex |> succ,
                     (
                       boxGeometryDataMap
                       |> WonderCommonlib.SparseMapService.set(
                            geometry,
                            (meshIndex, pointData),
                          ),
                       customGeometryDataMap,
                     ),
                   );
                 }

               | type_ when type_ === customGeometryType =>
                 switch (
                   customGeometryDataMap
                   |> WonderCommonlib.SparseMapService.get(geometry)
                 ) {
                 | Some((existedMeshIndex, pointData)) => (
                     Some(existedMeshIndex),
                     pointData,
                     meshIndex,
                     (boxGeometryDataMap, customGeometryDataMap),
                   )

                 | None =>
                   let pointData =
                     Some((
                       VerticesCustomGeometryMainService.getVertices(.
                         geometry,
                         state,
                       ),
                       NormalsCustomGeometryMainService.getNormals(.
                         geometry,
                         state,
                       ),
                       _hasMap(gameObject, state) ?
                         Some(
                           TexCoordsCustomGeometryMainService.getTexCoords(.
                             geometry,
                             state,
                           ),
                         ) :
                         None,
                       IndicesCustomGeometryMainService.getIndices(.
                         geometry,
                         state,
                       ),
                     ));

                   (
                     Some(meshIndex),
                     pointData,
                     meshIndex |> succ,
                     (
                       boxGeometryDataMap,
                       customGeometryDataMap
                       |> WonderCommonlib.SparseMapService.set(
                            geometry,
                            (meshIndex, pointData),
                          ),
                     ),
                   );
                 }
               | _ =>
                 WonderLog.Log.fatal(
                   WonderLog.Log.buildFatalMessage(
                     ~title="unknown type_",
                     ~description={j||j},
                     ~reason="",
                     ~solution={j||j},
                     ~params={j|type_: $type_|j},
                   ),
                 )
               }
             };

           let meshPointDataMap =
             switch (meshIndex) {
             | None => meshPointDataMap
             | Some(meshIndex) =>
               meshPointDataMap
               |> WonderCommonlib.SparseMapService.set(
                    meshIndex,
                    pointData |> OptionService.unsafeGet,
                  )
             };

           let (
             materialIndex,
             materialData,
             newMaterialIndex,
             lightMaterialDataMap,
             meshMaterialMap,
           ) =
             switch (
               GetComponentGameObjectService.getLightMaterialComponent(.
                 gameObject,
                 gameObjectRecord,
               )
             ) {
             | None => (
                 None,
                 None,
                 materialIndex,
                 lightMaterialDataMap,
                 meshMaterialMap,
               )

             | Some(lightMaterial) =>
               switch (
                 lightMaterialDataMap
                 |> WonderCommonlib.SparseMapService.get(lightMaterial)
               ) {
               | Some((existedMaterialIndex, materialData)) => (
                   Some(existedMaterialIndex),
                   materialData,
                   materialIndex,
                   lightMaterialDataMap,
                   meshMaterialMap,
                 )

               | None =>
                 let materialData =
                   Some((
                     lightMaterial,
                     NameLightMaterialMainService.getName(
                       lightMaterial,
                       state,
                     ),
                   ));

                 (
                   Some(materialIndex),
                   materialData,
                   materialIndex |> succ,
                   lightMaterialDataMap
                   |> WonderCommonlib.SparseMapService.set(
                        lightMaterial,
                        (materialIndex, materialData),
                      ),
                   switch (meshIndex) {
                   | None => meshMaterialMap
                   | Some(meshIndex) =>
                     meshMaterialMap
                     |> WonderCommonlib.SparseMapService.set(
                          meshIndex,
                          materialIndex,
                        )
                   },
                 );
               }
             };

           let materialDataMap =
             switch (materialIndex) {
             | None => materialDataMap
             | Some(materialIndex) =>
               materialDataMap
               |> WonderCommonlib.SparseMapService.set(
                    materialIndex,
                    materialData,
                  )
             };

           /* TODO support ortho camera */
           let (cameraIndex, cameraData, newCameraIndex) =
             switch (
               GetComponentGameObjectService.getPerspectiveCameraProjectionComponent(.
                 gameObject,
                 gameObjectRecord,
               )
             ) {
             | None => (None, None, cameraIndex)

             | Some(perspectiveCamera) =>
               let cameraData = Some(perspectiveCamera);

               (Some(cameraIndex), cameraData, cameraIndex |> succ);
             };

           let cameraDataMap =
             switch (cameraIndex) {
             | None => cameraDataMap
             | Some(cameraIndex) =>
               cameraDataMap
               |> WonderCommonlib.SparseMapService.set(
                    cameraIndex,
                    cameraData,
                  )
             };

           nodeDataArr
           |> ArrayService.push(
                {
                  gameObject,
                  children:
                    switch (childrenGameObjectArr |> Js.Array.length) {
                    | 0 => None
                    | length =>
                      ArrayService.range(
                        nodeIndex + 1,
                        nodeIndex + 1 + length - 1,
                      )
                      |. Some
                    },
                  translation:
                    switch (
                      ModelMatrixTransformService.getLocalPositionTuple(
                        transform,
                        localPositions,
                      )
                    ) {
                    | (x, y, z)
                        when
                          x === defaultLocalPosition[0]
                          && y === defaultLocalPosition[1]
                          && z === defaultLocalPosition[2] =>
                      None
                    | localPosition => Some(localPosition)
                    },
                  rotation:
                    switch (
                      ModelMatrixTransformService.getLocalRotationTuple(
                        transform,
                        localRotations,
                      )
                    ) {
                    | (x, y, z, w)
                        when
                          x === defaultLocalRotation[0]
                          && y === defaultLocalRotation[1]
                          && z === defaultLocalRotation[2]
                          && w === defaultLocalRotation[3] =>
                      None
                    | localRotation => Some(localRotation)
                    },
                  scale:
                    switch (
                      ModelMatrixTransformService.getLocalScaleTuple(
                        transform,
                        localScales,
                      )
                    ) {
                    | (x, y, z)
                        when
                          x === defaultLocalScale[0]
                          && y === defaultLocalScale[1]
                          && z === defaultLocalScale[2] =>
                      None
                    | localScale => Some(localScale)
                    },
                  mesh: meshIndex,
                  camera: cameraIndex,
                }: nodeData,
              );

           let newNodeIndex =
             nodeIndex + (childrenGameObjectArr |> Js.Array.length);

           _getNodeData(
             state,
             (newNodeIndex, newMeshIndex, newMaterialIndex, newCameraIndex),
             (
               (boxGeometryDataMap, customGeometryDataMap),
               lightMaterialDataMap,
             ),
             (
               meshPointDataMap,
               meshMaterialMap,
               materialDataMap,
               cameraDataMap,
             ),
             (childrenTransformArr, nodeDataArr),
           );
         },
         (
           state,
           (nodeIndex, meshIndex, materialIndex, cameraIndex),
           (
             (boxGeometryDataMap, customGeometryDataMap),
             lightMaterialDataMap,
           ),
           (
             meshPointDataMap,
             meshMaterialMap,
             materialDataMap,
             cameraDataMap,
           ),
           nodeDataArr,
         ),
       );

  let (
    state,
    (nodeIndex, meshIndex, materialIndex, cameraIndex),
    ((boxGeometryDataMap, customGeometryDataMap), lightMaterialDataMap),
    (meshPointDataMap, meshMaterialMap, materialDataMap, cameraDataMap),
    nodeDataArr,
  ) =
    _getNodeData(
      state,
      (0, 0, 0, 0),
      (
        (
          WonderCommonlib.SparseMapService.createEmpty(),
          WonderCommonlib.SparseMapService.createEmpty(),
        ),
        WonderCommonlib.SparseMapService.createEmpty(),
      ),
      (
        WonderCommonlib.SparseMapService.createEmpty(),
        WonderCommonlib.SparseMapService.createEmpty(),
        WonderCommonlib.SparseMapService.createEmpty(),
        WonderCommonlib.SparseMapService.createEmpty(),
      ),
      (
        [|
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            sceneGameObject,
            state,
          ),
        |],
        [||],
      ),
    );
  (
    state,
    (meshPointDataMap, meshMaterialMap, materialDataMap, cameraDataMap),
    nodeDataArr,
  );
};

let _checkShouldHasNoSlot = map =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(
            ~expect={j|map has no slot|j},
            ~actual={j|not|j},
          ),
          () =>
          map
          |> SparseMapService.getValidValues
          |> SparseMapService.length == (map |> SparseMapService.length)
        )
      )
    )
  );

let _addBufferViewData =
    (
      (pointsLength, pointsCount, bytes_per_element, pointType),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
    ) =>
  switch (pointsLength) {
  | 0 => ((-1), accessorDataArr, bufferViewDataArr, bufferViewOffset)
  | _ =>
    let bufferViewByteLength = pointsLength * bytes_per_element;

    (
      accessorDataArr |> Js.Array.length,
      accessorDataArr
      |> ArrayService.push({
           bufferView: bufferViewDataArr |> Js.Array.length,
           /* byteOffset:  0, */
           count: pointsCount,
           componentType:
             switch (pointType) {
             | VERTEX
             | NORMAL
             | TEXCOORD => 5126
             | INDEX => 5123
             },
           type_:
             switch (pointType) {
             | VERTEX
             | NORMAL => "VEC3"
             | TEXCOORD => "VEC2"
             | INDEX => "SCALAR"
             },
         }),
      bufferViewDataArr
      |> ArrayService.push({
           buffer: 0,
           byteOffset: bufferViewOffset,
           byteLength: bufferViewByteLength,
         }),
      bufferViewOffset + bufferViewByteLength,
    );
  };

let _buildGeometryData = (meshPointDataMap, meshMaterialMap) => {
  open Js.Typed_array;

  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkShouldHasNoSlot(meshPointDataMap)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let verticesSize = 3;
  let normalsSize = 3;
  let texCoordsSize = 2;
  let indicesSize = 1;

  let (
    (totalByteLength, bufferViewOffset),
    (bufferViewDataArr, accessorDataArr, meshDataArr),
  ) =
    meshPointDataMap
    |> SparseMapService.reduceiValid(
         (.
           (
             (totalByteLength, bufferViewOffset),
             (bufferViewDataArr, accessorDataArr, meshDataArr),
           ),
           (vertices, normals, texCoords, indices),
           meshIndex,
         ) => {
           let verticesLength = vertices |> Float32Array.length;
           let normalsLength = normals |> Float32Array.length;
           let texCoordsLength =
             switch (texCoords) {
             | None => 0
             | Some(texCoords) => texCoords |> Float32Array.length
             };
           let indicesLength = indices |> Uint16Array.length;

           let verticesCount = verticesLength / verticesSize;
           let normalsCount = normalsLength / normalsSize;
           let texCoordsCount = texCoordsLength / texCoordsSize;
           let indicesCount = indicesLength / indicesSize;

           let (
             vertexIndex,
             accessorDataArr,
             bufferViewDataArr,
             bufferViewOffset,
           ) =
             _addBufferViewData(
               (
                 verticesLength,
                 verticesCount,
                 Float32Array._BYTES_PER_ELEMENT,
                 VERTEX,
               ),
               (bufferViewOffset, bufferViewDataArr, accessorDataArr),
             );

           let (
             normalIndex,
             accessorDataArr,
             bufferViewDataArr,
             bufferViewOffset,
           ) =
             _addBufferViewData(
               (
                 normalsLength,
                 normalsCount,
                 Float32Array._BYTES_PER_ELEMENT,
                 NORMAL,
               ),
               (bufferViewOffset, bufferViewDataArr, accessorDataArr),
             );

           let (
             texCoordIndex,
             accessorDataArr,
             bufferViewDataArr,
             bufferViewOffset,
           ) =
             _addBufferViewData(
               (
                 texCoordsLength,
                 texCoordsCount,
                 Float32Array._BYTES_PER_ELEMENT,
                 TEXCOORD,
               ),
               (bufferViewOffset, bufferViewDataArr, accessorDataArr),
             );

           let (
             indexIndex,
             accessorDataArr,
             bufferViewDataArr,
             bufferViewOffset,
           ) =
             _addBufferViewData(
               (
                 indicesLength,
                 indicesCount,
                 Uint16Array._BYTES_PER_ELEMENT,
                 INDEX,
               ),
               (bufferViewOffset, bufferViewDataArr, accessorDataArr),
             );

           (
             (
               totalByteLength
               + (
                 Float32Array._BYTES_PER_ELEMENT
                 * (verticesLength + normalsLength + texCoordsLength)
                 + Uint16Array._BYTES_PER_ELEMENT
                 * indicesLength
               ),
               bufferViewOffset,
             ),
             (
               bufferViewDataArr,
               accessorDataArr,
               meshDataArr
               |> ArrayService.push(
                    {
                      primitives: {
                        attributes: {
                          position: vertexIndex,
                          normal: normalIndex,
                          texCoord_0:
                            switch (texCoords) {
                            | None => None
                            | Some(_) => Some(texCoordIndex)
                            },
                        },
                        indices: indexIndex,
                        material:
                          meshMaterialMap
                          |> WonderCommonlib.SparseMapService.get(meshIndex),
                      },
                      /* |> OptionService.unsafeGet, */
                      name: None,
                    }: meshData,
                  ),
             ),
           );
         },
         ((0, 0), ([||], [||], [||])),
       );

  (totalByteLength, (bufferViewDataArr, accessorDataArr, meshDataArr));
};

let _fillBuffer =
    (
      (buffer, points, pointsLength, bytes_per_element, offset),
      (fillTypeArrayWithOffsetFunc, fromBufferRangeFunc),
    ) => {
  fillTypeArrayWithOffsetFunc(
    fromBufferRangeFunc(buffer, ~offset, ~length=pointsLength),
    points,
    0,
  );

  (buffer, offset + pointsLength * bytes_per_element);
};

let _buildBuffer = (totalByteLength, meshPointDataMap) => {
  open Js.Typed_array;

  let buffer = ArrayBuffer.make(totalByteLength);

  let (buffer, offset) =
    meshPointDataMap
    |> SparseMapService.reduceiValid(
         (.
           (buffer, offset),
           (vertices, normals, texCoords, indices),
           meshIndex,
         ) => {
           let verticesLength = vertices |> Float32Array.length;
           let normalsLength = normals |> Float32Array.length;
           let texCoordsLength =
             switch (texCoords) {
             | None => 0
             | Some(texCoords) => texCoords |> Float32Array.length
             };
           let indicesLength = indices |> Uint16Array.length;

           let (buffer, offset) =
             _fillBuffer(
               (
                 buffer,
                 vertices,
                 verticesLength,
                 Float32Array._BYTES_PER_ELEMENT,
                 offset,
               ),
               (
                 TypeArrayService.fillFloat32ArrayWithOffset,
                 Float32Array.fromBufferRange,
               ),
             );

           let (buffer, offset) =
             _fillBuffer(
               (
                 buffer,
                 normals,
                 normalsLength,
                 Float32Array._BYTES_PER_ELEMENT,
                 offset,
               ),
               (
                 TypeArrayService.fillFloat32ArrayWithOffset,
                 Float32Array.fromBufferRange,
               ),
             );

           let (buffer, offset) =
             switch (texCoords) {
             | Some(texCoords) =>
               _fillBuffer(
                 (
                   buffer,
                   texCoords,
                   texCoordsLength,
                   Float32Array._BYTES_PER_ELEMENT,
                   offset,
                 ),
                 (
                   TypeArrayService.fillFloat32ArrayWithOffset,
                   Float32Array.fromBufferRange,
                 ),
               )
             | None => (buffer, offset)
             };

           _fillBuffer(
             (
               buffer,
               indices,
               indicesLength,
               Uint16Array._BYTES_PER_ELEMENT,
               offset,
             ),
             (
               TypeArrayService.fillUint16ArrayWithOffset,
               Uint16Array.fromBufferRange,
             ),
           );
         },
         (buffer, 0),
       );
  buffer;
};

let generateEmbededGLTF = (sceneGameObject, state) => {
  let (
    state,
    (meshPointDataMap, meshMaterialMap, materialDataMap, cameraDataMap),
    nodeDataArr,
  ) =
    _getAllNodeData(sceneGameObject, state);

  let (totalByteLength, (bufferViewDataArr, accessorDataArr, meshDataArr)) =
    _buildGeometryData(meshPointDataMap, meshMaterialMap);

  let buffer = _buildBuffer(totalByteLength, meshPointDataMap);

  /* TODO get materialData */

  /* TODO get cameraData */

  [
    (
      "asset",
      [
        ("version", "2.0" |> string),
        /* TODO duplicate */
        ("generator", "GLTF2WD" |> string),
      ]
      |> object_,
    ),
    ("scene", 0 |> int),
    (
      "scenes",
      [|[("nodes", [|0|] |> intArray)] |> object_|] |> jsonArray,
    ),
    (
      "nodes",
      nodeDataArr
      |> Js.Array.map(
           (
             {gameObject, children, translation, rotation, scale, mesh, camera}: nodeData,
           ) => {
           let list = [];

           let list =
             switch (NameGameObjectMainService.getName(gameObject, state)) {
             | None => list
             | Some(name) => [("name", name |> string)]
             };

           let list =
             switch (children) {
             | None => list
             | Some(children) => [
                 ("children", children |> intArray),
                 ...list,
               ]
             };

           let list =
             switch (translation) {
             | None => list
             | Some(translation) => [
                 (
                   "translation",
                   translation |> positionTupleToArray |> numberArray,
                 ),
               ]
             };

           let list =
             switch (rotation) {
             | None => list
             | Some(rotation) => [
                 (
                   "rotation",
                   rotation |> rotationTupleToArray |> numberArray,
                 ),
               ]
             };

           let list =
             switch (scale) {
             | None => list
             | Some(scale) => [
                 ("scale", scale |> scaleTupleToArray |> numberArray),
               ]
             };

           let list =
             switch (mesh) {
             | None => list
             | Some(mesh) => [("mesh", mesh |> int)]
             };

           let list =
             switch (camera) {
             | None => list
             | Some(camera) => [("camera", camera |> int)]
             };

           list |> List.rev |> object_;
         })
      |> jsonArray,
    ),
    (
      "buffers",
      [
        ("byteLength", totalByteLength |> int),
        ("uri", Base64ArrayBufferCommon.encode(buffer) |> string),
      ]
      |> object_,
    ),
    (
      "bufferViews",
      bufferViewDataArr
      |> Js.Array.map(({buffer, byteOffset, byteLength}: bufferViewData) =>
           [
             ("buffer", buffer |> int),
             ("byteOffset", byteOffset |> int),
             ("byteLength", byteLength |> int),
           ]
           |> object_
         )
      |> jsonArray,
    ),
    (
      "accessors",
      accessorDataArr
      |> Js.Array.map(
           ({bufferView, componentType, count, type_}: accessorData) =>
           [
             ("bufferView", bufferView |> int),
             ("componentType", componentType |> int),
             ("count", count |> int),
             ("type", type_ |> string),
           ]
           |> object_
         )
      |> jsonArray,
    ),
    (
      "meshes",
      meshDataArr
      |> Js.Array.map(({primitives, name}: meshData) => {
           let {attributes, indices, material}: primitives = primitives;

           let {position, normal, texCoord_0}: attributes = attributes;

           let attributesList = [
             ("POSITION", position |> int),
             ("NORMAL", normal |> int),
           ];

           let attributesList =
             switch (texCoord_0) {
             | None => attributesList
             | Some(texCoord_0) =>
               attributesList
               |> List.append([("TEXCOORD_0", texCoord_0 |> int)])
             };

           let primitivesList = [
             ("attributes", attributesList |> object_),
             ("indices", indices |> int),
           ];

           let primitivesList =
             switch (material) {
             | None => primitivesList
             | Some(material) =>
               primitivesList |> List.append([("material", material |> int)])
             };

           let primitives = ("primitives", primitivesList |> object_);

           switch (name) {
           | None => [primitives] |> object_

           | Some(name) => [primitives, ("name", name |> string)] |> object_
           };
         })
      |> jsonArray,
    ),
  ]
  |> object_;
};

let generateEmbededWD = (sceneGameObject, state) => {
  open Js.Promise;
  let data = ref(Obj.magic(1));
  generateEmbededGLTF(sceneGameObject, state)
  |> Js.Json.stringify
  |> ConvertGLTFSystem.convert
  |> Most.forEach(((wdRecord, _, _)) => {
       data := wdRecord;
       ();
     })
  |> then_(() => data^ |> resolve);
};