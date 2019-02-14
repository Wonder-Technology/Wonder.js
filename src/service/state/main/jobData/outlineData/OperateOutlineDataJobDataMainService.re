open StateDataMainType;

let getColor = ({jobDataRecord}) =>
  OperateOutlineDataJobDataService.getColor(jobDataRecord);

let setColor = (color, {jobDataRecord} as state) => {
  ...state,
  jobDataRecord:
    OperateOutlineDataJobDataService.setColor(color, jobDataRecord),
};

let getGameObjectsNeedDrawOutline = ({jobDataRecord}) =>
  OperateOutlineDataJobDataService.getGameObjectsNeedDrawOutline(
    jobDataRecord,
  );

let setGameObjectsNeedDrawOutline =
    (gameObjectsNeedDrawOutline, {gameObjectRecord, jobDataRecord} as state) => {
  ...state,
  jobDataRecord: {
    ...jobDataRecord,
    outlineData: {
      ...jobDataRecord.outlineData,
      gameObjectsNeedDrawOutline,
    },
  },
};