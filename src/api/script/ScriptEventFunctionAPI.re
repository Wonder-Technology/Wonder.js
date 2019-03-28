open StateDataMainType;

let _createScriptEventFunction = funcInJsObj =>
  switch (Js.Nullable.toOption(funcInJsObj)) {
  | None => ((. script, scriptAPIJsObj, state) => state)
  | Some(func) => func
  };

let createScriptEventFunctionData =
    (jsObj: eventFunctionDataJsObj): eventFunctionData => {
  init: _createScriptEventFunction(jsObj##init),
  update: _createScriptEventFunction(jsObj##update),
  dispose: _createScriptEventFunction(jsObj##dispose),
};


let setScriptInitEventFunction =
    (jsObj: eventFunctionDataJsObj, state) => {
  /* init: _createScriptEventFunction(jsObj##init),
  update: _createScriptEventFunction(jsObj##update),
  dispose: _createScriptEventFunction(jsObj##dispose), */
};