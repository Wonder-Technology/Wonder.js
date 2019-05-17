open WorkerJobType;

open JobType;

let getExecutableJob = (jobs, jobItemName) =>
  JobConfigService.unsafeFindFirst(jobs, jobItemName, ({name: jobName}: job) =>
    JobConfigService.filterTargetName(jobName, jobItemName)
  );

let _addHandleFuncStream = (action, handleFuncStream, handleFuncStreamArr) =>
  switch (action) {
  | BEFORE =>
    handleFuncStreamArr |> Js.Array.unshift(handleFuncStream) |> ignore;
    handleFuncStreamArr;
  | AFTER => handleFuncStreamArr |> ArrayService.push(handleFuncStream)
  };

let _buildStream = (stateData, customHandle) =>
  MostUtils.callFunc(() => {
    customHandle(stateData);
    None;
  });

let rec _addSourceJobAllCustomJobHandleStreams =
        (
          subJobName,
          workerCustomMainLoopTargetJobMap,
          stateData,
          handleFuncStreamArr,
        ) =>
  switch (
    workerCustomMainLoopTargetJobMap
    |> WonderCommonlib.MutableHashMapService.get(subJobName)
  ) {
  | None => handleFuncStreamArr
  | Some((customJobName, action, handleFunc)) =>
    _addHandleFuncStream(
      action,
      handleFunc |> _buildStream(stateData),
      handleFuncStreamArr,
    )
    |> _addSourceJobAllCustomJobHandleStreams(
         customJobName,
         workerCustomMainLoopTargetJobMap,
         stateData,
       )
  };

let addCustomJobHandleToStreamArr =
    (
      subJobName,
      handleFuncStreamArr,
      workerCustomMainTargetJobMap,
      stateData,
      streamArr,
    ) =>
  ArrayService.fastConcat(
    streamArr,
    _addSourceJobAllCustomJobHandleStreams(
      subJobName,
      workerCustomMainTargetJobMap,
      stateData,
      handleFuncStreamArr,
    ),
  );