open MainStateDataType;

open BasicMaterialType;

let _initDataWhenCreate = (index, {colorMap} as record) =>
  ColorMapService.{...record, colorMap: setDefaultColor(index, colorMap)};

let create =
  [@bs]
  (
    ({basicMaterialRecord} as state) => {
      let {index, disposedIndexArray} = basicMaterialRecord;
      let (index, newIndex, disposedIndexArray) =
        IndexComponentService.generateIndex(index, disposedIndexArray);
      (
        {...state, basicMaterialRecord: {..._initDataWhenCreate(index, basicMaterialRecord), index: newIndex}},
        index
      )
    }
  );