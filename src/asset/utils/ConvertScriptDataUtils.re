open StateDataMainType;

/* external eventFunctionDataMapJsonToRecord: Js.Json.t => eventFunctionDataMap =
   "%identity"; */

external attributeMapJsonToRecord:
  Js.Dict.t(string) => ScriptAttributeType.attributeMap =
  "%identity";

let _convertEventFunctionToStr = eventFunction =>
  SerializeService.serializeFunction(eventFunction);

let _convertEventFunctionDataMapToStr = eventDataMap =>
  eventDataMap
  |> WonderCommonlib.ImmutableHashMapService.mapValid(
       (. {init, update, dispose}) =>
       {
         init:
           init
           |> Js.Option.andThen((. init) => _convertEventFunctionToStr(init)),
         update:
           update
           |> Js.Option.andThen((. update) =>
                _convertEventFunctionToStr(update)
              ),
         dispose:
           dispose
           |> Js.Option.andThen((. dispose) =>
                _convertEventFunctionToStr(dispose)
              ),
       }
     )
  |> Obj.magic
  |> Js.Json.stringify;

let unsafeGetEventFunctionDataMapStr = (script, {scriptRecord} as state) => {
  let {scriptEventFunctionDataMap} as scriptRecord = scriptRecord;

  scriptEventFunctionDataMap
  |> ImmutableSparseMapService.unsafeGetAndCheck(script)
  |> _convertEventFunctionDataMapToStr;
};

let _convertAttributeMapToStr = attributeMap =>
  attributeMap |> Obj.magic |> Js.Json.stringify;

let unsafeGetAttributeMapStr = (script, {scriptRecord} as state) => {
  let {scriptAttributeMap} as scriptRecord = scriptRecord;

  scriptAttributeMap
  |> ImmutableSparseMapService.unsafeGetAndCheck(script)
  |> _convertAttributeMapToStr;
};

let convertEventFunctionDataMapJsonToRecord =
    (eventFunctionDataMapJson: Js.Dict.t(string)): eventFunctionDataMap =>
  /* Js.Json.parseExn(eventFunctionDataMap) |> eventFunctionDataMapJsonToRecord; */
  /* eventFunctionDataMapJson |> eventFunctionDataMapJsonToRecord; */
  eventFunctionDataMapJson
  |> Obj.magic
  |> WonderCommonlib.ImmutableHashMapService.map((. {init, update, dispose}) => {
       let initJsonData = init |> Obj.magic;
       let updateJsonData = update |> Obj.magic;
       let disposeJsonData = dispose |> Obj.magic;

       {
         init:
           OptionService.isJsonSerializedValueNone(initJsonData) ?
             None : Some(initJsonData |> SerializeService.deserializeFunction),
         update:
           OptionService.isJsonSerializedValueNone(updateJsonData) ?
             None :
             Some(updateJsonData |> SerializeService.deserializeFunction),
         dispose:
           OptionService.isJsonSerializedValueNone(disposeJsonData) ?
             None :
             Some(disposeJsonData |> SerializeService.deserializeFunction),
       };
     });
/* |> eventFunctionDataMapJsonToRecord; */

let convertAttributeMapJsonToRecord = attributeMapJson =>
  /* Js.Json.parseExn(attributeMap) |> attributeMapJsonToRecord; */
  attributeMapJson |> attributeMapJsonToRecord;