let getRenderData = RenderDataSystem._getRenderData;

let unsafeGetRenderArrayFromState = (state) =>
  state |> RenderDataSystem.getRenderArrayFromState |> Js.Option.getExn;