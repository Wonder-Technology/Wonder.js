open StateDataRenderWorkerType;

open RenderWorkerRenderType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      state.renderRecord.cameraRecord = (
        switch (data##renderData##camera |> Js.Nullable.to_opt) {
        | None => None
        | Some(cameraData) =>
          Some({
            vMatrix: cameraData##vMatrix,
            pMatrix: cameraData##pMatrix,
            position: cameraData##position
          })
        }
      );
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );