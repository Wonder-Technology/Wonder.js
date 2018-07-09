open StateDataMainType;

open BrowserDetectType;

let _isFirefox: unit => bool = [%bs.raw
  {|
    function(){
      var userAgent = navigator.userAgent.toLowerCase();

        return userAgent.indexOf("firefox") > -1 && userAgent.indexOf("mobile") === -1;
    }
    |}
];

let _isChrome: unit => bool = [%bs.raw
  {|
    function(){
      var userAgent = navigator.userAgent.toLowerCase();

        return userAgent.indexOf("chrome") > -1 && userAgent.indexOf("mobile") === -1;
    }
    |}
];

let _isAndroid: unit => bool = [%bs.raw
  {|
    function(){
        return /Android/i.test(navigator.userAgent)
    }
    |}
];

let _isIOS: unit => bool = [%bs.raw
  {|
    function(){
        return /iPhone|iPad|iPod/i.test(navigator.userAgent)
    }
    |}
];

let detect = state => {
  ...state,
  browserDetectRecord: {
    browser:
      _isFirefox() === true ?
        Firefox :
        _isChrome() === true ?
          Chrome : _isAndroid() ? Android : _isIOS() ? IOS : Unknown,
  },
};