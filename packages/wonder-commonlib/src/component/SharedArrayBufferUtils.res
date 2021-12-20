let _isSupportSharedArrayBuffer = %raw(`
    function(param){
        return typeof SharedArrayBuffer !== "undefined"
    }
    `)

@new
external _newSharedArrayBuffer: int => SharedArrayBufferType.sharedArrayBuffer =
  "SharedArrayBuffer"

// let newSharedArrayBuffer = totalByteLength => ContractResult.requireCheck(() => {
//     open ContractResult
//     open Operators
//     test(Log.buildAssertMessage(~expect=j`support sharedArrayBuffer`, ~actual=j`not`), () =>
//       _isSupportSharedArrayBuffer()->assertTrue
//     )
//   }, ConfigRepo.getIsDebug())->Result.mapSuccess(() => _newSharedArrayBuffer(totalByteLength))
let newSharedArrayBuffer = totalByteLength => _newSharedArrayBuffer(totalByteLength)
