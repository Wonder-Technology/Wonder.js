let deepCopyState = State.deepCopyState;

let restore = State.restoreState;

let getStateData = () => State.getStateData();

let getState = () => StateSystem.getState(getStateData());

let createState = StateSystem.createState;

let createNewCompleteState = () => Main.setMainConfig(MainTool.buildMainConfig());