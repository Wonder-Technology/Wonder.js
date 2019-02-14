external arrayNotNullableToArrayNullable :
  array('a) => array(Js.Nullable.t('a)) =
  "%identity";

let createByArr = arr => arr |> arrayNotNullableToArrayNullable;