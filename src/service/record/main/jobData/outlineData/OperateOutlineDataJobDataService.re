open AllJobDataType;

let getColor = ({outlineData}) => outlineData.outlineColor;

let setColor = (color, {outlineData} as jobDataRecord) => {
  ...jobDataRecord,
  outlineData: {
    ...outlineData,
    outlineColor: color,
  },
};

/* let getBasicGameObjectsNeedDrawOutline = ({outlineData}) =>
     outlineData.basicGameObjectsNeedDrawOutline;

   let getLightGameObjectsNeedDrawOutline = ({outlineData}) =>
     outlineData.lightGameObjectsNeedDrawOutline; */

let getGameObjectsNeedDrawOutline = ({outlineData}) =>
  outlineData.gameObjectsNeedDrawOutline;