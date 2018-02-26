open RenderWorkerStateDataType;

let convertPipelineJobsToRecord = (jobs) =>
  Json.(
    Decode.(
      jobs
      |> array(
           (json) =>
             json |> array(fun (json) => ({name: json |> field("name", string)}: pipelineJob))
         )
    )
  );

let convertJobsToRecord = (jobs) =>
  Json.(
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