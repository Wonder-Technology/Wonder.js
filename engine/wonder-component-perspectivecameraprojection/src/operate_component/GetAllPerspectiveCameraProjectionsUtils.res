open StateType

let getAll = ({gameObjectPerspectiveCameraProjectionMap}) => {
  gameObjectPerspectiveCameraProjectionMap->WonderCommonlib.ImmutableSparseMap.getValues
}
