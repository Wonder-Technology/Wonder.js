open FrustumPerspectiveCameraProjectionService;

let handleCloneComponent =
    (sourceComponent, countRangeArr: array(int), record) => {
  let near = unsafeGetNear(sourceComponent, record);
  let far = unsafeGetFar(sourceComponent, record);
  let fovy = unsafeGetFovy(sourceComponent, record);
  let aspect = getAspect(sourceComponent, record);
  countRangeArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (record, componentArr), _) => {
         let (record, index) =
           CreatePerspectiveCameraProjectionService.create(record);

         let record =
           record
           |> setNear(index, near)
           |> setFar(index, far)
           |> setFovy(index, fovy);

         (
           switch (aspect) {
           | None => record
           | Some(aspect) => record |> setAspect(index, aspect)
           },
           componentArr |> ArrayService.push(index),
         );
       },
       (record, [||]),
     );
};