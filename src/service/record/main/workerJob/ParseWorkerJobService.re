open WorkerJobType;

let convertSettingToRecord = (setting) => {
  open WonderBsJson.Json;
  open Decode;
  let json = setting;
  {
    workerFileDir: json |> field("worker_file_dir", string),
    mainInitPipeline: json |> field("main_init_pipeline", string),
    mainLoopPipeline: json |> field("main_loop_pipeline", string),
    workerPipeline: json |> field("worker_pipeline", string)
  }
};

let convertMainInitPipelinesToRecord = (pipelines) =>
  WonderBsJson.Json.(
    Decode.(
      pipelines
      |> array(
           fun (json) => (
             {
               name: json |> field("name", string),
               jobs:
                 json
                 |> field(
                      "jobs",
                      (json) =>
                        json
                        |> array(
                             fun (json) => (
                               {
                                 name: json |> field("name", string),
                                 link: json |> field("link", string),
                                 jobs:
                                   json
                                   |> field(
                                        "jobs",
                                        (json) =>
                                          json
                                          |> array(
                                               fun (json) => (
                                                 {name: json |> field("name", string)}: mainInitPipelineSubJob
                                               )
                                             )
                                      )
                               }: mainInitPipelineJob
                             )
                           )
                    )
             }: mainInitPipeline
           )
         )
    )
  );

let convertMainLoopPipelinesToRecord = (pipelines) =>
  WonderBsJson.Json.(
    Decode.(
      pipelines
      |> array(
           fun (json) => (
             {
               name: json |> field("name", string),
               jobs:
                 json
                 |> field(
                      "jobs",
                      (json) =>
                        json
                        |> array(
                             fun (json) => (
                               {
                                 name: json |> field("name", string),
                                 link: json |> field("link", string),
                                 jobs:
                                   json
                                   |> field(
                                        "jobs",
                                        (json) =>
                                          json
                                          |> array(
                                               fun (json) => (
                                                 {name: json |> field("name", string)}: mainLoopPipelineSubJob
                                               )
                                             )
                                      )
                               }: mainLoopPipelineJob
                             )
                           )
                    )
             }: mainLoopPipeline
           )
         )
    )
  );

let convertWorkerPipelinesToRecord = (pipelines) =>
  WonderBsJson.Json.(
    Decode.(
      pipelines
      |> array(
           (json) => {
             name: json |> field("name", string),
             jobs:
               json
               |> field(
                    "jobs",
                    (json) => {
                      render:
                        json
                        |> field(
                             "render",
                             (json) =>
                               json
                               |> array(
                                    (json) =>
                                      json
                                      |> array((json) => {name: json |> field("name", string)})
                                  )
                           )
                    }
                  )
           }
         )
    )
  );

let _convertJobsToRecord = (jobs) =>
  WonderBsJson.Json.(
    Decode.(
      jobs
      |> array(
           (json) => {
             name: json |> field("name", string),
             flags: json |> optional(field("flags", (json) => json |> array(string)))
           }
         )
    )
  );

let convertMainInitJobsToRecord = (jobs) => _convertJobsToRecord(jobs);

let convertMainLoopJobsToRecord = (jobs) => _convertJobsToRecord(jobs);

let convertWorkerJobsToRecord = (jobs) => _convertJobsToRecord(jobs);