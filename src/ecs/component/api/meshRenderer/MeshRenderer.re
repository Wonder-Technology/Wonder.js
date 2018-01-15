open MeshRendererSystem;

open MeshRendererType;

let createMeshRenderer = create;

let getMeshRendererGameObject = (meshRenderer: meshRenderer, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(ComponentSystem.checkComponentShouldAlive(meshRenderer, isAlive, state))
        )
      ),
    StateData.stateData.isDebug
  );
  getGameObject(meshRenderer, state) |> Js.Option.getExn
};