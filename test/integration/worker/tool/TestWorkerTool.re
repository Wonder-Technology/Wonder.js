let clear = (sandbox) => {
  open Sinon;
  restoreSandbox(refJsObjToSandbox(sandbox^));
  RenderWorkerStateTool.getStateData().state = None
};