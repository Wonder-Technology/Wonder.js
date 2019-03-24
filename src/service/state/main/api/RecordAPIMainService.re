open StateDataMainType;

let create = () => {
  scriptAPIJsObj: RecordScriptAPIMainService.create(),
  imguiAPIJsObj: RecordIMGUIAPIMainService.create(),
};