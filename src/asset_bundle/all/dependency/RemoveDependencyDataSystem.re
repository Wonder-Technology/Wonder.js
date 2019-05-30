open DependencyDataType;

open Js.Typed_array;

module All = {
  let hasDependencyData =
      (
        bufferDataName,
        abRelativePath,
        dependencyRelation,
        abBufferDataNameMap: bufferDataNameMap,
      ) =>
    FindDependencyDataSystem.findAllDependencyRABRelativePathByDepthSearch(
      abRelativePath,
      dependencyRelation,
    )
    |> Js.Array.filter(dependencyAbRelativePath =>
         switch (
           abBufferDataNameMap
           |> WonderCommonlib.ImmutableHashMapService.get(
                dependencyAbRelativePath,
              )
         ) {
         | None => false
         | Some(bufferDataNameMap) =>
           bufferDataNameMap
           |> WonderCommonlib.ImmutableHashMapService.has(bufferDataName)
         }
       )
    |> Js.Array.length > 0;
};

module RAB = {
  let _removeImageDuplicateBufferData =
      (
        (dependencyRelation, allRabImageNameMap, rabRelativePath),
        {images, bufferViews}: RABType.resourceAssetBundleContent,
        buffer,
      ) => {
    let (imageArr, bufferViewArr, uint8ArrayArr, byteOffset) =
      images
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             (imageArr, bufferViewArr, uint8ArrayArr, byteOffset),
             ({name, bufferView}: RABType.image) as imageData,
           ) =>
             All.hasDependencyData(
               name,
               rabRelativePath,
               dependencyRelation,
               allRabImageNameMap,
             ) ?
               (
                 imageArr
                 |> ArrayService.push(
                      {
                        ...imageData,
                        bufferView:
                          ABBufferViewUtils.buildNoneBufferViewIndex(),
                      }: RABType.image,
                    ),
                 bufferViewArr,
                 uint8ArrayArr,
                 byteOffset,
               ) :
               {
                 let arrayBuffer =
                   ABArrayBufferUtils.RAB.getArrayBufferFromBufferViews(
                     buffer,
                     bufferView,
                     bufferViews,
                   );

                 let byteLength = arrayBuffer |> ArrayBuffer.byteLength;
                 let alignedByteLength =
                   BufferUtils.alignedLength(byteLength);

                 (
                   imageArr
                   |> ArrayService.push({
                        ...imageData,
                        bufferView: bufferViewArr |> Js.Array.length,
                      }),
                   bufferViewArr
                   |> ArrayService.push(
                        {byteOffset, byteLength}: RABType.bufferView,
                      ),
                   uint8ArrayArr |> ArrayService.push(arrayBuffer),
                   byteOffset + alignedByteLength,
                 );
               },
           ([||], [||], [||], 0),
         );

    (
      /* imageIndexMap, */
      imageArr,
      bufferViewArr,
      uint8ArrayArr,
      RABUtils.computeBufferViewDataByteLength(bufferViewArr),
    );
  };

  let _buildGeometryBufferData =
      (
        (
          geometryName,
          rabRelativePath,
          dependencyRelation,
          allRabGeometryNameMap,
        ),
        (buffer, bufferViews),
        (
          imageBufferViewIndex,
          bufferView,
          bufferViewArr,
          byteOffset,
          uint8ArrayArr,
        ),
      ) =>
    ABBufferViewUtils.isNoneBufferViewIndex(bufferView)
    || All.hasDependencyData(
         geometryName,
         rabRelativePath,
         dependencyRelation,
         allRabGeometryNameMap,
       ) ?
      (
        ABBufferViewUtils.buildNoneBufferViewIndex(),
        bufferViewArr,
        byteOffset,
        uint8ArrayArr,
      ) :
      {
        let arrayBuffer =
          ABArrayBufferUtils.RAB.getArrayBufferFromBufferViews(
            buffer,
            bufferView,
            bufferViews,
          );

        let uint8Array = Uint8Array.fromBuffer(arrayBuffer);

        let byteLength = uint8Array |> Uint8Array.byteLength;

        let alignedByteLength = BufferUtils.alignedLength(byteLength);

        (
          (bufferViewArr |> Js.Array.length) + imageBufferViewIndex,
          bufferViewArr
          |> ArrayService.push({byteOffset, byteLength}: RABType.bufferView),
          byteOffset + alignedByteLength,
          uint8ArrayArr |> ArrayService.push(uint8Array),
        );
      };

  let _removeGeometryDuplicateBufferData =
      (
        (dependencyRelation, allRabGeometryNameMap, rabRelativePath),
        (imageAlignedByteLength, imageBufferViewArr),
        {geometrys, bufferViews}: RABType.resourceAssetBundleContent,
        buffer,
      ) => {
    let imageBufferViewIndex = imageBufferViewArr |> Js.Array.length;

    let (geometryArr, uint8ArrayArr, bufferViewArr, byteOffset) =
      geometrys
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             (geometryArr, uint8ArrayArr, bufferViewArr, byteOffset),
             (
               {
                 name,
                 vertexBufferView,
                 normalBufferView,
                 texCoordBufferView,
                 indexBufferView,
               }: RABType.geometry
             ) as geometry,
           ) => {
             let (vertexBufferView, bufferViewArr, byteOffset, uint8ArrayArr) =
               _buildGeometryBufferData(
                 (
                   name,
                   rabRelativePath,
                   dependencyRelation,
                   allRabGeometryNameMap,
                 ),
                 (buffer, bufferViews),
                 (
                   imageBufferViewIndex,
                   vertexBufferView,
                   bufferViewArr,
                   byteOffset,
                   uint8ArrayArr,
                 ),
               );

             let (normalBufferView, bufferViewArr, byteOffset, uint8ArrayArr) =
               _buildGeometryBufferData(
                 (
                   name,
                   rabRelativePath,
                   dependencyRelation,
                   allRabGeometryNameMap,
                 ),
                 (buffer, bufferViews),
                 (
                   imageBufferViewIndex,
                   normalBufferView,
                   bufferViewArr,
                   byteOffset,
                   uint8ArrayArr,
                 ),
               );

             let (
               texCoordBufferView,
               bufferViewArr,
               byteOffset,
               uint8ArrayArr,
             ) =
               _buildGeometryBufferData(
                 (
                   name,
                   rabRelativePath,
                   dependencyRelation,
                   allRabGeometryNameMap,
                 ),
                 (buffer, bufferViews),
                 (
                   imageBufferViewIndex,
                   texCoordBufferView,
                   bufferViewArr,
                   byteOffset,
                   uint8ArrayArr,
                 ),
               );

             let (indexBufferView, bufferViewArr, byteOffset, uint8ArrayArr) =
               _buildGeometryBufferData(
                 (
                   name,
                   rabRelativePath,
                   dependencyRelation,
                   allRabGeometryNameMap,
                 ),
                 (buffer, bufferViews),
                 (
                   imageBufferViewIndex,
                   indexBufferView,
                   bufferViewArr,
                   byteOffset,
                   uint8ArrayArr,
                 ),
               );

             (
               geometryArr
               |> ArrayService.push(
                    {
                      ...geometry,
                      vertexBufferView,
                      normalBufferView,
                      texCoordBufferView,
                      indexBufferView,
                    }: RABType.geometry,
                  ),
               uint8ArrayArr,
               bufferViewArr,
               byteOffset,
             );
           },
           ([||], [||], [||], imageAlignedByteLength),
         );

    (
      geometryArr,
      uint8ArrayArr,
      bufferViewArr,
      bufferViewArr |> Js.Array.length === 0 ?
        imageAlignedByteLength :
        RABUtils.computeBufferViewDataByteLength(bufferViewArr),
    );
  };

  let removeRABDuplicateBufferData =
      (
        dependencyRelation,
        (allRabImageNameMap, allRabGeometryNameMap),
        (rabRelativePath, rab),
      ) => {
    let dataView = DataViewCommon.create(rab);

    let (byteOffset, jsonByteLength, bufferByteLength) =
      GenerateABUtils.readHeader(dataView);

    let jsonStr = GenerateABUtils.getJsonStr(jsonByteLength, rab);
    let buffer = GenerateABUtils.getBuffer(jsonByteLength, rab);

    let resourceAssetBundleContent: RABType.resourceAssetBundleContent =
      jsonStr |> Js.Json.parseExn |> Obj.magic;

    let (
      imageArr,
      imageBufferViewArr,
      imageArrayBufferArr,
      imageAlignedByteLength,
    ) =
      _removeImageDuplicateBufferData(
        (dependencyRelation, allRabImageNameMap, rabRelativePath),
        resourceAssetBundleContent,
        buffer,
      );

    let (
      geometryArr,
      geometryUint8ArrayArr,
      geometryBufferViewArr,
      bufferTotalAlignedByteLength,
    ) =
      _removeGeometryDuplicateBufferData(
        (dependencyRelation, allRabGeometryNameMap, rabRelativePath),
        (imageAlignedByteLength, imageBufferViewArr),
        resourceAssetBundleContent,
        buffer,
      );

    let jsonUint8Array =
      BuildSingleRABJsonDataSystem.buildJsonUint8Array({
        ...resourceAssetBundleContent,
        images: imageArr,
        geometrys: geometryArr,
        bufferViews:
          Js.Array.concat(geometryBufferViewArr, imageBufferViewArr),
      });

    GenerateSingleRABSystem.generateRAB(
      (
        (imageBufferViewArr, geometryBufferViewArr),
        imageArrayBufferArr
        |> Js.Array.map(arrayBuffer => Uint8Array.fromBuffer(arrayBuffer)),
        geometryUint8ArrayArr,
      ),
      bufferTotalAlignedByteLength,
      jsonUint8Array,
    );
  };
};

