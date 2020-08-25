type buffer = {. "transformCount": int};

type setting =
  JsonType.json({
    .
    "isDebug": bool,
    "buffer": Js.Nullable.t(buffer),
  });
