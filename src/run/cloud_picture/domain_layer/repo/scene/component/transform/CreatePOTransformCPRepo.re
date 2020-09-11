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
  /*! shouldn't use traverseResultM! it will cause max size stack err!*/
  ->ListSt.reduce(Result.succeed(), (result, index) => {
      result->Result.bind(() => {
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
    })
  ->Result.mapSuccess(() => {
      (localToWorldMatrices, localPositions, localRotations, localScales)
    });

let _initBufferData = (count, defaultDataTuple) => {
  BufferTransformCPRepoUtils.createBuffer(count)
  ->Result.bind(buffer => {
      CreateTypeArrayTransformCPRepoUtils.createTypeArrays(buffer, count)
      ->_setAllTypeArrDataToDefault(count, defaultDataTuple)
      ->Result.mapSuccess(typeArrData => {(buffer, typeArrData)})
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
