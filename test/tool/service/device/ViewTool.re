open StateDataType;

let getCanvas = (state) => state.viewRecord |> ViewService.getCanvas;

let unsafeGetContextConfig = (state) => state.viewRecord |> ViewService.unsafeGetContextConfig;