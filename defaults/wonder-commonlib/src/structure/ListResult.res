let mergeResults = resultList =>
  resultList->ListSt.reduce(()->Result.succeed, (mergedResult, result) =>
    mergedResult->Result.bind(() => result)
  )
