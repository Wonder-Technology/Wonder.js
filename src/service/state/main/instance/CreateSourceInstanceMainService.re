open StateDataMainType;

open IndexComponentService;

open SourceInstanceType;

let create = ({settingRecord} as state) => {
  let {index, disposedIndexArray, objectInstanceTransformIndexMap} as record =
    RecordSourceInstanceMainService.getRecord(state);
  let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray);
  state.sourceInstanceRecord =
    Some({
      ...record,
      index: newIndex,
      disposedIndexArray,
      objectInstanceTransformIndexMap:
        ObjectInstanceCollectionService.setDefaultObjectInstanceTransformIndex(
          index,
          objectInstanceTransformIndexMap
        )
    });
  (state, index)
};