open AllJobDataType;

let create = () => {
  outlineData: {
    outlineColor: [|1.0, 1.0, 1.0|],
    gameObjectsNeedDrawOutline: [||],
  },
  skyboxData: {
    skyboxGameObject: None,
    needUpdateCubeTexture: true,
    nxImage: None,
    pxImage: None,
    nyImage: None,
    pyImage: None,
    nzImage: None,
    pzImage: None,
    cubeTexture: None,
  },
};