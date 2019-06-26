[@bs.send.pipe: array('a)]
external unsafeFind: ('a => [@bs.uncurry] bool) => 'a = "find";

let deleteBySwap = (index: int, lastIndex: int, arr: array('item)) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let len = arr |> Js.Array.length;
      test(
        Log.buildAssertMessage(
          ~expect={j|lastIndex:$lastIndex === arr.length:$len|j},
          ~actual={j|not|j},
        ),
        () =>
        lastIndex |> assertEqual(Int, Js.Array.length(arr) - 1)
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  WonderCommonlib.ArrayService.unsafeSet(
    arr,
    index,
    WonderCommonlib.ArrayService.unsafeGet(arr, lastIndex),
  );
  WonderCommonlib.ArrayService.unsafePop(arr) |> ignore;
};

let range = (a: int, b: int) => {
  let result = WonderCommonlib.ArrayService.createEmpty();
  for (i in a to b) {
    Js.Array.push(i, result) |> ignore;
  };
  result;
};

let rangeReverse = (a: int, b: int) => {
  let result = WonderCommonlib.ArrayService.createEmpty();
  for (i in a downto b) {
    Js.Array.push(i, result) |> ignore;
  };
  result;
};

let join = arr => {
  let output = ref("");
  for (i in 0 to Js.Array.length(arr)) {
    output := output^ ++ arr[i];
  };
  output^;
};

let push = (item, arr) => {
  arr |> Js.Array.push(item) |> ignore;
  arr;
};

let hasItem = arr => arr |> Js.Array.length > 0;

let unsafeGetFirst = arr => Array.unsafe_get(arr, 0);

let removeSpecificItem = (target, array) =>
  array |> Js.Array.filter(item => item != target);

let getFirst = arr => unsafeGetFirst(arr) |> Obj.magic |> Js.toOption;

let unsafeFindFirst = (arr: array('a), targetValue, func) =>
  arr
  |> unsafeFind(func)
  |> WonderLog.Contract.ensureCheck(
       first => {
         open WonderLog;
         open Contract;
         open Operators;
         let arrJson = WonderLog.Log.getJsonStr(arr);
         test(
           Log.buildAssertMessage(
             ~expect={j|find $targetValue in $arrJson|j},
             ~actual={j|not|j},
           ),
           () =>
           first |> assertNullableExist
         );
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let findFirst = (arr: array('a), targetValue, func) =>
  arr |> Js.Array.find(func);

let unsafeGetLast = arr => Array.unsafe_get(arr, Js.Array.length(arr) - 1);

let getLast = arr => unsafeGetLast(arr) |> Obj.magic |> Js.toOption;

let getNth = (index, arr) =>
  Array.unsafe_get(arr, index) |> Obj.magic |> Js.toOption;

/* let removeDuplicateItems = (isDuplicateFunc, arr) => { */
let removeDuplicateItems = (buildKeyFunc, arr) => {
  let resultArr = [||];
  let map = WonderCommonlib.MutableHashMapService.createEmpty();
  for (i in 0 to Js.Array.length(arr) - 1) {
    let item = Array.unsafe_get(arr, i);
    /* let key = Js.Int.toString(item); */
    let key = buildKeyFunc(. item);
    switch (WonderCommonlib.MutableHashMapService.get(key, map)) {
    | None =>
      Js.Array.push(item, resultArr) |> ignore;
      WonderCommonlib.MutableHashMapService.set(key, item, map) |> ignore;
    /* setMapFunc() */
    | Some(_) => ()
    };
  };
  resultArr;
};

let hasDuplicateItems = (buildKeyFunc, arr) => {
  let (isDuplicate, _) =
    arr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (isDuplicate, map), item) =>
           isDuplicate ?
             (true, map) :
             {
               let key = buildKeyFunc(. item);

               switch (WonderCommonlib.ImmutableHashMapService.get(key, map)) {
               | None => (
                   false,
                   WonderCommonlib.ImmutableHashMapService.set(
                     key,
                     item,
                     map,
                   ),
                 )
               | Some(_) => (true, map)
               };
             },
         (false, WonderCommonlib.ImmutableHashMapService.createEmpty()),
       );

  isDuplicate;
};

let isNotValid = value =>
  Obj.magic(value) === Js.Nullable.null
  || Obj.magic(value) === Js.Nullable.undefined;

let reduceOneParamValidi = (func, param, arr) => {
  let mutableParam = ref(param);
  for (i in 0 to Js.Array.length(arr) - 1) {
    let value = Array.unsafe_get(arr, i);

    if (isNotValid(value)) {
      ();
    } else {
      mutableParam := func(. mutableParam^, Array.unsafe_get(arr, i), i);
    };
  };
  mutableParam^;
};

let fastConcat = (arr1, arr2) =>
  arr2
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr1, value2) => arr1 |> push(value2),
       arr1,
     );

let rec _includeInSourceArr =
        (targetItem, resultArr, (posInSourceArr, sourceArr, sourceArrLength)) => {
  let sourceItem = Array.unsafe_get(sourceArr, posInSourceArr);

  posInSourceArr >= sourceArrLength ?
    (resultArr, 0) :
    sourceItem !== targetItem ?
      _includeInSourceArr(
        targetItem,
        resultArr,
        (posInSourceArr |> succ, sourceArr, sourceArrLength),
      ) :
      (resultArr |> push(sourceItem), posInSourceArr |> succ);
};

let rec _excludeInSourceArr =
        (targetItem, resultArr, (posInSourceArr, sourceArr, sourceArrLength)) => {
  let sourceItem = Array.unsafe_get(sourceArr, posInSourceArr);

  sourceItem === targetItem ?
    (resultArr, posInSourceArr |> succ) :
    _excludeInSourceArr(
      targetItem,
      resultArr |> push(sourceItem),
      (posInSourceArr |> succ, sourceArr, sourceArrLength),
    );
};

let _fastHandleRelation =
    (
      (targetArr: array(int), sourceArr: array(int)),
      (handleLengthEqualFunc, handleInSourceArrFunc, handleResultArrFunc),
    )
    : array(int) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|targetArr's length <= sourceArr's length|j},
                ~actual={j|not|j},
              ),
              () =>
              Js.Array.length(targetArr) <= Js.Array.length(sourceArr)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  Js.Array.length(targetArr) === Js.Array.length(sourceArr) ?
    {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|targetArr == sourceArr|j},
                  ~actual={j|not|j},
                ),
                () =>
                targetArr
                |> Js.Array.copy
                |> Js.Array.sortInPlaceWith((a, b) => a - b)
                == (
                     sourceArr
                     |> Js.Array.copy
                     |> Js.Array.sortInPlaceWith((a, b) => a - b)
                   )
                |> assertTrue
              )
            )
          ),
        IsDebugMainService.getIsDebug(StateDataMain.stateData),
      );

      handleLengthEqualFunc(targetArr, sourceArr);
    } :
    {
      sourceArr |> Js.Array.sortInPlaceWith((a, b) => a - b) |> ignore;
      targetArr |> Js.Array.sortInPlaceWith((a, b) => a - b) |> ignore;

      let sourceArrLength = Js.Array.length(sourceArr);

      let (resultArr, posInSourceArr) =
        targetArr
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. (resultArr, posInSourceArr), targetItem) =>
               handleInSourceArrFunc(
                 targetItem,
                 resultArr,
                 (posInSourceArr, sourceArr, sourceArrLength),
               ),
             ([||], 0),
           );

      handleResultArrFunc(posInSourceArr, sourceArr, resultArr);
    };
};

let fastExclude =
    (targetArr: array(int), sourceArr: array(int)): array(int) =>
  _fastHandleRelation(
    (targetArr, sourceArr),
    (
      (_, _) => [||],
      _excludeInSourceArr,
      (posInSourceArr, sourceArr, resultArr) =>
        fastConcat(resultArr, Js.Array.sliceFrom(posInSourceArr, sourceArr)),
    ),
  );

let fastIntersect =
    (targetArr: array(int), sourceArr: array(int)): array(int) =>
  _fastHandleRelation(
    (targetArr, sourceArr),
    (
      (targetArr, _) => targetArr,
      _includeInSourceArr,
      (posInSourceArr, sourceArr, resultArr) => resultArr,
    ),
  );

let batchRemove =
    (targetArr: array(int), sourceArr: array(int)): array(int) =>
  fastExclude(targetArr, sourceArr);

let addUniqueItem = (target, array) =>
  array
  |> Js.Array.copy
  |> push(target)
  |> removeDuplicateItems((. item) => item |> Obj.magic);