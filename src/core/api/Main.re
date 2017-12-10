open MainSystem;

open StateSystem;

let setMainConfig = (config: Js.t({..})) =>
  createState()
  |> setConfig(config)
  |> init;