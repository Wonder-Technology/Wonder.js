let bigThan = (num, below) => num < below ? below : num

let clamp = (isDebug, num, below, up) => {
  Contract.requireCheck(() => {
    open Contract
    open Operators
    test(Log.buildAssertMessage(~expect={j`below <= up`}, ~actual={j`not`}), () =>
      assertLte(Float, below, up)
    )
  }, isDebug)

  num < below ? below : num > up ? up : num
}

let dividInt = (a: int, b: int): float => Belt.Float.fromInt(a) /. Belt.Float.fromInt(b)
