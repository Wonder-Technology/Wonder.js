let unsafeGet = Belt.Option.getUnsafe;

let getExn = Belt.Option.getExn;

let get = optionData => {
  switch (optionData) {
  | None => Result.failWith({|data not exist in option data|})
  | Some(data) => Result.succeed(data)
  };
};

let getWithDefault = Belt.Option.getWithDefault;

let isSome = Belt.Option.isSome;

let map = Belt.Option.map;

let fromNullable = x => Js.Nullable.toOption(x);

let rec sequenceResultM = optionData => {
  switch (optionData) {
  | None => Result.failWith({|data not exist in option data|})
  | Some(result) => result->Result.mapSuccess(value => value->Some)
  };
};

let open_ = optionOptionData => {
  switch (optionOptionData) {
  | None => None
  | Some(optionData) => optionData
  };
};
