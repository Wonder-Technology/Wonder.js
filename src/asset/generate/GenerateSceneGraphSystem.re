open StateDataMainType;

let generateEmbededGLTF = (sceneGameObject, imageBase64Map, state) =>
  GenerateGLTFSystem.generateEmbededGLTF(sceneGameObject, imageBase64Map, state);

let generateEmbededWD = (sceneGameObject, imageBase64Map, state) =>
  GenerateWDSystem.generateEmbededWD(sceneGameObject, imageBase64Map, state);