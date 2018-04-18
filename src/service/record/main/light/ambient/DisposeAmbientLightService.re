open AmbientLightType;

open DisposeComponentService;

let isAlive = (light, record) =>
  DisposeLightService.isAlive(light, IndexAmbientLightService.getMappedIndexMap(record));

let _disposeData =
  [@bs]
  (
    (sourceIndex, {index, colors, gameObjectMap, mappedIndexMap} as record) => {
      let gameObjectMap = DisposeLightService.disposeData(sourceIndex, gameObjectMap);
      let colorDataSize = BufferAmbientLightService.getColorsSize();
      let lastComponentIndex = pred(index);
      let mappedSourceIndex = mappedIndexMap |> MappedIndexService.getMappedIndex(sourceIndex);
      {
        ...record,
        index: pred(index),
        mappedIndexMap:
          DisposeLightService.setMappedIndexMap(
            sourceIndex,
            mappedSourceIndex,
            lastComponentIndex,
            mappedIndexMap
          ),
        colors:
          colors
          |> DisposeLightService.swapData(
               (mappedSourceIndex, lastComponentIndex),
               (mappedIndexMap, colorDataSize, RecordAmbientLightMainService.getDefaultColor()),
               DisposeTypeArrayService.deleteBySwapAndResetFloat32TypeArr
             ),
        gameObjectMap
      }
    }
  );

let handleBatchDisposeComponent =
  [@bs]
  (
    (lightArray, record) =>
      DisposeLightService.handleBatchDisposeComponent(lightArray, (isAlive, _disposeData), record)
  );