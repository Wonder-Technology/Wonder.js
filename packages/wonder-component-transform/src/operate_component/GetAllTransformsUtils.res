open StateType

let getAll = ({gameObjectTransformMap}) => {
  gameObjectTransformMap->WonderCommonlib.MutableSparseMap.getValues
}
