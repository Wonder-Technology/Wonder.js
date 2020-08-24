let _setAllTypeArrDataToDefault =
    (
      (localToWorldMatrices, localPositions, localRotations, localScales),
      count: int,
      (
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
        defaultLocalRotation,
        defaultLocalScale,
      ),
    ) =>
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (localToWorldMatrices, localPositions, localRotations, localScales),
         index,
       ) =>
         (
           setLocalToWorldMatrix(
             index,
             defaultLocalToWorldMatrix,
             localToWorldMatrices,
           ),
           setLocalPosition(index, defaultLocalPosition, localPositions),
           setLocalRotation(index, defaultLocalRotation, localRotations),
           setLocalScale(index, defaultLocalScale, localScales),
         ),
       (localToWorldMatrices, localPositions, localRotations, localScales),
     );

let _initBufferData = (count, defaultDataTuple) => {
  BufferTransformRepo.createBuffer(count)
  ->Result.bind(buffer => {
      let (localToWorldMatrices, localPositions, localRotations, localScales) =
        CreateTypeArrayTransformService.createTypeArrays(buffer, count);

      (
        buffer,
        localToWorldMatrices,
        localPositions,
        localRotations,
        localScales,
      )
      ->_setAllTypeArrDataToDefault(count, defaultDataTuple);
    });
};

let createPO = () => {
  let transformCount = BufferSettingRepo.getTransformCount();

  let defaultLocalToWorldMatrix = (
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
  );
  let defaultLocalPosition = (0., 0., 0.);
  let defaultLocalRotation = (0., 0., 0., 1.);
  let defaultLocalScale = (1., 1., 1.);
  ();
};
