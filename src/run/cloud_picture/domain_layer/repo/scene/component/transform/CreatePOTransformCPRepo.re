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
      OperateTypeArrayTransformCPRepoUtils.setLocalToWorldMatrix(
        index,
        defaultLocalToWorldMatrix,
        localToWorldMatrices,
      )
      ->Result.bind(() => {
          OperateTypeArrayTransformCPRepoUtils.setLocalPosition(
            index,
            defaultLocalPosition,
            localPositions,
          )
          ->Result.bind(() => {
              OperateTypeArrayTransformCPRepoUtils.setLocalRotation(
                index,
                defaultLocalRotation,
                localRotations,
              )
              ->Result.bind(() => {
                  OperateTypeArrayTransformCPRepoUtils.setLocalScale(
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
  BufferTransformCPRepoUtils.createBuffer(count)
  ->Result.bind(buffer => {
      let (localToWorldMatrices, localPositions, localRotations, localScales) =
        CreateTypeArrayTransformCPRepoUtils.createTypeArrays(buffer, count);

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
  let transformCount = POConfigCPRepo.getTransformCount();

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
          (localToWorldMatrices, localPositions, localRotations, localScales),
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
            CreateMapComponentCPRepoUtils.createEmptyMap(transformCount),
          childrenMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(transformCount),
          gameObjectMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(transformCount),
          dirtyMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(transformCount),
        }: TransformCPPOType.transform
      )
    });
};
