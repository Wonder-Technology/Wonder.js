let isUndefined = value => value |> Obj.magic === Js.Undefined.empty;

let isNotEqual = (value1, value2) => value1 != value2;

let isEqual = (value1, value2) => value1 == value2;

let isGreaterThan = (value, target) => value > target;

let isGreaterOrEqualThan = (value, target) => value >= target;

let isFunction = [%raw
  func => {|
    return Object.prototype.toString.call(func).toLowerCase() === "[object function]";
    |}
];