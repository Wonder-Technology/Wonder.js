open Js.Promise;

let judgeErrorMessage = (targetMessage, promise) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        promise
        |> catch(
             (e) => {
               let message: string = Obj.magic(e)##message;
               message |> expect |> toContainString(targetMessage) |> resolve |> Obj.magic
             }
           )
        |> Obj.magic
      )
    )
  );