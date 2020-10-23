open WDDType;

let _getBatchHierachyDataWithIndexMap = (sourceTransforms, hierachyIndexMap) => {
  hierachyIndexMap
  ->ImmutableSparseMap.reducei(
      (result, childrenTransformIndices, parentTransformIndex) => {
        result->Result.mapSuccess((targetParents, targetAllChildren) => {
          Tuple2.collectResult(
            sourceTransforms->ListSt.nth(parentTransformIndex)->OptionSt.get,
            childrenTransformIndices->ListSt.traverseResultM(childrenIndices => {
              childrenIndices->ListSt.traverseResultM(index => {
                sourceTransforms->ListSt.nth(index)->OptionSt.get
              })
            }),
          )
          ->Result.mapSuccess((parent, children) => {
              ([parent, ...targetParents], [children, ...targetAllChildren])
            })
        })
      },
      ([], [])->Result.succeed,
    )
  ->Result.mapSuccess((targetParents, targetAllChildren) => {
      (targetParents->ListSt.reverse, targetAllChildren->ListSt.reverse)
    });
};

let _getBatchEntityDataWithIndexMap =
    (sourceGameObjects, sourceComponents, indexMap) => {
  indexMap
  ->ImmutableSparseMap.reducei(
      (result, componentIndex, gameObjectIndex) => {
        result->Result.mapSuccess((targetGameObjects, targetComponents) => {
          Tuple2.collectResult(
            sourceGameObjects->ListSt.nth(gameObjectIndex)->OptionSt.get,
            sourceComponents->ListSt.nth(componentIndex)->OptionSt.get,
          )
          ->Result.mapSuccess((gameObject, component) => {
              (
                [gameObject, ...targetGameObjects],
                [component, ...targetComponents],
              )
            })
        })
      },
      ([], [])->Result.succeed,
    )
  ->Result.mapSuccess((gameObjects, components) => {
      (gameObjects->ListSt.reverse, components->ListSt.reverse)
    });
};

let _getBatchEntityData =
    (
      {
        hierachyIndexMap,
        transformIndexMap,
        basicCameraViewIndexMap,
        perspectiveCameraProjectionIndexMap,
        bsdfMaterialIndexMap,
        directionLightIndexMap,
        geometryIndexMap,
      },
      (
        gameObjects,
        (
          transforms,
          geometries,
          bsdfMaterials,
          directionLights,
          basicCameraViews,
          perspectiveCameraProjections,
        ),
      ),
    ) => {
  Tuple7.collectResult(
    _getBatchHierachyDataWithIndexMap(transforms, hierachyIndexMap),
    _getBatchEntityDataWithIndexMap(
      gameObjects,
      transforms,
      transformIndexMap,
    ),
    _getBatchEntityDataWithIndexMap(
      gameObjects,
      geometries,
      geometryIndexMap,
    ),
    _getBatchEntityDataWithIndexMap(
      gameObjects,
      bsdfMaterials,
      bsdfMaterialIndexMap,
    ),
    _getBatchEntityDataWithIndexMap(
      gameObjects,
      directionLights,
      directionLightIndexMap,
    ),
    _getBatchEntityDataWithIndexMap(
      gameObjects,
      basicCameraViews,
      basicCameraViewIndexMap,
    ),
    _getBatchEntityDataWithIndexMap(
      gameObjects,
      perspectiveCameraProjections,
      perspectiveCameraProjectionIndexMap,
    ),
  );
};

let _setComponentData = (setDataFunc, createVOFunc, component, dataOpt) => {
  dataOpt
  ->OptionSt.map(createVOFunc)
  ->OptionSt.forEachResult(setDataFunc(component));
};

