open StateDataMainType;

let _isFirefox: unit => Js.boolean = [%bs.raw
  {|
    function(){
        return navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ;
    }
    |}
];

let _isChrome: unit => Js.boolean = [%bs.raw
  {|
    function(){
        return navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ;
    }
    |}
];

let detect = (state) => {
  ...state,
  browser: _isFirefox() === Js.true_ ? Firefox : _isChrome() === Js.true_ ? Chrome : Unknown
};