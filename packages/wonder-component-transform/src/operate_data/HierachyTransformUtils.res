open StateType

let getParent = (parentMap, transform) =>
  parentMap->WonderCommonlib.MutableSparseMap.get(transform)

let getNullableParent = (parentMap, transform) =>
  parentMap->WonderCommonlib.MutableSparseMap.getNullable(transform)

let getNullableChildren = (childrenMap, transform) =>
  childrenMap->WonderCommonlib.MutableSparseMap.getNullable(transform)

let _unsafeGetChildren = (childrenMap, transform) =>
  childrenMap->WonderCommonlib.MutableSparseMap.unsafeGet(transform)

let _addChild = (childrenMap, parent, child) => {
  _unsafeGetChildren(childrenMap, parent)->WonderCommonlib.ArraySt.push(child)
}

let _addToParent = (state, parent, child) => {
  WonderCommonlib.Contract.requireCheck(() => {
    open WonderCommonlib.Contract
    open Operators

    let {parentMap, childrenMap} = state

    test(
      WonderCommonlib.Log.buildAssertMessage(~expect=j`child not has parent`, ~actual=j`has`),
      () => getParent(parentMap, child)->assertNotExist,
    )
    test(
      WonderCommonlib.Log.buildAssertMessage(
        ~expect=j`parent not already has the child`,
        ~actual=j`has`,
      ),
      () =>
        switch getNullableChildren(childrenMap, parent)->WonderCommonlib.OptionSt.fromNullable {
        | Some(children) => children->WonderCommonlib.ArraySt.includes(child)->assertFalse
        | None => assertPass()
        },
    )
  }, ConfigUtils.getIsDebug(state))

  let {parentMap, childrenMap} = state

  parentMap->WonderCommonlib.MutableSparseMap.set(child, parent)->ignore
  childrenMap->_addChild(parent, child)->ignore

  state
}

let _removeParent = (parentMap, transform) =>
  parentMap->WonderCommonlib.MutableSparseMap.remove(transform)

let _removeChild = (children, isDebug, child) =>
  WonderCommonlib.ArraySt.deleteBySwap(
    children,
    isDebug,
    Js.Array.indexOf(child, children),
    Js.Array.length(children) - 1,
  )

let _removeFromChildMap = (childrenMap, isDebug, parent, child) => {
  _unsafeGetChildren(childrenMap, parent)->_removeChild(isDebug, child)
}

let _removeFromParent = (state, currentParent, child) => {
  let {parentMap, childrenMap} = state

  parentMap->_removeParent(child)->ignore

  _removeFromChildMap(childrenMap, ConfigUtils.getIsDebug(state), currentParent, child)->ignore

  state
}

let removeParent = (state, transform) => {
  let {parentMap, childrenMap} = state

  switch getParent(parentMap, transform) {
  | None => state
  | Some(currentParent) => _removeFromParent(state, currentParent, transform)
  }
}
// getNullableParent(parentMap, transform)->Js.Nullable.isNullable
//   ? {
//       state
//     }
//   : {
//       getNullableParent(parentMap, transform)->Js.Nullable.iter((. currentParent) => {
//         _removeFromParent(
//           (parentMap, childrenMap),
//           ConfigUtils.getIsDebug(state),
//           currentParent,
//           transform,
//         )
//       })

//       state
//     }

// switch getParent(transform) {
// | None => ()
// | Some(currentParent) => _removeFromParent(currentParent, transform)
// }

let _setNewParent = (state, parent, child) => {
  let {parentMap, childrenMap} = state

  switch getParent(parentMap, child) {
  | None => _addToParent(state, parent, child)
  | Some(currentParent) =>
    !(currentParent === parent)
      ? {
          _removeFromParent(state, currentParent, child)->_addToParent(parent, child)
        }
      : state
  }
}

let rec markHierachyDirty = (state, transform) => {
  DirtyTransformUtils.mark(state, transform, true)->ignore

  let {childrenMap} = state

  _unsafeGetChildren(childrenMap, transform)->WonderCommonlib.ArraySt.reduceOneParam(
    (. state, child) => markHierachyDirty(state, child),
    state,
  )
}

let setParent = (state, parent, child) =>
  state->_setNewParent(parent, child)->markHierachyDirty(child)
