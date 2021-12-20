type t<'key, 'value> = Js.Dict.t<Js.Nullable.t<'value>>
type t2<'value> = t<string, 'value>

external nullableToNotNullable: Js.Nullable.t<'a> => 'a = "%identity"

external notNullableToNullable: 'a => Js.Nullable.t<'a> = "%identity"

external entriesNullableToEntriesNotNullable: array<(Js.Dict.key, Js.Nullable.t<'a>)> => array<(
  Js.Dict.key,
  'a,
)> = "%identity"

external entriesNotNullableToEntriesNullable: array<(Js.Dict.key, 'a)> => array<(
  Js.Dict.key,
  Js.Nullable.t<'a>,
)> = "%identity"

external dictNotNullableToDictNullable: Js.Dict.t<'a> => Js.Dict.t<Js.Nullable.t<'a>> = "%identity"
