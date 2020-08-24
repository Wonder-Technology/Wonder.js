let _isSupportSharedArrayBuffer = [%bs.raw
  {|
    function(param){
        return typeof SharedArrayBuffer !== "undefined"
    }
    |}
];

[@bs.new]
external _newSharedArrayBuffer: int => SharedArrayBufferPOType.sharedArrayBuffer =
  "SharedArrayBuffer";

let newSharedArrayBuffer = totalByteLength => {
  SettingRepo.getIsDebug()
  ->Result.bind(isDebug => {
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
        isDebug,
      )
    })
  ->Result.mapSuccess(() => {_newSharedArrayBuffer(totalByteLength)});
};
