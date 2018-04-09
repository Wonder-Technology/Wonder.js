let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let renderConfigData = data##renderConfigData;
      state.renderConfigRecord =
        RecordRenderConfigService.create((
          renderConfigData##shaders |> Js.Json.parseExn |> Obj.magic,
          renderConfigData##shaderLibs |> Js.Json.parseExn |> Obj.magic
        ));
      StateRenderWorkerService.setState(stateData, state) |> ignore;
      e
    }
  );