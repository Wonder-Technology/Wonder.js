open AllBrowserDetectType;

open StateDataMainType;

let setChrome = state => {
  ...state,
  browserDetectRecord: {
    browser: Chrome,
  },
};

let setFirefox = state => {
  ...state,
  browserDetectRecord: {
    browser: Firefox,
  },
};

let setAndroid = state => {
  ...state,
  browserDetectRecord: {
    browser: Android,
  },
};

let setIOS = state => {
  ...state,
  browserDetectRecord: {
    browser: IOS,
  },
};

let setUnknown = state => {
  ...state,
  browserDetectRecord: {
    browser: Unknown,
  },
};