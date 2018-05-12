open BrowserDetectType;

let setChrome = () => {
  let state = MainStateTool.unsafeGetState();
  let state = {...state, browserDetectRecord: {browser: Chrome}};
  MainStateTool.setState(state)
};

let setFirefox = () => {
  let state = MainStateTool.unsafeGetState();
  let state = {...state, browserDetectRecord: {browser: Firefox}};
  MainStateTool.setState(state)
};