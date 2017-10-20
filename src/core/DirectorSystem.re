open StateDataType;

open StateSystem;

let getScene (state: StateDataType.state) => getOptionValueFromState state.directorData.scene;

let start (state: StateDataType.state) => {};

let initData (state: StateDataType.state) => {
  let (state, scene) = SceneSystem.create state;
  {...state, directorData: {scene: Some scene}}
};