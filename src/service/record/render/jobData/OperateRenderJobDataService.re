open JobDataType;

let getOutlineColor = ({outlineData}) => outlineData.outlineColor;

/* let getBasicGameObjectsNeedDrawOutline = ({outlineData}) =>
     outlineData.basicGameObjectsNeedDrawOutline;

   let getLightGameObjectsNeedDrawOutline = ({outlineData}) =>
     outlineData.lightGameObjectsNeedDrawOutline; */

let getGameObjectsNeedDrawOutline = ({outlineData}) =>
  outlineData.gameObjectsNeedDrawOutline;

let getSkyboxCubeTexture = ({skyboxData}) =>
  skyboxData.cubeTexture ;