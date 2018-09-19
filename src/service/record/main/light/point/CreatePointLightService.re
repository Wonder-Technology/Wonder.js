open PointLightType;

let create =
  (. {index, disposedIndexArray} as record) => {
    let (index, newIndex, disposedIndexArray) =
      IndexComponentService.generateIndex(index, disposedIndexArray);

    let record =
      {...record, index: newIndex}
      |> OperatePointLightService.setIsRender(index, true);

    record.renderLightArr
    |> CountLightService.getLightCount
    |> CountLightService.checkNotExceedMaxCount(
         _,
         BufferPointLightService.getBufferMaxCount(),
       )
    |> ignore;

    (record, index);
  };