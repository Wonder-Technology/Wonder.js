let unsafeGet = Belt.Option.getUnsafe;

let getExn = Belt.Option.getExn;

let get = optionData => {
  switch (optionData) {
  | None => Result.failWith({|data not exist(get by getExn)|})
  | Some(data) => Result.succeed(data)
  };
};

let getWithDefault = Belt.Option.getWithDefault;

let isSome = Belt.Option.isSome;

let map = Belt.Option.map;
