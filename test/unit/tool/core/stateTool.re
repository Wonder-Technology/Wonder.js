let deepCopyState = (state: StateDataType.state) => State.deepCopyState(state);

let restoreFromState = (targetState, currentState) =>
  State.restoreFromState(targetState, currentState);

let getState = () => StateSystem.getState(StateData.stateData);

let createState = StateSystem.createState;

let createNewCompleteState = () => StateSystem.createState() |> GameObjectAdmin.initDataFromState;