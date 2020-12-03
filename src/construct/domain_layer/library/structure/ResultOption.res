let openInverse = resultOptionData => resultOptionData->Result.bind(OptionSt.get)

let openInverseSucceedWithNone = (resultOptionData, handleSomeFunc) =>
  resultOptionData->Result.bind(valueOpt =>
    switch valueOpt {
    | None => Result.succeed()
    | Some(value) => value->handleSomeFunc
    }
  )
