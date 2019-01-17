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

/* let getBasicGameObjectsNeedDrawOutline = ({jobDataRecord}) =>
     OperateOutlineDataJobDataService.getBasicGameObjectsNeedDrawOutline(
       jobDataRecord,
     );

   let getLightGameObjectsNeedDrawOutline = ({jobDataRecord}) =>
     OperateOutlineDataJobDataService.getLightGameObjectsNeedDrawOutline(
       jobDataRecord,
     ); */

let setGameObjectsNeedDrawOutline =
    (gameObjectsNeedDrawOutline, {gameObjectRecord, jobDataRecord} as state) => {
  /* let (basicGameObjectsNeedDrawOutline, lightGameObjectsNeedDrawOutline) =
       gameObjectsNeedDrawOutline
       |> WonderCommonlib.ArrayService.reduceOneParam(
            (.
              (basicGameObjectsNeedDrawOutline, lightGameObjectsNeedDrawOutline),
              gameObjectNeedDrawOutline,
            ) =>
              HasComponentGameObjectService.hasBasicMaterialComponent(
                gameObjectNeedDrawOutline,
                gameObjectRecord,
              ) ?
                (
                  basicGameObjectsNeedDrawOutline
                  |> ArrayService.push(gameObjectNeedDrawOutline),
                  lightGameObjectsNeedDrawOutline,
                ) :
                HasComponentGameObjectService.hasLightMaterialComponent(
                  gameObjectNeedDrawOutline,
                  gameObjectRecord,
                ) ?
                  (
                    basicGameObjectsNeedDrawOutline,
                    lightGameObjectsNeedDrawOutline
                    |> ArrayService.push(gameObjectNeedDrawOutline),
                  ) :
                  (
                    basicGameObjectsNeedDrawOutline,
                    lightGameObjectsNeedDrawOutline,
                  ),
            ([||], [||]),
          );

     {
       ...state,
       jobDataRecord: {
         ...jobDataRecord,
         outlineData: {
           ...jobDataRecord.outlineData,
           /* basicGameObjectsNeedDrawOutline:
             ArrayService.fastConcat(
               jobDataRecord.outlineData.basicGameObjectsNeedDrawOutline,
               basicGameObjectsNeedDrawOutline,
             ),
           lightGameObjectsNeedDrawOutline:
             ArrayService.fastConcat(
               jobDataRecord.outlineData.lightGameObjectsNeedDrawOutline,
               lightGameObjectsNeedDrawOutline,
             ), */


           basicGameObjectsNeedDrawOutline,
           lightGameObjectsNeedDrawOutline
         },
       },
     }; */
  ...state,
  jobDataRecord: {
    ...jobDataRecord,
    outlineData: {
      ...jobDataRecord.outlineData,
      gameObjectsNeedDrawOutline,
    },
  },
};