let _batchSetTransformData = ({transforms}, gameObjectTransforms) => {
  transforms
  ->ListSt.traverseResultMi((index, {translation, rotation, scale}) => {
      gameObjectTransforms
      ->ListSt.nth(index)
      //   ->OptionSt.map(TransformEntity.create)
      ->OptionSt.get
      ->Result.bind(transform => {
          ListResult.mergeResults([
            _setComponentData(
              ModelMatrixTransformDoService.setLocalPosition,
              PositionVO.create,
              transform,
              translation,
            ),
            _setComponentData(
              ModelMatrixTransformDoService.setLocalRotation,
              RotationVO.create,
              transform,
              rotation,
            ),
            _setComponentData(
              ModelMatrixTransformDoService.setLocalScale,
              ScaleVO.create,
              transform,
              scale,
            ),
          ])
        })
    })
  ->ListSt.ignoreTraverseResultValue;
};

let _batchSetHieracyData = (parents, allChildren) => {
  parents
  ->ListSt.traverseResultMi((index, parent) => {
      allChildren
      ->ListSt.nth(idnex)
      //   ->OptionSt.map(TransformEntity.create)
      ->OptionSt.get
      ->Result.bind(children => {
          AssembleCommonDoService.addChildrenToParent(parent, children)
        })
    })
  ->ListSt.ignoreTraverseResultValue;
};

let _batchSetBasicCameraViewData = (wdd, basicCameraViews) => {
  Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      let len =
        wdd.basicCameraViews
        ->ListSt.filter(({isActive}) => isActive === true)
        ->ListSt.length;

      test(
        Log.buildAssertMessage(
          ~expect={j|has at most one active basicCameraView|j},
          ~actual={j|has $len|j},
        ),
        () =>
        len <= 1
      );
    },
    DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
  )
  ->Result.bind(() => {
      wdd.basicCameraViews
      ->ListSt.traverseResultMi((index, {isActive}) => {
          basicCameraViews
          ->ListSt.nth(index)
          //   ->OptionSt.map(BasicCameraViewEntity.create)
          ->OptionSt.get
          ->Result.mapSuccess(cameraView => {
              isActive
                ? ActiveBasicCameraViewDoService.active(cameraView) : ()
            })
        })
    });
};

let _batchSetPerspectiveCameraProjectionData =
    (wdd, perspectiveCameraProjections) => {
  wdd.perspectiveCameraProjections
  ->ListSt.traverseResultMi((index, {near, far, fovy, aspect}) => {
      perspectiveCameraProjections
      ->ListSt.nth(index)
      //   ->OptionSt.map(PerspectiveCameraProjectionEntity.create)
      ->OptionSt.get
      ->Result.mapSuccess(cameraProjection => {
          _setComponentData(
            FrustumPerspectiveCameraProjectionDoService.setNear,
            NearVO.create,
            cameraProjection,
            near,
          );
          _setComponentData(
            FrustumPerspectiveCameraProjectionDoService.setFar,
            FarVO.create,
            cameraProjection,
            far,
          );
          _setComponentData(
            FrustumPerspectiveCameraProjectionDoService.setAspect,
            AspectVO.create,
            cameraProjection,
            aspect,
          );
          _setComponentData(
            FrustumPerspectiveCameraProjectionDoService.setFovy,
            FovyVO.create,
            cameraProjection,
            fovy,
          );
        })
    });
};

let _batchSetBSDFMaterialData = (wdd, bsdfMaterials) => {
  wdd.bsdfMaterials
  ->ListSt.traverseResultMi(
      (
        index,
        {
          diffuseColor,
          specularColor,
          specular,
          roughness,
          metalness,
          ior,
          transmission,
          diffuseMapImage,
          channelRoughnessMetallicMapImage,
          emissionMapImage,
          normalMapImage,
          transmissionMapImage,
          specularMapImage,
        },
      ) => {
      bsdfMaterials
      ->ListSt.nth(index)
      //   ->OptionSt.map(BSDFMaterialEntity.create)
      ->OptionSt.get
      ->Result.bind(material => {
          ListResult.mergeResults([
            _setComponentData(
              OperateBSDFMaterialDoService.setDiffuseColor,
              color => color->Color3VO.create->DiffuseVO.create,
              material,
              diffuseColor,
            ),
            _setComponentData(
              OperateBSDFMaterialDoService.setSpecular,
              SpecularVO.create,
              material,
              specular,
            ),
            _setComponentData(
              OperateBSDFMaterialDoService.setSpecularColor,
              color => color->Color3VO.create->SpecularColorVO.create,
              material,
              specularColor,
            ),
            _setComponentData(
              OperateBSDFMaterialDoService.setRoughness,
              RoughnessVO.create,
              material,
              roughness,
            ),
            _setComponentData(
              OperateBSDFMaterialDoService.setMetalness,
              MetalnessVO.create,
              material,
              metalness,
            ),
            _setComponentData(
              OperateBSDFMaterialDoService.setDiffuseMapImageId,
              TransmissionVO.create,
              material,
              transmission,
            ),
            _setComponentData(
              OperateBSDFMaterialDoService.setIOR,
              IORVO.create,
              material,
              ior,
            ),
          ])
        })
    });
};

