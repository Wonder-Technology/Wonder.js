open StateDataMainType;

open BrowserDetectType;

let _isFirefox: unit => bool = [%bs.raw
  {|
    function(){
        return navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ;
    }
    |}
];

let _isChrome: unit => bool = [%bs.raw
  {|
    function(){
        return navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ;
    }
    |}
];

let detect = (state) => {
  ...state,
  browserDetectRecord: {
    browser: _isFirefox() === true ? Firefox : _isChrome() === true ? Chrome : Unknown
  }
};