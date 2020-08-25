open WonderBsJson.Json;

open Decode;

open ConfigDTOType;

type a = Js.Json.t;

let setSetting = setting => {
  Result.tryCatch(() => {
    {
      isDebug: setting |> field("isDebug", bool),
      buffer:
        (
          setting
          |> optional(
               field("buffer", (buffer) =>
                 (
                   {transformCount: buffer |> field("transformCount", int)}: buffer
                 )
               ),
             )
        )
        ->OptionSt.getWithDefault({transformCount: 10000}: buffer),
    }
    ->SettingDoService.set
  });
};
