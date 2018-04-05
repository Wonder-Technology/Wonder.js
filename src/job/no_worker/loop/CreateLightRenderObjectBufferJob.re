open StateDataMainType;

open RenderType;

open Js.Typed_array;

let _getLightMaterialRenderArray = (renderArray, state: StateDataMainType.state) =>
  renderArray
  |> Js.Array.filter(
       (uid) =>
         HasComponentGameObjectService.hasLightMaterialComponent(uid, state.gameObjectRecord)
     );

let execJob = (_, _, {gameObjectRecord, meshRendererRecord} as state) => {
  ...state,
  renderRecord: {
    ...state.renderRecord,
    lightRenderObjectRecord:
      state
      |> CreateRenderObjectBufferMainService.create(
           state
           |> _getLightMaterialRenderArray(
                meshRendererRecord |> RenderArrayMeshRendererService.getRenderArray
              ),
           (
             GetComponentGameObjectService.unsafeGetLightMaterialComponent,
             ShaderIndexLightMaterialMainService.getShaderIndex
           )
         )
  }
};