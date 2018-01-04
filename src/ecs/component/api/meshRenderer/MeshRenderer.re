open MeshRendererSystem;

open MeshRendererType;

open Contract;

let createMeshRenderer = create;

let getMeshRendererGameObject = (meshRenderer: meshRenderer, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(ComponentSystem.checkComponentShouldAlive(meshRenderer, isAlive, state))
  );
  getGameObject(meshRenderer, state) |> Js.Option.getExn
};