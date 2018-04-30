open WorkerJobType;

open JobType;

let getExecutableJob = (jobs, jobItemName) =>
  JobConfigService.unsafeFindFirst(
    jobs,
    jobItemName,
    ({name: jobName}: job) => JobConfigService.filterTargetName(jobName, jobItemName)
  );

let _addHandleFuncToList = (action, handleFunc, handleList) =>
  switch action {
  | BEFORE => [handleFunc, ...handleList]
  | AFTER => handleList @ [handleFunc]
  };

let rec _findAllCustomJobHandles = (subJobName, workerCustomMainLoopTargetJobMap, handleList) =>
  switch (workerCustomMainLoopTargetJobMap |> WonderCommonlib.HashMapService.get(subJobName)) {
  | None => handleList
  | Some((customJobName, action, handleFunc)) =>
    _addHandleFuncToList(action, handleFunc, handleList)
    |> _findAllCustomJobHandles(customJobName, workerCustomMainLoopTargetJobMap)
  };

let _buildCustomStreamArr = (customJobHandleList, stateData) =>
  customJobHandleList
  |> List.fold_left(
       (streamArr, customHandle) =>
         streamArr
         |> ArrayService.push(
              MostUtils.callFunc(
                () => {
                  customHandle(stateData);
                  None
                }
              )
            ),
       [||]
     );

let addCustomJobHandleToStreamArr =
    (subJobName, workerCustomMainTargetJobMap, stateData, streamArr) =>
  switch (_findAllCustomJobHandles(subJobName, workerCustomMainTargetJobMap, [])) {
  | list when list |> List.length === 0 => streamArr
  | list => streamArr |> Js.Array.concat(_buildCustomStreamArr(list, stateData))
  };