let _batchSetDirectionLightData = (wdd, directionLights) => {
  wdd.directionLights
  ->ListSt.traverseResultMi((index, {color, intensity}) => {
      directionLights
      ->ListSt.nth(index)
      //   ->OptionSt.map(DirectionLightEntity.create)
      ->OptionSt.get
      ->Result.bind(light => {
          ListResult.mergeResults([
            _setComponentData(
              OperateDirectionLightDoService.setColor,
              Color3VO.create,
              light,
              color,
            ),
            _setComponentData(
              OperateDirectionLightDoService.setIntensity,
              IntensityVO.create,
              light,
              intensity,
            ),
          ])
        })
    });
};

let _batchSetComponentData =
    (
      wdd,
      (
        transforms,
        bsdfMaterials,
        directionLights,
        basicCameraViews,
        perspectiveCameraProjections,
      ),
      (parents, allChildren, gameObjectTransforms),
    ) => {
  ListResult.mergeResults([
    _batchSetTransformData(wdd, gameObjectTransforms),
    _batchSetHieracyData(parents, allChildren),
    _batchSetBasicCameraViewData(wdd, basicCameraViews),
    _batchSetPerspectiveCameraProjectionData(
      wdd,
      perspectiveCameraProjections,
    ),
    _batchSetBSDFMaterialData(wdd, bsdfMaterials),
    _batchSetDirectionLightData(wdd, directionLights),
  ]);
};

let _batchSetGeometryData = (wdd, geometries) => {
  let {positions, normals, texCoords, indices} = wdd.bufferData;

  wdd.geometries
  ->ListSt.traverseResultMi((i, {position, normal, texCoord, index}) => {
      geometries
      ->ListSt.nth(i)
      //   ->OptionSt.map(GeometryEntity.create)
      ->OptionSt.get
      ->Result.bind(geometry => {
          ListResult.mergeResults([
            _setComponentData(
              VerticesGeometryDoService.setVertices,
              VerticesVO.create,
              geometry,
              positions->ListSt.nth(position),
            ),
            normal
            ->OptionSt.get
            ->Result.bind(normal => {
                _setComponentData(
                  NormalsGeometryDoService.setNormals,
                  NormalsVO.create,
                  geometry,
                  normals->ListSt.nth(normal),
                )
              }),
            texCoord
            ->OptionSt.get
            ->Result.bind(texCoord => {
                _setComponentData(
                  TexCoordsGeometryDoService.setTexCoords,
                  TexCoordsVO.create,
                  geometry,
                  texCoords->ListSt.nth(texCoord),
                )
              }),
            _setComponentData(
              IndicesGeometryDoService.setIndices,
              IndicesVO.create,
              geometry,
              indices->ListSt.nth(index),
            ),
          ])
        })
    });
};

let _generateImageIdFromImageIndex = imageIndex =>
  imageIndex->Belt.Int.toString->ImageIdVO.create;

let _batchSetMapImageData =
    (setMapImageIdFunc, bsdfMaterials, mapImageIndexMap) => {
  mapImageIndexMap->ListSt.traverseResultMi((materialIndex, imageIndex) => {
    let imageId = imageIndex->_generateImageIdFromImageIndex;

    Tuple2.collectResult(
      bsdfMaterials->ListSt.nth(materialIndex)->OptionSt.get,
      images->ListSt.nth(imageIndex)->OptionSt.get,
    )
    ->Result.mapSuccess((material, imageData) => {
        setMapImageIdFunc(material, imageId);

        OperateImageDoService.setData(imageId, imageData);
      });
  });
};

