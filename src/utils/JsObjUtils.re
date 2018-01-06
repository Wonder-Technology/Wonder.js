let getOptionValueFromJsObj = (valueFromJsObj: Js.nullable('value)) =>
  Js.Nullable.to_opt(valueFromJsObj);

let getValueFromJsObj = (valueFromJsObj: Js.nullable('value), defaultValue: 'value) =>
  switch (Js.Nullable.to_opt(valueFromJsObj)) {
  | Some(value) => value
  | None => defaultValue
  };