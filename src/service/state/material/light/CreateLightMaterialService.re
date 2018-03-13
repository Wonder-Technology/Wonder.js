open MaterialType;

open StateDataType;

open LightMaterialType;

let _setDefaultShininess = (index: int, map) =>
  map |> WonderCommonlib.SparseMapSystem.set(index, 32.);

let _initDataWhenCreate = (index, {diffuseColorMap, specularColorMap, shininessMap} as record) =>
  ColorMapService.{
    ...record,
    diffuseColorMap: setDefaultColor(index, diffuseColorMap),
    specularColorMap: setDefaultColor(index, specularColorMap),
    shininessMap: _setDefaultShininess(index, shininessMap)
  };

let create =
  [@bs]
  (
    ({lightMaterialRecord} as state) => {
      let {index, disposedIndexArray} = lightMaterialRecord;
      let (index, newIndex, disposedIndexArray) =
        IndexComponentService.generateIndex(index, disposedIndexArray);
      (
        {
          ...state,
          lightMaterialRecord: {
            ..._initDataWhenCreate(index, lightMaterialRecord),
            index: newIndex
          }
        },
        index
      )
    }
  );