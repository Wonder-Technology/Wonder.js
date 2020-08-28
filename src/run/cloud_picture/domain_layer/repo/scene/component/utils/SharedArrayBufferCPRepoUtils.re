let _isSupportSharedArrayBuffer = [%bs.raw
  {|
    function(param){
        return typeof SharedArrayBuffer !== "undefined"
    }
    |}
];

[@bs.new]
external _newSharedArrayBuffer:
  int => SharedArrayBufferCPPOType.sharedArrayBuffer =
  "SharedArrayBuffer";

let newSharedArrayBuffer = totalByteLength => {
  Contract.requireCheck(
    () => {
      Contract.(
        Operators.(
          test(
            Log.buildAssertMessage(
              ~expect={j|support sharedArrayBuffer|j},
              ~actual={j|not|j},
            ),
            () => {
            _isSupportSharedArrayBuffer()->assertTrue
          })
        )
      )
    },
    DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
  )
  ->Result.mapSuccess(() => {_newSharedArrayBuffer(totalByteLength)});
};
