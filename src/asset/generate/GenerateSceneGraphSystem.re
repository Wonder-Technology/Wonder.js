open StateDataMainType;

let generateGLBData = (sceneGameObject, imageBase64Map, state) =>
  GenerateGLBSystem.generateGLBData(sceneGameObject, imageBase64Map, state);

let generateWDB = (sceneGameObject, imageBase64Map, state) =>
  GenerateWDBSystem.generateWDB(sceneGameObject, imageBase64Map, state);