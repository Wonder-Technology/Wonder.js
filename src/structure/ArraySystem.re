open Contract;

type t('a) = Js.Array.t('a);

[@bs.send.pipe : array('a)] external unsafePop : 'a = "pop";

[@bs.get_index] external unsafeGet : (t('a), int) => 'b = "";

[@bs.set_index] external unsafeSet : (t('a), int, 'b) => unit = "";

let createEmpty = () => [||];

/* let includes = Js.Array.includes;

   let indexOf = Js.Array.indexOf;

   let length = Js.Array.length;

   let forEach = Js.Array.forEach;

   let forEachi = Js.Array.forEachi;

   let push = Js.Array.push; */
/* let pushMany = Js.Array.pushMany; */
[@bs.splice] [@bs.send.pipe : Js.Array.t('a) as 'this] external pushMany : array('a) => int =
  "push";

/* let pop = Js.Array.pop;

   let concat = Js.Array.concat;

   let filter = Js.Array.filter;

   let map = Js.Array.map;

   let reduce = Js.Array.reduce; */
let flatten = (arr: array('item)) =>
  arr |> Js.Array.reduce((a, b) => Js.Array.concat(b, a), createEmpty());

let deleteBySwap = (index: int, lastIndex: int, arr: array('item)) => {
  requireCheck(
    () =>
      test(
        "lastIndex should == arr.length",
        () => lastIndex |> assertEqual(Int, Js.Array.length(arr) - 1)
      )
  );
  /* arr.(index) = arr.(lastIndex); */
  unsafeSet(arr, index, unsafeGet(arr, lastIndex));
  unsafePop(arr) |> ignore
};

/* let copy = Js.Array.copy; */
let rec range = (a: int, b: int) => {
  requireCheck(() => Contract.Operators.(test("range should be valid", () => b >= a)));
  let result = createEmpty();
  for (i in a to b) {
    Js.Array.push(i, result) |> ignore
  };
  result
};

let removeDuplicateItems = (arr) => {
  let resultArr = [||];
  let map = HashMapSystem.createEmpty();
  arr
  |> Js.Array.forEach(
       (item) => {
         let key = Js.Int.toString(item);
         switch (HashMapSystem.get(key, map)) {
         | None =>
           Js.Array.push(item, resultArr) |> ignore;
           HashMapSystem.set(key, item, map) |> ignore
         | Some(_) => ()
         }
       }
     );
  resultArr
};
/* let fastSort = Array.fast_sort; */