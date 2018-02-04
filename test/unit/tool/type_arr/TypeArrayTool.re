[@bs.send] external toFixed : (float, int) => string = "";

[@bs.val] external convertNumberToString : string => string = "Number";

[@bs.val] external convertString : string => string = "String";

let _convertStringToFloat: string => float = [%bs.raw
  {|
    function(str){
        return Number(str)
    }
    |}
];

let truncateFloatValue = (count, value: float) => {
  let res = toFixed(value, count);
  convertString(convertNumberToString(res)) |> _convertStringToFloat
};

let truncateArray = (arr: array(Js.Typed_array.Float32Array.elt)) =>
  arr |> Js.Array.map((item) => truncateFloatValue(5, item |> Obj.magic));