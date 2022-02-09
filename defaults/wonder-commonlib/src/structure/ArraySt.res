let length = Js.Array.length

let reduceOneParam = (arr, func, param) => Belt.Array.reduceU(arr, param, func)

let reduceOneParami = (arr, func, param) => {
  let mutableParam = ref(param)
  for i in 0 to Js.Array.length(arr) - 1 {
    mutableParam := func(. mutableParam.contents, Array.unsafe_get(arr, i), i)
  }
  mutableParam.contents
}

let find = (arr, func) => Js.Array.find(func, arr)

let includes = (arr, value) => Js.Array.includes(value, arr)

let includesByFunc = (arr, func) => {
  arr->find(func)->OptionSt.isSome
}

let sliceFrom = (arr, index) => Js.Array.sliceFrom(index, arr)

let unsafeGetFirst = arr => Array.unsafe_get(arr, 0)

let getFirst = arr => arr->length === 1 ? arr[0]->Some : None

let push = (arr, value) => {
  Js.Array.push(value, arr)->ignore

  arr
}

let forEach = (arr, func) => Js.Array.forEach(func, arr)

let map = (arr, func) => Js.Array.map(func, arr)

let filter = (arr, func) => Js.Array.filter(func, arr)

let deleteBySwap = (arr, isDebug, index: int, lastIndex: int) => {
  Contract.requireCheck(() => {
    open Contract
    open Operators

    let len = arr->Js.Array.length
    test(
      Log.buildAssertMessage(~expect=j`lastIndex:$lastIndex === arr.length:$len`, ~actual=j`not`),
      () => lastIndex->assertEqual(Int, Js.Array.length(arr) - 1, _),
    )
  }, isDebug)

  Array.unsafe_set(arr, index, Array.unsafe_get(arr, lastIndex))

  Js.Array.pop(arr)->ignore
}

let range = (a: int, b: int) => {
  let result = []

  for i in a to b {
    Js.Array.push(i, result)->ignore
  }

  result
}
