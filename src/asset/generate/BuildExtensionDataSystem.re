let buildExtensionsUsed = lightDataArr =>
  lightDataArr |> Js.Array.length > 0 ? [|"KHR_lights"|] : [||];