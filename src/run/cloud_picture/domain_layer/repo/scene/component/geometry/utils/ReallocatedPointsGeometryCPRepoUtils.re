open Js.Typed_array;

open TypeArrayCPRepoUtils;

let getInfo = (infoIndex, infos) =>
  (
    TypeArrayCPRepoUtils.getUint32_1(infoIndex, infos),
    TypeArrayCPRepoUtils.getUint32_1(infoIndex + 1, infos),
  )
  ->Contract.ensureCheck(
      ((startIndex, endIndex)) => {
        open Contract;
        open Operators;

        test(
          Log.buildAssertMessage(
            ~expect={j|has info data|j},
            ~actual={j|not|j},
          ),
          () => {
          [startIndex, endIndex]->assertNullableListExist
        });
        test(
          Log.buildAssertMessage(
            ~expect={j|endIndex >= startIndex|j},
            ~actual={j|is $endIndex|j},
          ),
          () =>
          endIndex >= startIndex
        );
      },
      DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
    );

let setInfo = (infoIndex, startIndex, endIndex, infos) => {
  Contract.requireCheck(
    () => {
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|startIndex >= 0|j},
          ~actual={j|is $startIndex|j},
        ),
        () =>
        startIndex >= 0
      );
      test(
        Log.buildAssertMessage(
          ~expect={j|endIndex >= startIndex|j},
          ~actual={j|is $endIndex|j},
        ),
        () =>
        endIndex >= startIndex
      );
    },
    DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
  )
  ->Result.bind(() => {
      TypeArrayCPRepoUtils.setUint32_1(infoIndex, startIndex, infos)
    })
  ->Result.bind(() => {
      TypeArrayCPRepoUtils.setUint32_1(infoIndex + 1, endIndex, infos)
    });
};

let hasPointData = (infoIndex, infos) => {
  getInfo(infoIndex, infos)
  ->Result.mapSuccess(((startIndex, endIndex)) => {endIndex > startIndex});
};

let getFloat32PointData = (infoIndex, points: Float32Array.t, infos) => {
  getInfo(infoIndex, infos)
  ->Result.mapSuccess(((startIndex, endIndex)) => {
      TypeArrayCPRepoUtils.getFloat32Array(points, startIndex, endIndex)
    });
};

let _setPointData =
    ((infoIndex: int, infos, offset: int, count), fillTypeArrayFunc) => {
  let startIndex = offset;
  let newOffset = offset + count;
  setInfo(infoIndex, startIndex, newOffset, infos)
  ->Result.bind(() => {fillTypeArrayFunc(startIndex)})
  ->Result.mapSuccess(() => {newOffset});
};

let setFloat32PointData = (dataTuple, fillFloat32ArrayFunc) =>
  _setPointData(dataTuple, fillFloat32ArrayFunc);

let getUint32PointData = (infoIndex: int, points: Uint32Array.t, infos) => {
  getInfo(infoIndex, infos)
  ->Result.mapSuccess(((startIndex, endIndex)) => {
      getUint32Array(points, startIndex, endIndex)
    });
};

let setUint32PointData = (dataTuple, fillUint32ArraryFunc) =>
  _setPointData(dataTuple, fillUint32ArraryFunc);
