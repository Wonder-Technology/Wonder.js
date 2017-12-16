let deepCopyState = State.deepCopyState;

let restoreFromState = State.restoreFromState;

let getStateData = () => State.getStateData();

let getState = () => StateSystem.getState(getStateData());

let createState = StateSystem.createState;

let createNewCompleteState = () => Main.setMainConfig(MainTool.buildMainConfig());