open DirectionLightType;

let create =
  (isRenderLight, {index, disposedIndexArray} as record) => {
    let (index, newIndex, disposedIndexArray) =
      IndexComponentService.generateIndex(index, disposedIndexArray);

    let record = {...record, index: newIndex};

    let record =
      isRenderLight ?
        record |> OperateDirectionLightService.setIsRender(index, true) :
        record;

    record.renderLightArr
    |> CountLightService.getLightCount
    |> CountLightService.checkNotExceedMaxCount(
         _,
         BufferDirectionLightService.getBufferMaxCount(),
       )
    |> ignore;

    (record, index);
  };