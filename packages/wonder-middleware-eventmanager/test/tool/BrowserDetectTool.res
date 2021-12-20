open POType

let setChrome = po => {
  ...po,
  browser: Chrome,
}

let setFirefox = po => {
  ...po,
  browser: Firefox,
}

let setAndroid = po => {
  ...po,
  browser: Android,
}

let setIOS = po => {
  ...po,
  browser: IOS,
}

let setUnknown = po => {
  ...po,
  browser: Unknown,
}
