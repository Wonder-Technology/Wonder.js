let prepare = (state: StateDataMainType.state) => {
  TimeControllerTool.setStartTime(0.);

  state |> GPUDetectTool.setMaxTextureUnit(16);
};

let init = (state: StateDataMainType.state) =>
  state |> DirectorMainService._noWorkerInit;

let run = (state: StateDataMainType.state, ~time=0., ()) =>
  state |> DirectorMainService._run(time);

let runWithDefaultTime = (state: StateDataMainType.state) =>
  state |> DirectorMainService._run(0.);