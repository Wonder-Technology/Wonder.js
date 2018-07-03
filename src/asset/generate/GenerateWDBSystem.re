let generateWDB = (sceneGameObject, imageBase64Map, state) => (
  state,
  GenerateGLBSystem.generateGLBData(sceneGameObject, imageBase64Map, state)
  |> ConvertGLBSystem.convertGLBData,
);