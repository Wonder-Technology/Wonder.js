open StateDataMainType;

let create = () => {
  scriptAPIJsObj: RecordScriptAPIMainService.create() |> Obj.magic,
  imguiAPIJsObj: RecordIMGUIAPIMainService.create(),
};