let _batchSetImageData = ({bufferData, indexMapData}, bsdfMaterials) => {
  let {images} = bufferData;
  let {materialIndexMapData} = indexMapData;

  ListResult.mergeResults([
    _batchSetMapImageData(
      OperateBSDFMaterialDoService.setDiffuseMapImageId,
      bsdfMaterials,
      materialIndexMapData.diffuseMapImageIndexMap,
    ),
    _batchSetMapImageData(
      OperateBSDFMaterialDoService.setChannelRoughnessMetallicMapImageId,
      bsdfMaterials,
      materialIndexMapData.channelRoughnessMetallicMapImageIndexMap,
    ),
    _batchSetMapImageData(
      OperateBSDFMaterialDoService.setEmissionMapImageId,
      bsdfMaterials,
      materialIndexMapData.emissionMapImageIndexMap,
    ),
    _batchSetMapImageData(
      OperateBSDFMaterialDoService.setNormalMapImageId,
      bsdfMaterials,
      materialIndexMapData.normalMapImageIndexMap,
    ),
    _batchSetMapImageData(
      OperateBSDFMaterialDoService.setTransmissionMapImageId,
      bsdfMaterials,
      materialIndexMapData.transmissionMapImageIndexMap,
    ),
    _batchSetMapImageData(
      OperateBSDFMaterialDoService.setSpecularMapImageId,
      bsdfMaterials,
      materialIndexMapData.specularMapImageIndexMap,
    ),
  ]);
};

let _batchSetBufferData = (wdd, (geometries, bsdfMaterials)) => {
  ListResult.mergeResults([
    _batchSetGeometryData(wdd, geometries),
    _batchSetImageData(wdd, bsdfMaterials),
  ]);
};

let batchOperate =
    (
      {gameObjectComponentIndexMapData, materialIndexMapData} as wdd,
      (
        gameObjects,
        (
          transforms,
          geometries,
          bsdfMaterials,
          directionLights,
          basicCameraViews,
          perspectiveCameraProjections,
        ),
      ),
    ) => {
  _getBatchEntityData(
    gameObjectComponentIndexMapData,
    (
      gameObjects,
      (
        transforms,
        geometries,
        bsdfMaterials,
        directionLights,
        basicCameraViews,
        perspectiveCameraProjections,
      ),
    ),
  )
  ->Result.bind(
      (
        (parents, allChildren),
        (transformGameObjects, gameObjectTransforms),
        (geometryGameObjects, gameObjectGeometries),
        (bsdfMaterialGameObjects, gameObjectBSDFMaterials),
        (directionLightGameObjects, gameObjectDirectionLights),
        (basicCameraViewGameObjects, gameObjectBasicCameraViews),
        (
          perspectiveCameraProjectionGameObjects,
          gameObjectPerspectiveCameraProjections,
        ),
      ) => {
      ListResult.mergeResults([
        _batchSetComponentData(
          wdd,
          (
            transforms,
            bsdfMaterials,
            directionLights,
            basicCameraViews,
            perspectiveCameraProjections,
          ),
          (parents, allChildren, gameObjectTransforms),
        ),
        _batchSetBufferData(wdd, (geometries, bsdfMaterials)),
        BatchAddComponentsDoService.batchAddComponents(
          wdd,
          (
            transformGameObjects,
            gameObjectTransforms,
            geometryGameObjects,
            gameObjectGeometries,
            basicCameraViewGameObjects,
            gameObjectBasicCameraViews,
            perspectiveCameraProjectionGameObjects,
            gameObjectPerspectiveCameraProjection,
            bsdfMaterialGameObjects,
            gameObjectBSDFMaterials,
            directionLightGameObjects,
            gameObjectDirectionLights,
          ),
        ),
      ])
    })
  ->Result.mapSuccess(() => gameObjects);
};
