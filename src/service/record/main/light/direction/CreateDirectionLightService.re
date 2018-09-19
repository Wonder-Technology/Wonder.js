open DirectionLightType;

let create =
  (. {index, disposedIndexArray} as record) => {
    let (index, newIndex, disposedIndexArray) =
      IndexComponentService.generateIndex(index, disposedIndexArray);

    let record =
      {...record, index: newIndex}
      |> OperateDirectionLightService.setIsRender(index, true);

    record.renderLightArr
    |> CountLightService.getLightCount
    |> CountLightService.checkNotExceedMaxCount(
         _,
         BufferDirectionLightService.getBufferMaxCount(),
       )
    |> ignore;

    (record, index);
  };