module SAB = {
  let _getArrayBufferFromBufferViews =
      (buffer, bufferView, bufferViews: array(WDType.bufferView)) => {
    let {byteOffset, byteLength}: WDType.bufferView =
      Array.unsafe_get(bufferViews, bufferView);

    buffer
    |> Js.Typed_array.ArrayBuffer.slice(
         ~start=byteOffset,
         ~end_=byteOffset + byteLength,
       );
  };

  let _removeImageDuplicateBufferData =
      (
        (dependencyRelation, allRabImageNameMap, sabRelativePath),
        {images, bufferViews, accessors}: SABType.sceneAssetBundleContent,
        buffer,
      ) =>
    switch (images) {
    | None => ([||], [||], [||], 0)
    | Some(images) =>
      let (imageArr, bufferViewArr, uint8ArrayArr, byteOffset) =
        images
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (.
               (imageArr, bufferViewArr, uint8ArrayArr, byteOffset),
               ({name, bufferView}: WDType.image) as imageData,
             ) =>
               All.hasDependencyData(
                 name,
                 sabRelativePath,
                 dependencyRelation,
                 allRabImageNameMap,
               ) ?
                 (
                   imageArr
                   |> ArrayService.push(
                        {
                          ...imageData,
                          bufferView:
                            ABBufferViewUtils.buildNoneBufferViewIndex(),
                        }: WDType.image,
                      ),
                   bufferViewArr,
                   uint8ArrayArr,
                   byteOffset,
                 ) :
                 {
                   let arrayBuffer =
                     _getArrayBufferFromBufferViews(
                       buffer,
                       bufferView,
                       bufferViews,
                     );

                   let byteLength = arrayBuffer |> ArrayBuffer.byteLength;
                   let alignedByteLength =
                     BufferUtils.alignedLength(byteLength);

                   let (buffer, byteOffset, byteLength, byteStride) =
                     GenerateCommon.buildBufferViewData(
                       byteOffset,
                       byteLength,
                     );

                   (
                     imageArr
                     |> ArrayService.push(
                          {
                            ...imageData,
                            bufferView: bufferViewArr |> Js.Array.length,
                          }: WDType.image,
                        ),
                     bufferViewArr
                     |> ArrayService.push(
                          {buffer, byteOffset, byteLength, byteStride}: WDType.bufferView,
                        ),
                     uint8ArrayArr |> ArrayService.push(arrayBuffer),
                     byteOffset + alignedByteLength,
                   );
                 },
             ([||], [||], [||], 0),
           );

