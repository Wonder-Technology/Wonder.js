external arrayNotNullableToArrayNullable :
  array('a) => array(WonderCommonlib.MutableSparseMapService.t('a)) =
  "%identity";

let createByArr = arr => arr |> arrayNotNullableToArrayNullable;