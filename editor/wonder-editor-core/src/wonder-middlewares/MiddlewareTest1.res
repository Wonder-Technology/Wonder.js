type func1 = string => unit

type getData = {func1: func1}

let getData = (): getData => {
  {
    func1: str => {
      Js.log(str)
    },
  }
}
