open StateDataMainType;

let generateGLBData = (rootGameObject, imageBase64Map, state) =>
  GenerateGLBSystem.generateGLBData(rootGameObject, imageBase64Map, state);

let generateWDB = (rootGameObject, imageBase64Map, state) =>
  GenerateWDBSystem.generateWDB(rootGameObject, imageBase64Map, state);