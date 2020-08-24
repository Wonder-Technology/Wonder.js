type t('index, 'value) = Belt.HashMap.Int.t('value);
type t2('value) = t(int, 'value);

// external notNullableToNullable: 'a => Js.Nullable.t('a) = "%identity";
