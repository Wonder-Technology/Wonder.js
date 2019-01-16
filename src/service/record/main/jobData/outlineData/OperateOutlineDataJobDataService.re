open JobDataType;

let getColor = ({outlineData}) => outlineData.outlineColor;

let setColor = (color, {outlineData} as jobDataRecord) => {
  ...jobDataRecord,
  outlineData: {
    ...outlineData,
    outlineColor: color,
  },
};

let getGameObjectsNeedDrawOutline = ({outlineData}) =>
  outlineData.gameObjectsNeedDrawOutline;

let setGameObjectsNeedDrawOutline =
    (gameObjectsNeedDrawOutline, {outlineData} as jobDataRecord) => {
  ...jobDataRecord,
  outlineData: {
    ...outlineData,
    gameObjectsNeedDrawOutline,
  },
};