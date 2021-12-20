open Js.Typed_array

// let _checkNotExceedBound = (getLengthFunc, index, typeArray) => {
//   open ContractResult
//   open Operators
//   test(
//     Log.buildAssertMessage(~expect=j`not exceed bound`, ~actual=j`exceed`),
//     () => index < typeArray->getLengthFunc,
//   )
// }

let getFloat16TypeArray = (index: int, typeArray: Float32Array.t) =>
  Float32Array.subarray(~start=index, ~end_=index + 16, typeArray)

// let setMat3Data = (index, mat3, typeArray: Float32Array.t) =>
//   ContractResult.requireCheck(() => {
//     open ContractResult
//     open Operators
//     _checkNotExceedBound(Float32Array.length, index + 11, typeArray)
//   }, ConfigRepo.getIsDebug())->Result.mapSuccess(() => {
//     Float32Array.unsafe_set(typeArray, index, Float32Array.unsafe_get(mat3, 0))
//     Float32Array.unsafe_set(typeArray, index + 1, Float32Array.unsafe_get(mat3, 1))
//     Float32Array.unsafe_set(typeArray, index + 2, Float32Array.unsafe_get(mat3, 2))
//     Float32Array.unsafe_set(typeArray, index + 3, 0.0)
//     Float32Array.unsafe_set(typeArray, index + 4, Float32Array.unsafe_get(mat3, 3))
//     Float32Array.unsafe_set(typeArray, index + 5, Float32Array.unsafe_get(mat3, 4))
//     Float32Array.unsafe_set(typeArray, index + 6, Float32Array.unsafe_get(mat3, 5))
//     Float32Array.unsafe_set(typeArray, index + 7, 0.0)
//     Float32Array.unsafe_set(typeArray, index + 8, Float32Array.unsafe_get(mat3, 6))
//     Float32Array.unsafe_set(typeArray, index + 9, Float32Array.unsafe_get(mat3, 7))
//     Float32Array.unsafe_set(typeArray, index + 10, Float32Array.unsafe_get(mat3, 8))
//     Float32Array.unsafe_set(typeArray, index + 11, 0.0)
//   })

let setFloat1 = (index: int, value, typeArray: Float32Array.t) => {
  // ContractResult.requireCheck(() => {
  //   open ContractResult
  //   open Operators
  //   _checkNotExceedBound(Float32Array.length, index + 0, typeArray)
  // }, ConfigRepo.getIsDebug())->Result.mapSuccess(() =>
  Float32Array.unsafe_set(typeArray, index, value)
  // )
}

// let setFloat2 = (index: int, (x, y), typeArray: Float32Array.t) =>
//   ContractResult.requireCheck(() => {
//     open ContractResult
//     open Operators
//     _checkNotExceedBound(Float32Array.length, index + 1, typeArray)
//   }, ConfigRepo.getIsDebug())->Result.mapSuccess(() => {
//     Float32Array.unsafe_set(typeArray, index, x)
//     Float32Array.unsafe_set(typeArray, index + 1, y)
//   })

let setFloat3 = (index: int, (x, y, z), typeArray: Float32Array.t) => {
  // ContractResult.requireCheck(() => {
  //   open ContractResult
  //   open Operators
  //   _checkNotExceedBound(Float32Array.length, index + 2, typeArray)
  // }, ConfigRepo.getIsDebug())->Result.mapSuccess(() => {
  Float32Array.unsafe_set(typeArray, index, x)
  Float32Array.unsafe_set(typeArray, index + 1, y)
  Float32Array.unsafe_set(typeArray, index + 2, z)
  // })
}

let setFloat4 = (index: int, (x, y, z, w), typeArray: Float32Array.t) => {
  // ContractResult.requireCheck(() => {
  //   open ContractResult
  //   open Operators
  //   _checkNotExceedBound(Float32Array.length, index + 3, typeArray)
  // }, ConfigRepo.getIsDebug())->Result.mapSuccess(() => {
  Float32Array.unsafe_set(typeArray, index, x)
  Float32Array.unsafe_set(typeArray, index + 1, y)
  Float32Array.unsafe_set(typeArray, index + 2, z)
  Float32Array.unsafe_set(typeArray, index + 3, w)
  // })
}

