open StateDataType;

let handleGetNoneJob = (name, jobHandleMap) =>
  WonderLog.Log.fatal(
    WonderLog.Log.buildFatalMessage(
      ~title="get no job",
      ~description={j|can't find job handle function whose job name is $name|j},
      ~reason="",
      ~solution={j|make sure that the job name defined in config data be correctly|j},
      ~params="jobHandleMap:" ++ WonderLog.Log.getJsonStr(jobHandleMap) ++ {j|
name: $name|j}
    )
  );

let addJob = ((targetJobName: string, afterJobName: string, targetHandleFunc), jobList) =>
  afterJobName |> Js.String.length === 0 ?
    [(targetJobName, targetHandleFunc), ...jobList] :
    jobList
    |> List.fold_left(
         (list, (jobName, handleFunc) as jobItem) =>
           jobName === afterJobName ?
             list @ [jobItem, (targetJobName, targetHandleFunc)] : list @ [jobItem],
         []
       );

let removeJob = (targetJobName: string, jobList) =>
  jobList |> List.filter(((jobName, handleFunc)) => jobName !== targetJobName);