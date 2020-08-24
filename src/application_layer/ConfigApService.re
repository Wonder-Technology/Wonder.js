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
        ->Option.getWithDefault({transformCount: 10000}: buffer),
    }
    ->SettingDoService.set
  });
};