let setFloat16 = (
  index: int,
  (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15),
  typeArray: Float32Array.t,
) => {
  // ContractResult.requireCheck(() => {
  //   open ContractResult
  //   open Operators
  //   _checkNotExceedBound(Float32Array.length, index + 15, typeArray)
  // }, ConfigRepo.getIsDebug())->Result.mapSuccess(() => {
  Float32Array.unsafe_set(typeArray, index + 0, a0)
  Float32Array.unsafe_set(typeArray, index + 1, a1)
  Float32Array.unsafe_set(typeArray, index + 2, a2)
  Float32Array.unsafe_set(typeArray, index + 3, a3)
  Float32Array.unsafe_set(typeArray, index + 4, a4)
  Float32Array.unsafe_set(typeArray, index + 5, a5)
  Float32Array.unsafe_set(typeArray, index + 6, a6)
  Float32Array.unsafe_set(typeArray, index + 7, a7)
  Float32Array.unsafe_set(typeArray, index + 8, a8)
  Float32Array.unsafe_set(typeArray, index + 9, a9)
  Float32Array.unsafe_set(typeArray, index + 10, a10)
  Float32Array.unsafe_set(typeArray, index + 11, a11)
  Float32Array.unsafe_set(typeArray, index + 12, a12)
  Float32Array.unsafe_set(typeArray, index + 13, a13)
  Float32Array.unsafe_set(typeArray, index + 14, a14)
  Float32Array.unsafe_set(typeArray, index + 15, a15)
  // })
}

// let setFloat16WithFloat32Array = (index, target: Float32Array.t, typeArray) =>
//   ContractResult.requireCheck(() => {
//     open ContractResult
//     open Operators
//     _checkNotExceedBound(Float32Array.length, index + 15, typeArray)
//   }, ConfigRepo.getIsDebug())->Result.mapSuccess(() =>
//     typeArray->Float32Array.setArrayOffset(Obj.magic(target), index, _)
//   )

// let setUint8_1WithoutCheck = (index: int, value: int, typeArray: Uint8Array.t) =>
//   Uint8Array.unsafe_set(typeArray, index, value)

// let setUint8_1 = (index: int, value: int, typeArray: Uint8Array.t) => ContractResult.requireCheck(() => {
//     open ContractResult
//     open Operators
//     _checkNotExceedBound(Uint8Array.length, index + 0, typeArray)
//   }, ConfigRepo.getIsDebug())->Result.mapSuccess(() =>
//     Uint8Array.unsafe_set(typeArray, index, value)
//   )

// let setUint16_1 = (index: int, value: int, typeArray: Uint16Array.t) =>
//   ContractResult.requireCheck(() => {
//     open ContractResult
//     open Operators
//     _checkNotExceedBound(Uint16Array.length, index + 0, typeArray)
//   }, ConfigRepo.getIsDebug())->Result.mapSuccess(() =>
//     Uint16Array.unsafe_set(typeArray, index, value)
//   )

let setUint32_1 = (index: int, value: int, typeArray: Uint32Array.t) =>
  // ContractResult.requireCheck(() => {
  //   open ContractResult
  //   open Operators
  //   _checkNotExceedBound(Uint32Array.length, index + 0, typeArray)
  // }, ConfigRepo.getIsDebug())->Result.mapSuccess(() =>
  Uint32Array.unsafe_set(typeArray, index, value)
// )

let getFloat3Tuple = (index: int, typeArray: Float32Array.t) => (
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2),
)

// let getFloat3Tuple = (index: int, typeArray: Float32Array.t) =>
//   Float32Array.subarray(~start=index, ~end_=index + 3, typeArray)

let getFloat4Tuple = (index: int, typeArray: Float32Array.t) => (
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2),
  Float32Array.unsafe_get(typeArray, index + 3),
)

// let getUint8_1 = (index: int, typeArray: Uint8Array.t) => Uint8Array.unsafe_get(typeArray, index)

// let getUint16_1 = (index: int, typeArray: Uint16Array.t) => Uint16Array.unsafe_get(typeArray, index)

let getUint32_1 = (index: int, typeArray: Uint32Array.t) => Uint32Array.unsafe_get(typeArray, index)

let getFloat1 = (index: int, typeArray: Float32Array.t) => Float32Array.unsafe_get(typeArray, index)

let getFloat32Array = (typeArray: Float32Array.t, startIndex: int, endIndex: int) =>
  Float32Array.slice(~start=startIndex, ~end_=endIndex, typeArray)

