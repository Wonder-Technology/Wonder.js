open Js.Typed_array;

let checkIndexData = indices => {
  open WonderLog;
  open Contract;

  let maxValue = Js.Math.pow_int(~base=2, ~exp=16);
  test(
    Log.buildAssertMessage(
      ~expect=
        {j|indices(UNSIGNED_INT type) is in uint16Array range(<= $maxValue)|j},
      ~actual={j|not|j},
    ),
    () => {
      let isInRange = ref(true);

      for (i in 0 to (indices |> Uint32Array.length) - 1) {
        isInRange^ === false ?
          () :
          TypeArrayService.getUint32_1(i, indices) > maxValue ?
            isInRange := false : ();
      };

      isInRange^ |> assertTrue;
    },
  );
};