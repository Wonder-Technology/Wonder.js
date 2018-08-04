open StateDataMainType;

open SceneType;

let getRecord = state => state.sceneRecord |> OptionService.unsafeGet;

let create = state => {
  let (state, sceneGameObject) = CreateGameObjectMainService.create(state);

  {
    ...state,
    sceneRecord:
      Some({
        ambientLight: {
          color: AmbientLightService.getDefaultColor(),
        },
        sceneGameObject,
      }),
  };
};