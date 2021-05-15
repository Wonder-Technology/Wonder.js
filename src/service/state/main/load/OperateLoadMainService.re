open StateDataMainType;

let markCanExecScriptAllEventFunction =
    (canExecScriptAllEventFunction, {loadRecord} as state) => {
  {
    ...state,
    loadRecord: {
      ...loadRecord,
      canExecScriptAllEventFunction,
    },
  };
};

let getCanExecScriptAllEventFunction = ({loadRecord} as state) =>
  loadRecord.canExecScriptAllEventFunction;
