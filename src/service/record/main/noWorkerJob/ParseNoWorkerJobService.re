open NoWorkerJobType;

let convertSettingToRecord = (loop_setting) => {
  open WonderBsJson.Json;
  open Decode;
  let json = loop_setting;
  {
    initPipeline: json |> field("init_pipeline", string),
    loopPipeline: json |> field("loop_pipeline", string)
  }
};

let _convertPipelinesToRecord = (pipelines) =>
  WonderBsJson.Json.(
    Decode.(
      pipelines
      |> array(
           (json) => {
             name: json |> field("name", string),
             jobs: json |> field("jobs", array((json) => {name: json |> field("name", string)}))
           }
         )
    )
  );

let _convertJobsToRecord = (jobs) =>
  WonderBsJson.Json.(
    Decode.(
      jobs
      |> array(
           fun (json) => (
             {
               name: json |> field("name", string),
               flags: json |> optional(field("flags", (json) => json |> array(string)))
             }: job
           )
         )
    )
  );

let convertInitPipelinesToRecord = (init_pipelines) => _convertPipelinesToRecord(init_pipelines);

let convertInitJobsToRecord = (init_jobs) => _convertJobsToRecord(init_jobs);

let convertLoopPipelinesToRecord = (loop_pipelines) => _convertPipelinesToRecord(loop_pipelines);

let convertLoopJobsToRecord = (loop_jobs) => _convertJobsToRecord(loop_jobs);