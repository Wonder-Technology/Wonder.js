open Js.Typed_array;

open Js.Promise;

let _readReader:
  FetchExtendType.reader => Js.Promise.t(FetchExtendType.streamData) = [%raw
  reader => {|
  return reader.read();
  |}
];

let _close = [%raw controller => {|
  controller.close();
  |}];

let _getTotalLoadedByteLength = loadedUint8ArrayArr =>
  loadedUint8ArrayArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. byteLength, loadedUint8Array) =>
         byteLength + (loadedUint8Array |> Uint8Array.byteLength),
       0,
     );

let _getAllChunkLengths =
    (allChunkLengths, totalLoadedByteLength, loadedUint8ArrayArr) =>
  switch (allChunkLengths) {
  | None =>
    let dataView =
      LoadStreamWDBUtil.buildLoadedDataView(
        totalLoadedByteLength,
        loadedUint8ArrayArr,
      );

    let (jsonChunkLength, _) =
      DataViewCommon.getUint32_1(.
        BufferUtils.getHeaderByteLength(),
        dataView,
      );
    let (streamChunkLength, _) =
      DataViewCommon.getUint32_1(.
        BufferUtils.getHeaderByteLength()
        + BufferUtils.getWDBChunkHeaderByteLength(),
        dataView,
      );
    let (binBufferChunkLength, _) =
      DataViewCommon.getUint32_1(.
        BufferUtils.getHeaderByteLength()
        + BufferUtils.getWDBChunkHeaderByteLength()
        + BufferUtils.getWDBChunkHeaderByteLength(),
        dataView,
      );
    (jsonChunkLength, streamChunkLength, binBufferChunkLength);

  | Some(allChunkLengths) => allChunkLengths
  };

let _getStreamChunkData =
    (
      streamChunkArr,
      chunkLengthData,
      totalLoadedByteLength,
      loadedUint8ArrayArr,
    ) =>
  Js.Array.length(streamChunkArr) > 0 ?
    streamChunkArr :
    {
      let dataView =
        LoadStreamWDBUtil.buildLoadedDataView(
          totalLoadedByteLength,
          loadedUint8ArrayArr,
        );

      ConvertStreamSystem.getStreamChunkArr(chunkLengthData, dataView);
    };

let _getJsonChunkStr =
    (jsonChunkLength, totalLoadedByteLength, loadedUint8ArrayArr) => {
  let dataView =
    LoadStreamWDBUtil.buildLoadedDataView(
      totalLoadedByteLength,
      loadedUint8ArrayArr,
    );

  BufferUtils.getWDBJsonChunkStr(
    jsonChunkLength,
    dataView |> DataView.buffer,
  );
};

let _assembleAndStartLoop =
    (
      assembleData,
      jsonChunkLength,
      totalLoadedByteLength,
      loadedUint8ArrayArr,
      default11Image,
      handleBeforeStartLoopFunc,
      state,
    ) =>
  switch (assembleData) {
  | Some(assembleData) => (state, assembleData)
  | None =>
    let (
      state,
      rootGameObject,
      (geometryArr, geometryGameObjects, gameObjectGeometrys),
      (basicSourceTextureArr, imageTextureIndices, images),
    ) =
      AssembleStreamWDBSystem.assemble(
        _getJsonChunkStr(
          jsonChunkLength,
          totalLoadedByteLength,
          loadedUint8ArrayArr,
        )
        |> Js.Json.parseExn
        |> Obj.magic,
        default11Image,
        state,
      );

    /* WonderLog.Log.printJson((
         rootGameObject,
         (geometryArr, geometryGameObjects, gameObjectGeometrys),
         (basicSourceTextureArr, imageTextureIndices, images),
       ))
       |> ignore; */

    let state = handleBeforeStartLoopFunc(state, rootGameObject);

    DirectorMainService.start(state);

    (
      StateDataMainService.unsafeGetState(StateDataMain.stateData),
      (
        rootGameObject,
        (geometryArr, geometryGameObjects, gameObjectGeometrys),
        (basicSourceTextureArr, imageTextureIndices, images),
      ),
    );
  };

