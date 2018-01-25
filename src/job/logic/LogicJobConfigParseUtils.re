open StateDataType;

open LogicJobConfigType;

let convertLogicSettingToRecord = (update_setting) => {
  open Json;
  open Decode;
  let json = update_setting;
  {
    init_pipeline: json |> field("init_pipeline", string),
    update_pipeline: json |> field("update_pipeline", string)
  }
};

let _convertPipelinesToRecord = (pipelines) =>
  Json.(
    Decode.(
      pipelines
      |> array(
           (json) => {
             name: json |> field("name", string),
             jobs:
               json
               |> field(
                    "jobs",
                    array(fun (json) => ({name: json |> field("name", string)}: jobItem))
                  )
           }
         )
    )
  );

let _convertJobsToRecord = (jobs) =>
  Json.(Decode.(jobs |> array(fun (json) => ({name: json |> field("name", string)}: job))));

let convertInitPipelinesToRecord = (init_pipelines) => _convertPipelinesToRecord(init_pipelines);

let convertInitJobsToRecord = (init_jobs) => _convertJobsToRecord(init_jobs);

let convertUpdatePipelinesToRecord = (update_pipelines) =>
  _convertPipelinesToRecord(update_pipelines);

let convertUpdateJobsToRecord = (update_jobs) => _convertJobsToRecord(update_jobs);