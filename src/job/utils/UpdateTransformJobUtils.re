let execJob = (index, globalTempRecord, transformRecord) => {
  for (i in 0 to index - 1) {
    transformRecord |> UpdateTransformMainService.update(i, globalTempRecord) |> ignore
  };
  transformRecord
};