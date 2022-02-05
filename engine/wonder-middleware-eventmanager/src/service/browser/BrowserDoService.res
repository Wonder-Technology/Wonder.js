open POType

let getBrowser = po => {
  po.browser
}

let setBrowser = (po, browser) => {
  {
    ...po,
    browser: browser,
  }
}
