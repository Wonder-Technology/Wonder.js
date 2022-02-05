type t<'index, 'value> = list<'value>

let rec traverseResultM = (list, f) => {
  // define the monadic functions
  let \">>=" = (x, f) => Result.bind(x, f)

  let retn = Result.succeed

  // define a "cons" function
  let cons = (head, tail) => list{head, ...tail}
  // loop through the list
  switch list {
  | list{} =>
    // if empty, lift [] to a Result
    retn(list{})
  | list{head, ...tail} =>
    // otherwise lift the head to a Result using f
    // then lift the tail to a Result using traverse
    // then cons the head and tail and return it
    \">>="(f(head), h => \">>="(traverseResultM(tail, f), t => retn(cons(h, t))))
  }
}

let traverseResultMi = (list, f) => {
  // define the monadic functions
  let \">>=" = (x, f) => Result.bind(x, f)

  let retn = Result.succeed

  // define a "cons" function
  let cons = (head, tail) => list{head, ...tail}

  let rec _traverse = (list, i, f) =>
    switch // loop through the list
    list {
    | list{} =>
      // if empty, lift [] to a Result
      retn(list{})
    | list{head, ...tail} =>
      // otherwise lift the head to a Result using f
      // then lift the tail to a Result using traverse
      // then cons the head and tail and return it
      \">>="(f(i, head), h => \">>="(_traverse(tail, i->succ, f), t => retn(cons(h, t))))
    }

  _traverse(list, 0, f)
}

let rec traverseReduceResultM = (
  list: list<'a>,
  param: 'b,
  f: ('b, 'a) => Result.t2<'b>,
): Result.t2<'b> => {
  // define the monadic functions
  let \">>=" = (x, f) => Result.bind(x, f)

  let retn = Result.succeed

  // define a "cons" function
  let cons = (head, tail) => list{head, ...tail}
  // loop through the list
  switch list {
  | list{} => retn(param)
  | list{head, ...tail} => \">>="(f(param, head), h => traverseReduceResultM(tail, h, f))
  }
}

let _id = value => value

let rec sequenceResultM = list => traverseResultM(list, _id)

let ignoreTraverseResultValue = traverseResult => traverseResult->Result.mapSuccess(_ => ())

let range = (start, end_) => Belt.List.makeBy(end_ - start, i => i + start)

let map = (list, func) => Belt.List.map(list, func)

let mapi = (list, func) => Belt.List.mapWithIndex(list, func)

let _eq = (source, target) => source === target

let includes = (list, value) => list->Belt.List.has(value, _eq)

let getBy = Belt.List.getBy

let reduce = Belt.List.reduce

let reducei = Belt.List.reduceWithIndex

let forEach = Belt.List.forEach

let forEachi = Belt.List.forEachWithIndex

let concat = Belt.List.concat

let push = (list, value) => list->Belt.List.concat(list{value})

let toArray = Belt.List.toArray

let fromArray = Belt.List.fromArray

let remove = (list, value) => list->Belt.List.filter(v => v !== value)

let filter = Belt.List.filter

let length = Belt.List.length

let head = Belt.List.head

let nth = Belt.List.get

let getLast = list => list->nth(length(list) - 1)

let removeDuplicateItemsU = (list, buildKeyFunc) => {
  let arr = list->toArray

  let resultArr = []
  let map = MutableHashMap.createEmpty()
  for i in 0 to Js.Array.length(arr) - 1 {
    let item = Array.unsafe_get(arr, i)
    let key = buildKeyFunc(item)
    switch MutableHashMap.get(map, key) {
    | None =>
      Js.Array.push(item, resultArr)->ignore
      MutableHashMap.set(map, key, item)->ignore
    | Some(_) => ()
    }
  }
  resultArr->fromArray
}

let removeDuplicateItems = list => removeDuplicateItemsU(list, Js.Int.toString)

let reverse = Belt.List.reverse

let zip = Belt.List.zip

let zipBy = Belt.List.zipBy

let splitAt = Belt.List.splitAt

let find = (list, func) => {
  list->filter(func)->head
}

let addInReduce = (newList, value) => newList->push(value)
