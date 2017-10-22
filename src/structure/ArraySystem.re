open Contract;

external unsafePop : 'a = "pop" [@@bs.send.pipe : array 'a];

type t 'a = Js.Array.t 'a;

let includes = Js.Array.includes;

let indexOf = Js.Array.indexOf;

let length = Js.Array.length;

let forEach = Js.Array.forEach;

let push = Js.Array.push;

let pop = Js.Array.pop;

let deleteBySwap (index: int) (lastIndex: int) (arr: array 'item) => {
  requireCheck (
    fun () =>
      test
        "lastIndex should == arr.length"
        (fun () => lastIndex |> assertEqual Int (Js.Array.length arr - 1))
  );
  /* arr.(index) = arr.(lastIndex); */
  Array.unsafe_set arr index (Array.unsafe_get arr lastIndex);
  unsafePop arr |> ignore
};

let createEmpty () => [||];