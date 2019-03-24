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

let addScriptAttributeField = (fieldName, attributeFieldJsObj, attribute) =>
  attribute
  |> WonderCommonlib.ImmutableHashMapService.set(
       fieldName,
       _createScriptAttributeField(attributeFieldJsObj),
     );

/* let createScriptAttribute = () => {

   }; */

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

/* let getScriptAttributeFieldDefaultValue =
       (script, attributeName, fieldName, state) => {};

   let setScriptAttributeFieldDefaultValue =
       (
         script,
         /* attribute, */
         attributeName,
         fieldName,
         defaultValue,
         state,
       ) => {}; */