      (
        imageArr,
        bufferViewArr,
        uint8ArrayArr,
        SABUtils.computeBufferViewDataByteLength(bufferViewArr),
      );
    };

  let _buildAccessorData =
      (bufferViewArr, imageBufferViewIndex, pointsCount, pointType)
      : WDType.accessor => {
    bufferView: (bufferViewArr |> Js.Array.length) + imageBufferViewIndex,
    byteOffset: GenerateCommon.buildAccessorByteOffset(),
    count: pointsCount,
    componentType:
      BuildGeometryDataSystem.getComponentType(pointType)
      |> ConvertUtils.convertComponentType,
    type_:
      BuildGeometryDataSystem.getType(pointType) |> BufferUtils.convertType,
  };

  let _buildGeometryAttributeBufferData =
      (
        (
          geometryName,
          sabRelativePath,
          dependencyRelation,
          allRabGeometryNameMap,
        ),
        dataViewArr,
        (pointType, pointSize),
        ({bufferViews, accessors}: SABType.sceneAssetBundleContent) as sceneAssetBundleContent,
        (
          isNoneAccessorIndexFunc,
          buildNoneAccessorIndexFunc,
          getAccessorIndexFunc,
          buildAccessorIndexFunc,
        ),
        (
          imageBufferViewIndex,
          accessor,
          accessorArr,
          bufferViewArr,
          byteOffset,
          uint8ArrayArr,
        ),
      ) =>
    isNoneAccessorIndexFunc(accessor)
    || All.hasDependencyData(
         geometryName,
         sabRelativePath,
         dependencyRelation,
         allRabGeometryNameMap,
       ) ?
      (
        buildNoneAccessorIndexFunc(),
        accessorArr,
        bufferViewArr,
        byteOffset,
        uint8ArrayArr,
      ) :
      {
        let accessor = getAccessorIndexFunc(accessor);

        let points =
          BatchOperateWholeGeometrySystem.getBufferAttributeData(
            accessor,
            dataViewArr,
            sceneAssetBundleContent,
          );

        let uint8Array = points |> TypeArrayUtils.convertFloat32ToUint8;

        let byteLength = uint8Array |> Uint8Array.byteLength;

        let alignedByteLength = BufferUtils.alignedLength(byteLength);

        let (buffer, byteOffset, byteLength, byteStride) =
          GenerateCommon.buildBufferViewData(byteOffset, byteLength);

        (
          buildAccessorIndexFunc(accessorArr |> Js.Array.length),
          accessorArr
          |> ArrayService.push(
               _buildAccessorData(
                 bufferViewArr,
                 imageBufferViewIndex,
                 (points |> Float32Array.length) / pointSize,
                 pointType,
               ),
             ),
          bufferViewArr
          |> ArrayService.push(
               {buffer, byteOffset, byteLength, byteStride}: WDType.bufferView,
             ),
          byteOffset + alignedByteLength,
          uint8ArrayArr |> ArrayService.push(uint8Array),
        );
      };

  let _buildGeometryIndexBufferData =
      (
        (name, sabRelativePath, dependencyRelation, allRabGeometryNameMap),
        dataViewArr,
        pointSize,
        ({bufferViews, accessors}: SABType.sceneAssetBundleContent) as sceneAssetBundleContent,
        (
          imageBufferViewIndex,
          accessor,
          accessorArr,
          bufferViewArr,
          byteOffset,
          uint8ArrayArr,
        ),
      ) =>
    ABBufferViewUtils.isNoneAccessorIndex(accessor)
    || All.hasDependencyData(
         name,
         sabRelativePath,
         dependencyRelation,
         allRabGeometryNameMap,
       ) ?
      (
        ABBufferViewUtils.buildNoneAccessorIndex(),
        accessorArr,
        bufferViewArr,
        byteOffset,
        uint8ArrayArr,
      ) :
      {
        let componentType =
          BatchOperateWholeGeometrySystem.getAccessorComponentType(
            sceneAssetBundleContent,
            accessor,
          );

        let (uint8Array, pointsCount, pointType) =
          switch (
            BatchOperateWholeGeometrySystem.getBufferIndex16Data(
              componentType,
              accessor,
              dataViewArr,
              sceneAssetBundleContent,
            )
          ) {
          | Some(data) => (
              data |> TypeArrayUtils.convertUint16ToUint8,
              (data |> Uint16Array.length) / pointSize,
              GenerateSceneGraphType.Index,
            )
          | None =>
            switch (
              BatchOperateWholeGeometrySystem.getBufferIndex32Data(
                componentType,
                accessor,
                dataViewArr,
                sceneAssetBundleContent,
              )
            ) {
            | Some(data) => (
                data |> TypeArrayUtils.convertUint32ToUint8,
                (data |> Uint32Array.length) / pointSize,
                GenerateSceneGraphType.Index32,
              )
            | None =>
              WonderLog.Log.fatal(
                WonderLog.Log.buildFatalMessage(
                  ~title="_buildGeometryIndexBufferData",
                  ~description={j|unknown componentType: $componentType|j},
                  ~reason="",
                  ~solution={j||j},
                  ~params={j||j},
                ),
              )
            }
          };

        let byteLength = uint8Array |> Uint8Array.byteLength;

        let alignedByteLength = BufferUtils.alignedLength(byteLength);

        let (buffer, byteOffset, byteLength, byteStride) =
          GenerateCommon.buildBufferViewData(byteOffset, byteLength);

        (
          accessorArr |> Js.Array.length,
          accessorArr
          |> ArrayService.push(
               _buildAccessorData(
                 bufferViewArr,
                 imageBufferViewIndex,
                 pointsCount,
                 pointType,
               ),
             ),
          bufferViewArr
          |> ArrayService.push(
               {buffer, byteOffset, byteLength, byteStride}: WDType.bufferView,
             ),
          byteOffset + alignedByteLength,
          uint8ArrayArr |> ArrayService.push(uint8Array),
        );
      };

  let _removeGeometryDuplicateBufferData =
      (
        (dependencyRelation, allRabGeometryNameMap, sabRelativePath),
        (imageAlignedByteLength, imageBufferViewArr),
        ({geometrys, bufferViews, accessors}: SABType.sceneAssetBundleContent) as sceneAssetBundleContent,
        buffer,
      ) => {
    let imageBufferViewIndex = imageBufferViewArr |> Js.Array.length;

    let dataViewArr = [|DataViewCommon.create(buffer)|];

    let (geometryArr, uint8ArrayArr, accessorArr, bufferViewArr, byteOffset) =
      geometrys
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             (
               geometryArr,
               uint8ArrayArr,
               accessorArr,
               bufferViewArr,
               byteOffset,
             ),
             geometryData,
           ) =>
             geometryData |> OptionService.isJsonSerializedValueNone ?
               (
                 geometryArr |> ArrayService.push(None),
                 uint8ArrayArr,
                 accessorArr,
                 bufferViewArr,
                 byteOffset,
               ) :
               {
                 let (
                       {name, position, normal, texCoord, index}: WDType.geometry
                     ) as geometry =
                   geometryData |> OptionService.unsafeGetJsonSerializedValue;

                 let (verticesSize, normalsSize, texCoordsSize, indicesSize) =
                   BuildGeometryDataUtils.getPointSize();

                 let (
                   positionAccessor,
                   accessorArr,
                   bufferViewArr,
                   byteOffset,
                   uint8ArrayArr,
                 ) =
                   _buildGeometryAttributeBufferData(
                     (
                       name,
                       sabRelativePath,
                       dependencyRelation,
                       allRabGeometryNameMap,
                     ),
                     dataViewArr,
                     (GenerateSceneGraphType.Vertex, verticesSize),
                     sceneAssetBundleContent,
                     (
                       ABBufferViewUtils.isNoneAccessorIndex,
                       ABBufferViewUtils.buildNoneBufferViewIndex,
                       accessor => accessor,
                       accessor => accessor,
                     ),
                     (
                       imageBufferViewIndex,
                       position,
                       accessorArr,
                       bufferViewArr,
                       byteOffset,
                       uint8ArrayArr,
                     ),
                   );

                 let (
                   normalAccessor,
                   accessorArr,
                   bufferViewArr,
                   byteOffset,
                   uint8ArrayArr,
                 ) =
                   _buildGeometryAttributeBufferData(
                     (
                       name,
                       sabRelativePath,
                       dependencyRelation,
                       allRabGeometryNameMap,
                     ),
                     dataViewArr,
                     (GenerateSceneGraphType.Normal, normalsSize),
                     sceneAssetBundleContent,
                     (
                       OptionService.isJsonSerializedValueNone,
                       () => None,
                       accessor =>
                         OptionService.unsafeGetJsonSerializedValue(accessor),
                       accessor => Some(accessor),
                     ),
                     (
                       imageBufferViewIndex,
                       normal,
                       accessorArr,
                       bufferViewArr,
                       byteOffset,
                       uint8ArrayArr,
                     ),
                   );

                 let (
                   texCoordAccessor,
                   accessorArr,
                   bufferViewArr,
                   byteOffset,
                   uint8ArrayArr,
                 ) =
                   _buildGeometryAttributeBufferData(
                     (
                       name,
                       sabRelativePath,
                       dependencyRelation,
                       allRabGeometryNameMap,
                     ),
                     dataViewArr,
                     (GenerateSceneGraphType.TexCoord, texCoordsSize),
                     sceneAssetBundleContent,
                     (
                       OptionService.isJsonSerializedValueNone,
                       () => None,
                       accessor =>
                         OptionService.unsafeGetJsonSerializedValue(accessor),
                       accessor => Some(accessor),
                     ),
                     (
                       imageBufferViewIndex,
                       texCoord,
                       accessorArr,
                       bufferViewArr,
                       byteOffset,
                       uint8ArrayArr,
                     ),
                   );

                 let (
                   indexAccessor,
                   accessorArr,
                   bufferViewArr,
                   byteOffset,
                   uint8ArrayArr,
                 ) =
                   _buildGeometryIndexBufferData(
                     (
                       name,
                       sabRelativePath,
                       dependencyRelation,
                       allRabGeometryNameMap,
                     ),
                     dataViewArr,
                     indicesSize,
                     sceneAssetBundleContent,
                     (
                       imageBufferViewIndex,
                       index,
                       accessorArr,
                       bufferViewArr,
                       byteOffset,
                       uint8ArrayArr,
                     ),
                   );

                 (
                   geometryArr
                   |> ArrayService.push(
                        {
                          ...geometry,
                          position: positionAccessor,
                          normal: normalAccessor,
                          texCoord: texCoordAccessor,
                          index: indexAccessor,
                        }
                        ->Some,
                      ),
                   uint8ArrayArr,
                   accessorArr,
                   bufferViewArr,
                   byteOffset,
                 );
               },
           ([||], [||], [||], [||], imageAlignedByteLength),
         );

    (
      geometryArr,
      uint8ArrayArr,
      accessorArr,
      bufferViewArr,
      bufferViewArr |> Js.Array.length === 0 ?
        imageAlignedByteLength :
        SABUtils.computeBufferViewDataByteLength(bufferViewArr),
    );
  };

  let removeSABDuplicateBufferData =
      (
        dependencyRelation,
        (allRabImageNameMap, allRabGeometryNameMap),
        (sabRelativePath, sab),
      ) => {
    let (wdFileContent, _, buffer) =
      BufferUtils.decodeWDB(sab, AssembleWholeWDBSystem.checkWDB);

    let sceneAssetBundleContent: SABType.sceneAssetBundleContent =
      wdFileContent |> Js.Json.parseExn |> Obj.magic;

    let (
      imageArr,
      imageBufferViewArr,
      imageArrayBufferArr,
      imageAlignedByteLength,
    ) =
      _removeImageDuplicateBufferData(
        (dependencyRelation, allRabImageNameMap, sabRelativePath),
        sceneAssetBundleContent,
        buffer,
      );

    let (
      geometryArr,
      geometryUint8ArrayArr,
      geometryAccessorArr,
      geometryBufferViewArr,
      bufferTotalAlignedByteLength,
    ) =
      _removeGeometryDuplicateBufferData(
        (dependencyRelation, allRabGeometryNameMap, sabRelativePath),
        (imageAlignedByteLength, imageBufferViewArr),
        sceneAssetBundleContent,
        buffer,
      );

    let jsonUint8Array =
      BuildSingleSABJsonDataSystem.buildJsonUint8Array(
        {
          ...sceneAssetBundleContent,
          images: imageArr |> Js.Array.length === 0 ? None : Some(imageArr),
          geometrys: geometryArr,
          bufferViews:
            Js.Array.concat(geometryBufferViewArr, imageBufferViewArr),
          accessors: geometryAccessorArr,
        }: SABType.sceneAssetBundleContent,
      );

    GenerateSingleSABSystem.generateSAB(
      (
        (imageBufferViewArr, geometryBufferViewArr),
        imageArrayBufferArr
        |> Js.Array.map(arrayBuffer => Uint8Array.fromBuffer(arrayBuffer)),
        geometryUint8ArrayArr,
      ),
      bufferTotalAlignedByteLength,
      jsonUint8Array,
    );
  };
};

let removeDuplicateBufferData =
    (
      dependencyRelation,
      (allRabImageNameMap, allRabGeometryNameMap),
      (sabDataArr, rabDataArr),
    ) => (
  sabDataArr
  |> Js.Array.map(((sabRelativePath, sab) as data) =>
       (
         sabRelativePath,
         SAB.removeSABDuplicateBufferData(
           dependencyRelation,
           (allRabImageNameMap, allRabGeometryNameMap),
           data,
         ),
       )
     ),
  rabDataArr
  |> Js.Array.map(((rabRelativePath, rab) as data) =>
       (
         rabRelativePath,
         RAB.removeRABDuplicateBufferData(
           dependencyRelation,
           (allRabImageNameMap, allRabGeometryNameMap),
           data,
         ),
       )
     ),
);