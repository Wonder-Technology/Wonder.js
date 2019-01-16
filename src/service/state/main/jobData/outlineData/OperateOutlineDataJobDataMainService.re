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
    (gameObjectsNeedDrawOutline, {jobDataRecord} as state) => {
  ...state,
  jobDataRecord:
    OperateOutlineDataJobDataService.setGameObjectsNeedDrawOutline(
      gameObjectsNeedDrawOutline,
      jobDataRecord,
    ),
};