let getUint32Array = (typeArray: Uint32Array.t, startIndex: int, endIndex: int) =>
  Uint32Array.slice(~start=startIndex, ~end_=endIndex, typeArray)

// let _setFloat32ArrayWithFloat32Array = (. targetTypeArr, sourceTypeArr, typeArrIndex, i) =>
//   Js.Typed_array.Float32Array.unsafe_set(
//     targetTypeArr,
//     typeArrIndex,
//     Js.Typed_array.Float32Array.unsafe_get(sourceTypeArr, i),
//   )

// let _setUint32ArrayWithUint32Array = (. targetTypeArr, sourceTypeArr, typeArrIndex, i) =>
//   Js.Typed_array.Uint32Array.unsafe_set(
//     targetTypeArr,
//     typeArrIndex,
//     Js.Typed_array.Uint32Array.unsafe_get(sourceTypeArr, i),
//   )

// let _fillTypeArrayWithTypeArr = (
//   (targetTypeArr, targetStartIndex),
//   (sourceTypeArr, sourceStartIndex),
//   endIndex,
//   _setTypeArrWithTypeArr,
// ) => {
//   let typeArrIndex = ref(targetStartIndex)
//   for i in sourceStartIndex to endIndex - 1 {
//     _setTypeArrWithTypeArr(. targetTypeArr, sourceTypeArr, typeArrIndex.contents, i)
//     typeArrIndex := succ(typeArrIndex.contents)
//   }
//   typeArrIndex.contents
// }

// let fillUint32ArrayWithUint32Array = (targetData, sourceData, endIndex) =>
//   _fillTypeArrayWithTypeArr(targetData, sourceData, endIndex, _setUint32ArrayWithUint32Array)

// let fillFloat32ArrayWithFloat32Array = (targetData, sourceData, endIndex) =>
//   _fillTypeArrayWithTypeArr(targetData, sourceData, endIndex, _setFloat32ArrayWithFloat32Array)

let fillFloat32ArrayWithOffset = (targetTypeArr, sourceTypeArr: Float32Array.t, offset) => {
  // ContractResult.requireCheck(() => {
  //   open ContractResult
  //   open Operators
  //   test(Log.buildAssertMessage(~expect=j`offset should >= 0`, ~actual=j`is $offset`), () =>
  //     offset >= 0
  //   )
  //   let sourceTypeArrLen = Float32Array.length(sourceTypeArr)
  //   let targetTypeArrLen = Float32Array.length(targetTypeArr)
  //   test(
  //     Log.buildAssertMessage(
  //       ~expect=j`sourceTypeArr.length:$sourceTypeArrLen + offset:$offset <= targetTypeArr.length:$targetTypeArrLen`,
  //       ~actual=j`not`,
  //     ),
  //     () => sourceTypeArrLen + offset <= targetTypeArrLen,
  //   )
  // }, ConfigRepo.getIsDebug())->Result.mapSuccess(() =>
  targetTypeArr->Float32Array.setArrayOffset(Obj.magic(sourceTypeArr), offset, _)
  // )
}

let fillUint32ArrayWithOffset = (targetTypeArr, sourceTypeArr, offset) => {
  // ContractResult.requireCheck(() => {
  //   open ContractResult
  //   open Operators
  //   test(Log.buildAssertMessage(~expect=j`offset should >= 0`, ~actual=j`is $offset`), () =>
  //     offset >= 0
  //   )
  //   let sourceTypeArrLen = Uint32Array.length(sourceTypeArr)
  //   let targetTypeArrLen = Uint32Array.length(targetTypeArr)
  //   test(
  //     Log.buildAssertMessage(
  //       ~expect=j`sourceTypeArr.length:$sourceTypeArrLen + offset:$offset <= targetTypeArr.length:$targetTypeArrLen`,
  //       ~actual=j`not`,
  //     ),
  //     () => sourceTypeArrLen + offset <= targetTypeArrLen,
  //   )
  // }, ConfigRepo.getIsDebug())->Result.mapSuccess(() =>
  targetTypeArr->Uint32Array.setArrayOffset(Obj.magic(sourceTypeArr), offset, _)
  // )
}

let reduceFloat32Array = (typeArr, acc, f) => Float32Array.reduce(f, acc, typeArr)
