open StateDataMainType;

let generateEmbededGLTF = (sceneGameObject, state) =>
  GenerateGLTFSystem.generateEmbededGLTF(sceneGameObject, state);

let generateEmbededWD = (sceneGameObject, state) =>
  GenerateWDSystem.generateEmbededWD(sceneGameObject, state);