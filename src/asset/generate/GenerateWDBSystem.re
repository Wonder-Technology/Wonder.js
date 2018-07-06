let generateWDB = (rootGameObject, imageBase64Map, state) => (
  state,
  GenerateGLBSystem.generateGLBData(rootGameObject, imageBase64Map, state)
  |> ConvertGLBSystem.convertGLBData,
);