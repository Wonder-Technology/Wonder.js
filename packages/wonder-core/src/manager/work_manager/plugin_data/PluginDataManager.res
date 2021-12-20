let getIsDebug = () => {
  POContainer.unsafeGetPO().pluginData.isDebug
}

let setIsDebug = isDebug => {
  let {pluginData} as po = POContainer.unsafeGetPO()

  {
    ...po,
    pluginData: {
      ...pluginData,
      isDebug: isDebug,
    },
  }->POContainer.setPO
}
