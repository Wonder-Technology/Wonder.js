open StateDataType;

open TransformType;

/* let handleCloneComponent =
       /* (sourceComponent: transform, countRangeArr: array(int), typeArrayPoolRecord, transformRecord) => { */

       (sourceComponent: transform, countRangeArr: array(int), { typeArrayPoolRecord, transformRecord } as state) => {
     let componentArr = [||];
     let localPosition =
       ModelMatrixTransformService.getLocalPositionTuple(
         sourceComponent,
         transformRecord.localPositionMap
       );
     let (typeArrayPoolRecord, transformRecord, componentArr) =
       countRangeArr
       |> WonderCommonlib.ArraySystem.reduceOneParam(
            [@bs]
            (
              ((typeArrayPoolRecord, transformRecord, componentArr), _) => {
                /* let (typeArrayPoolRecord, transformRecord, index) =
                  CreateTransformService.createNotMarkDirty(typeArrayPoolRecord, transformRecord); */

                let (state, index) =
                  CreateTransformService.createNotMarkDirty(state);

                (
                  typeArrayPoolRecord,
                  transformRecord
                  |> ModelMatrixTransformService.setLocalPositionByTuple(index, localPosition)
                  |> DirtyTransformService.mark(index, true),
                  componentArr |> ArrayService.push(index)
                )
              }
            ),
            (typeArrayPoolRecord, transformRecord, [||])
          );
     (
       typeArrayPoolRecord,
       transformRecord |> DirtyTransformService.mark(sourceComponent, true),
       componentArr
     )
   }; */
let handleCloneComponent =
    /* (sourceComponent: transform, countRangeArr: array(int), typeArrayPoolRecord, transformRecord) => { */
    (
      sourceComponent: transform,
      countRangeArr: array(int),
      {typeArrayPoolRecord, transformRecord} as state
    ) => {
  let componentArr = [||];
  let localPosition =
    ModelMatrixTransformService.getLocalPositionTuple(
      sourceComponent,
      transformRecord.localPositionMap
    );
  let (state, componentArr) =
    countRangeArr
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           ((state, componentArr), _) => {
             /* let (typeArrayPoolRecord, transformRecord, index) =
                CreateTransformService.createNotMarkDirty(typeArrayPoolRecord, transformRecord); */
             let (state, index) = CreateTransformService.createNotMarkDirty(state);
             (
               {
                 ...state,
                 /* typeArrayPoolRecord, */
                 transformRecord:
                   state.transformRecord
                   |> ModelMatrixTransformService.setLocalPositionByTuple(index, localPosition)
                   |> DirtyTransformService.mark(index, true)
               },
               componentArr |> ArrayService.push(index)
             )
           }
         ),
         (state, [||])
       );
  (
    {
      ...state,
      transformRecord: state.transformRecord |> DirtyTransformService.mark(sourceComponent, true)
    },
    componentArr
  )
};