let _isLoadHeader = totalLoadedByteLength =>
  totalLoadedByteLength < BufferUtils.getWDBHeaderTotalByteLength();

let _computeHeaderJsonStreamChunkTotalByteLength =
    (jsonChunkLength, streamChunkLength) =>
  BufferUtils.getWDBHeaderTotalByteLength()
  + (jsonChunkLength |> BufferUtils.alignedLength)
  + (streamChunkLength |> BufferUtils.alignedLength);

let _isLoadBinBufferChunk =
    (headerJsonStreamChunkTotalByteLength, totalLoadedByteLength) =>
  totalLoadedByteLength >= headerJsonStreamChunkTotalByteLength;

let _isLoadStreamChunk = (jsonChunkLength, totalLoadedByteLength) =>
  totalLoadedByteLength >= BufferUtils.getWDBHeaderTotalByteLength()
  + jsonChunkLength;

let rec read =
        (
          (
            default11Image,
            controller,
            handleBeforeStartLoopFunc,
            handleWhenDoneFunc,
          ),
          loadedUint8ArrayArr,
          (
            allChunkLengths,
            streamChunkArr,
            assembleData,
            nextStreamChunkIndex,
            loadedStreamChunkArrWhichNotHasAllData,
            loadBlobImageMap,
          ),
          reader,
        ) =>
  _readReader(reader)
  |> then_(streamData =>
       FetchExtend.isDone(streamData) ?
         {
           WonderLog.Log.print("done") |> ignore;

           _close(controller);

           switch (assembleData) {
           | None => resolve()
           | Some((rootGameObject, _, _)) =>
             let _getChildren = (parent, state) =>
               TransformAPI.unsafeGetTransformChildren(parent, state)
               |> Js.Array.sortInPlace;

             let getAllChildrenTransform = (rootGameObject, state) => {
               let rec _addChildren = (parentArr, state, childrenArr) => {
                 let childrenArr = childrenArr |> Js.Array.concat(parentArr);
                 parentArr
                 |> WonderCommonlib.ArrayService.reduceOneParam(
                      (. (state, childrenArr), parent) =>
                        _addChildren(
                          _getChildren(parent, state),
                          state,
                          childrenArr,
                        ),
                      (state, childrenArr),
                    );
               };
               _addChildren(
                 _getChildren(
                   GameObjectAPI.unsafeGetGameObjectTransformComponent(
                     rootGameObject,
                     state,
                   ),
                   state,
                 ),
                 state,
                 [||],
               );
             };
             let getAllSortedTransforms = (rootGameObject, state) => {
               let (state, allTransformChildren) =
                 getAllChildrenTransform(rootGameObject, state);
               let allTransformChildren =
                 allTransformChildren |> Js.Array.sortInPlace;
               [|
                 GameObjectAPI.unsafeGetGameObjectTransformComponent(
                   rootGameObject,
                   state,
                 ),
               |]
               |> Js.Array.concat(allTransformChildren);
             };

             let getAllGameObjects = (rootGameObject, state) => {
               let (state, allTransformChildren) =
                 getAllChildrenTransform(rootGameObject, state);

               [|rootGameObject|]
               |> Js.Array.concat(
                    allTransformChildren
                    |> Js.Array.map(transform =>
                         TransformAPI.unsafeGetTransformGameObject(
                           transform,
                           state,
                         )
                       ),
                  );
             };

             let getAllDirectionLightData = (rootGameObject, state) =>
               getAllGameObjects(rootGameObject, state)
               |> Js.Array.filter(gameObject =>
                    GameObjectAPI.hasGameObjectDirectionLightComponent(
                      gameObject,
                      state,
                    )
                  )
               |> Js.Array.map(gameObject =>
                    GameObjectAPI.unsafeGetGameObjectDirectionLightComponent(
                      gameObject,
                      state,
                    )
                  )
               |> Js.Array.map(light =>
                    (
                      DirectionLightAPI.getDirectionLightColor(light, state),
                      DirectionLightAPI.getDirectionLightIntensity(
                        light,
                        state,
                      ),
                    )
                  );

             let getAllPointLightData = (rootGameObject, state) =>
               getAllGameObjects(rootGameObject, state)
               |> Js.Array.filter(gameObject =>
                    GameObjectAPI.hasGameObjectPointLightComponent(
                      gameObject,
                      state,
                    )
                  )
               |> Js.Array.map(gameObject =>
                    GameObjectAPI.unsafeGetGameObjectPointLightComponent(
                      gameObject,
                      state,
                    )
                  )
               |> Js.Array.map(light =>
                    (
                      PointLightAPI.getPointLightColor(light, state),
                      PointLightAPI.getPointLightIntensity(light, state),
                      PointLightAPI.getPointLightConstant(light, state),
                      PointLightAPI.getPointLightLinear(light, state),
                      PointLightAPI.getPointLightQuadratic(light, state),
                      PointLightAPI.getPointLightRange(light, state),
                    )
                  );

             let getAllBasicMaterials = (rootGameObject, state) =>
               getAllGameObjects(rootGameObject, state)
               |> Js.Array.filter(gameObject =>
                    GameObjectAPI.hasGameObjectBasicMaterialComponent(
                      gameObject,
                      state,
                    )
                  )
               |> Js.Array.map(gameObject =>
                    GameObjectAPI.unsafeGetGameObjectBasicMaterialComponent(
                      gameObject,
                      state,
                    )
                  );

             let getAllLightMaterials = (rootGameObject, state) =>
               getAllGameObjects(rootGameObject, state)
               |> Js.Array.filter(gameObject =>
                    GameObjectAPI.hasGameObjectLightMaterialComponent(
                      gameObject,
                      state,
                    )
                  )
               |> Js.Array.map(gameObject =>
                    GameObjectAPI.unsafeGetGameObjectLightMaterialComponent(
                      gameObject,
                      state,
                    )
                  );

             let getAllDiffuseMaps = (rootGameObject, state) =>
               getAllLightMaterials(rootGameObject, state)
               |> Js.Array.filter(lightMaterial =>
                    LightMaterialAPI.hasLightMaterialDiffuseMap(
                      lightMaterial,
                      state,
                    )
                  )
               |> Js.Array.map(lightMaterial =>
                    LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(
                      lightMaterial,
                      state,
                    )
                  );

             WonderLog.Log.print((
               "all diffuseMap : ",
               getAllDiffuseMaps(
                 rootGameObject,
                 StateDataMainService.unsafeGetState(StateDataMain.stateData),
               ),
               "all diffuseMap sources: ",
               getAllDiffuseMaps(
                 rootGameObject,
                 StateDataMainService.unsafeGetState(StateDataMain.stateData),
               )
               |> Js.Array.map(diffuseMap =>
                    BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                      diffuseMap,
                      StateDataMainService.unsafeGetState(
                        StateDataMain.stateData,
                      ),
                    )##width
                  ),
             ))
             |> ignore;

             handleWhenDoneFunc(
               StateDataMainService.unsafeGetState(StateDataMain.stateData),
               rootGameObject,
             )
             |> StateDataMainService.setState(StateDataMain.stateData)
             |> ignore;

             resolve();
           };
         } :
         {
           /* TODO use requestIdleCallback + timeout? */

           let value = streamData##value;

           WonderLog.Log.printJson(("value", value |> Uint8Array.byteLength))
           |> ignore;

           let loadedUint8ArrayArr =
             loadedUint8ArrayArr |> ArrayService.push(value);

           let totalLoadedByteLength =
             _getTotalLoadedByteLength(loadedUint8ArrayArr);

           _isLoadHeader(totalLoadedByteLength) ?
             read(
               (
                 default11Image,
                 controller,
                 handleBeforeStartLoopFunc,
                 handleWhenDoneFunc,
               ),
               loadedUint8ArrayArr,
               (
                 allChunkLengths,
                 streamChunkArr,
                 assembleData,
                 nextStreamChunkIndex,
                 loadedStreamChunkArrWhichNotHasAllData,
                 loadBlobImageMap,
               ),
               reader,
             ) :
             {
               let (jsonChunkLength, streamChunkLength, binBufferChunkLength) as allChunkLengths =
                 _getAllChunkLengths(
                   allChunkLengths,
                   totalLoadedByteLength,
                   loadedUint8ArrayArr,
                 );

               WonderLog.Log.print(("allChunkLengths: ", allChunkLengths))
               |> ignore;

               let headerJsonStreamChunkTotalByteLength =
                 _computeHeaderJsonStreamChunkTotalByteLength(
                   jsonChunkLength,
                   streamChunkLength,
                 );

               _isLoadBinBufferChunk(
                 headerJsonStreamChunkTotalByteLength,
                 totalLoadedByteLength,
               ) ?
                 {
                   let streamChunkArr =
                     _getStreamChunkData(
                       streamChunkArr,
                       (jsonChunkLength, streamChunkLength),
                       totalLoadedByteLength,
                       loadedUint8ArrayArr,
                     );

                   WonderLog.Log.print(("streamChunkArr: ", streamChunkArr))
                   |> ignore;

                   let state =
                     StateDataMainService.unsafeGetState(
                       StateDataMain.stateData,
                     );

                   let (state, assembleData) =
                     _assembleAndStartLoop(
                       assembleData,
                       jsonChunkLength,
                       totalLoadedByteLength,
                       loadedUint8ArrayArr,
                       default11Image,
                       handleBeforeStartLoopFunc,
                       state,
                     );

                   LoadStreamWDBBinBufferSystem.handleBinBufferData(
                     (
                       headerJsonStreamChunkTotalByteLength,
                       totalLoadedByteLength,
                       loadedUint8ArrayArr,
                     ),
                     (
                       nextStreamChunkIndex,
                       streamChunkArr,
                       loadedStreamChunkArrWhichNotHasAllData,
                       loadBlobImageMap,
                     ),
                     assembleData,
                     state,
                   )
                   |> then_(
                        (
                          (
                            state,
                            streamChunkArr,
                            assembleData,
                            nextStreamChunkIndex,
                            loadedStreamChunkArrWhichNotHasAllData,
                            loadBlobImageMap,
                          ),
                        ) => {
                        StateDataMainService.setState(
                          StateDataMain.stateData,
                          state,
                        )
                        |> ignore;

                        read(
                          (
                            default11Image,
                            controller,
                            handleBeforeStartLoopFunc,
                            handleWhenDoneFunc,
                          ),
                          loadedUint8ArrayArr,
                          (
                            allChunkLengths |. Some,
                            streamChunkArr,
                            assembleData |. Some,
                            nextStreamChunkIndex,
                            loadedStreamChunkArrWhichNotHasAllData,
                            loadBlobImageMap,
                          ),
                          reader,
                        );
                      });
                 } :
                 read(
                   (
                     default11Image,
                     controller,
                     handleBeforeStartLoopFunc,
                     handleWhenDoneFunc,
                   ),
                   loadedUint8ArrayArr,
                   (
                     allChunkLengths |. Some,
                     streamChunkArr,
                     assembleData,
                     nextStreamChunkIndex,
                     loadedStreamChunkArrWhichNotHasAllData,
                     loadBlobImageMap,
                   ),
                   reader,
                 );
             };
         }
     )
  |> catch(e => {
       WonderLog.Log.error(e) |> ignore;

       reject(StreamType.ReadError);
     });