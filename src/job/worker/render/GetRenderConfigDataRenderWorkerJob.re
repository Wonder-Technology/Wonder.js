let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.getState(stateData);
      let data = MessageService.getRecord(e);
      let renderConfigData = data##renderConfigData;
      state.renderConfigRecord =
        RecordRenderConfigService.create((
          renderConfigData##shaders |> Js.Json.parseExn |> Obj.magic,
          renderConfigData##shaderLibs |> Js.Json.parseExn |> Obj.magic
        ));
      e
    }
  );