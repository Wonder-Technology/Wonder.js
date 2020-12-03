type t<'index, 'value> = array<Js.Nullable.t<'value>>
type t2<'value> = t<int, 'value>

external nullableToNotNullable: Js.Nullable.t<'a> => 'a = "%identity"

external notNullableToNullable: 'a => Js.Nullable.t<'a> = "%identity"

external arrayNullableToArrayNotNullable: array<Js.Nullable.t<'a>> => array<'a> = "%identity"

external arrayNotNullableToArrayNullable: array<'a> => array<Js.Nullable.t<'a>> = "%identity"
