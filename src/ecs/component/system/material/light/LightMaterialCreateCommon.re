open MaterialType;

open StateDataType;

open LightMaterialType;

let _setDefaultShininess = (index: int, map) =>
  map |> WonderCommonlib.SparseMapSystem.set(index, 32.);

let _initDataWhenCreate = (index, {diffuseColorMap, specularColorMap, shininessMap} as data) =>
  MaterialCreateCommon.{
    ...data,
    diffuseColorMap: setDefaultColor(index, diffuseColorMap),
    specularColorMap: setDefaultColor(index, specularColorMap),
    shininessMap: _setDefaultShininess(index, shininessMap)
  };

let create =
  [@bs]
  (
    (state: StateDataType.state) => {
      let {index, disposedIndexArray} as data = LightMaterialStateCommon.getMaterialData(state);
      let (index, newIndex, disposedIndexArray) = MaterialCreateCommon.create(index, disposedIndexArray);
      (
        {...state, lightMaterialData: {..._initDataWhenCreate(index, data), index: newIndex}},
        index
      )
    }
  );