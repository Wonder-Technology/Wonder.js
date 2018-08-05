let serializeFunction = [%raw func => {|
    return func.toString();
    |}];

let deserializeFunction = [%raw
  funcStr => {|
    return eval('(' + funcStr + ')');
    |}
];

let serializeValueWithFunction = [%raw
  value => {|
      return JSON.stringify(value, function (key, val) {
        if (typeof val === "function") {
          return val.toString();
        }
        return val;
      });
    |}
];

let deserializeValueWithFunction = [%raw
  value => {|
    return JSON.parse(value, (key, value) => {
      if (typeof value != "string") {
        return value;
      }

      return (value.substring(0, 8) == "function") ? eval('(' + value + ')') : value;
    });
    |}
];