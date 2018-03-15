open FrustumPerspectiveCameraProjectionService;

let handleCloneComponent = (sourceComponent, countRangeArr: array(int), record) => {
  let near = unsafeGetNear(sourceComponent, record);
  let far = unsafeGetFar(sourceComponent, record);
  let fovy = unsafeGetFovy(sourceComponent, record);
  let aspect = unsafeGetAspect(sourceComponent, record);
  countRangeArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((record, componentArr), _) => {
           let (record, index) = CreatePerspectiveCameraProjectionService.create(record);
           (
             record
             |> setNear(index, near)
             |> setFar(index, far)
             |> setFovy(index, fovy)
             |> setAspect(index, aspect),
             componentArr |> ArrayService.push(index)
           )
         }
       ),
       (record, [||])
     )
};