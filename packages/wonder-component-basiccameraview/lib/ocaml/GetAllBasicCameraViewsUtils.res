open StateType

let getAll = ({gameObjectBasicCameraViewMap}) => {
  gameObjectBasicCameraViewMap->WonderCommonlib.ImmutableSparseMap.getValues
}
