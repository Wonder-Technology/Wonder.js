let buildFinishRenderData =
    (~customData=Sinon.matchAny, ~imguiData=Sinon.matchAny, ()) => {
  "operateType": "FINISH_RENDER",
  "customData": customData,
  "imguiData": imguiData,
};