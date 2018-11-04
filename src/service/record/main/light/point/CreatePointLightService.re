open PointLightType;

let create = (isRenderLight, {index, disposedIndexArray} as record) => {
  let (index, newIndex, disposedIndexArray) =
    IndexComponentService.generateIndex(index, disposedIndexArray);

  let record = {...record, index: newIndex};

  let record =
    isRenderLight ?
      record |> OperatePointLightService.setIsRender(index, true) : record;

  record.renderLightArr
  |> CountLightService.getLightCount
  |> CountLightService.checkNotExceedMaxCount(
       _,
       BufferPointLightService.getBufferMaxCount(),
     )
  |> ignore;

  (record, index);
};