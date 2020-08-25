let _setAllTypeArrDataToDefault =
    (
      (localToWorldMatrices, localPositions, localRotations, localScales),
      count,
      (
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
        defaultLocalRotation,
        defaultLocalScale,
      ),
    ) =>
  ListSt.range(0, count - 1)
  ->ListSt.traverseResultM(index => {
      OperateTypeArrayTransformRepoUtils.setLocalToWorldMatrix(
        index,
        defaultLocalToWorldMatrix,
        localToWorldMatrices,
      )
      ->Result.bind(() => {
          OperateTypeArrayTransformRepoUtils.setLocalPosition(
            index,
            defaultLocalPosition,
            localPositions,
          )
          ->Result.bind(() => {
              OperateTypeArrayTransformRepoUtils.setLocalRotation(
                index,
                defaultLocalRotation,
                localRotations,
              )
              ->Result.bind(() => {
                  OperateTypeArrayTransformRepoUtils.setLocalScale(
                    index,
                    defaultLocalScale,
                    localScales,
                  )
                })
            })
        })
    })
  ->ListSt.ignoreTraverseResultValue;

let _initBufferData = (count, defaultDataTuple) => {
  BufferTransformRepoUtils.createBuffer(count)
  ->Result.bind(buffer => {
      let (localToWorldMatrices, localPositions, localRotations, localScales) =
        CreateTypeArrayTransformRepoUtils.createTypeArrays(buffer, count);

      (localToWorldMatrices, localPositions, localRotations, localScales)
      ->_setAllTypeArrDataToDefault(count, defaultDataTuple)
      ->Result.mapSuccess(() => {
          (
            buffer,
            (
              localToWorldMatrices,
              localPositions,
              localRotations,
              localScales,
            ),
          )
        });
    });
};

let createPO = () => {
  BufferSettingRepo.getTransformCount()
  ->Result.bind(transformCount => {
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

      _initBufferData(
        transformCount,
        (
          defaultLocalToWorldMatrix,
          defaultLocalPosition,
          defaultLocalRotation,
          defaultLocalScale,
        ),
      )
      ->Result.mapSuccess(
          (
            (
              buffer,
              (
                localToWorldMatrices,
                localPositions,
                localRotations,
                localScales,
              ),
            ),
          ) => {
          (
            {
              maxIndex: 0,
              buffer,
              localToWorldMatrices,
              localPositions,
              localRotations,
              localScales,
              defaultLocalToWorldMatrix,
              defaultLocalPosition,
              defaultLocalRotation,
              defaultLocalScale,
              parentMap:
                CreateMapComponentRepoUtils.createEmptyMap(transformCount),
              childrenMap:
                CreateMapComponentRepoUtils.createEmptyMap(transformCount),
              gameObjectMap:
                CreateMapComponentRepoUtils.createEmptyMap(transformCount),
              dirtyMap:
                CreateMapComponentRepoUtils.createEmptyMap(transformCount),
            }: TransformPOType.transform
          )
        });
    });
};
