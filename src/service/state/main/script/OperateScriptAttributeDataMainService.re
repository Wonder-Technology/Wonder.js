open ScriptAttributeType;

let createScriptAttribute = (): scriptAttribute =>
  WonderCommonlib.ImmutableHashMapService.createEmpty();

/* let createScriptAttribute = (~type_="", ~value=1, ()) => { */
/* let createScriptAttribute = (attributeJsObj) => {

   }; */

let _getTypeFromJsObj = [%bs.raw jsObj => {|
    return jsObj.type;
    |}];

let _createScriptAttributeField =
    (attributeFieldJsObj: scriptAttributeFieldJsObj) => {
  type_:
    switch (attributeFieldJsObj |> _getTypeFromJsObj) {
    | "int" => Int
    | "float" => Float
    | type_ =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_createScriptAttributeField",
          ~description={j|unknown type: $type_|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    },
  defaultValue: attributeFieldJsObj##defaultValue,
  value: attributeFieldJsObj##defaultValue,
};

let addScriptAttributeFieldJsObj = (fieldName, attributeFieldJsObj, attribute) =>
  attribute
  |> WonderCommonlib.ImmutableHashMapService.set(
       fieldName,
       _createScriptAttributeField(attributeFieldJsObj),
     );

let removeScriptAttributeField = (fieldName, attribute) =>
  attribute |> WonderCommonlib.ImmutableHashMapService.deleteVal(fieldName);

let getScriptAttributeEntries = attribute =>
  attribute |> WonderCommonlib.ImmutableHashMapService.getValidEntries;

let getScriptAttributeField = (fieldName, attribute) =>
  attribute |> WonderCommonlib.ImmutableHashMapService.get(fieldName);

let getScriptAttributeFieldValue = (fieldName, attribute) =>
  getScriptAttributeField(fieldName, attribute)
  |> Js.Option.map((. {value}) => value);

let unsafeGetScriptAttributeFieldValue = (fieldName, attribute) =>
  getScriptAttributeFieldValue(fieldName, attribute)
  |> OptionService.unsafeGet;

let setScriptAttributeFieldValue = (fieldName, value, attribute) =>
  switch (getScriptAttributeField(fieldName, attribute)) {
  | None => attribute
  | Some(field) =>
    attribute
    |> WonderCommonlib.ImmutableHashMapService.set(
         fieldName,
         {...field, value},
       )
  };

let getScriptAttributeFieldDefaultValue = (fieldName, attribute) =>
  getScriptAttributeField(fieldName, attribute)
  |> Js.Option.map((. {defaultValue}) => defaultValue);

let unsafeGetScriptAttributeFieldDefaultValue = (fieldName, attribute) =>
  getScriptAttributeFieldDefaultValue(fieldName, attribute)
  |> OptionService.unsafeGet;

let setScriptAttributeFieldDefaultValueAndValue =
    (fieldName, value, attribute) =>
  switch (getScriptAttributeField(fieldName, attribute)) {
  | None => attribute
  | Some(field) =>
    attribute
    |> WonderCommonlib.ImmutableHashMapService.set(
         fieldName,
         {...field, defaultValue: value, value},
       )
  };