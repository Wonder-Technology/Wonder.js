open MaterialType;

open StateDataType;

open BasicMaterialType;

let _initDataWhenCreate = (index, {colorMap} as data) =>
  MaterialCreateCommon.{...data, colorMap: setDefaultColor(index, colorMap)};

let create =
  [@bs]
  (
    (state: StateDataType.state) => {
      let {index, disposedIndexArray} as data = BasicMaterialStateCommon.getMaterialData(state);
      let (index, newIndex, disposedIndexArray) = MaterialCreateCommon.create(index, disposedIndexArray);
      (
        {...state, basicMaterialData: {..._initDataWhenCreate(index, data), index: newIndex}},
        index
      )
    }
  );