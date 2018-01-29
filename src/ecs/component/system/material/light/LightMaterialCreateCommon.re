open MaterialType;
open StateDataType;

open LightMaterialType;

let _initDataWhenCreate = (index, {diffuseColorMap, specularColorMap} as data) =>
  MaterialCreateCommon.{
    ...data,
    diffuseColorMap: setDefaultColor(index, diffuseColorMap),
    specularColorMap: setDefaultColor(index, specularColorMap)
  };

let create =
  [@bs]
  (
    (state: StateDataType.state) => {
      let {index, disposedIndexArray} as data = LightMaterialStateCommon.getMaterialData(state);
      let (index, newIndex) = MaterialCreateCommon.create(index, disposedIndexArray);
      (
        {...state, lightMaterialData: {..._initDataWhenCreate(index, data), index: newIndex}},
        index
      )
    }
  );