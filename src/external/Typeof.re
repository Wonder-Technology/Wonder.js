type typeofTarget;

let typeof: typeofTarget => string = [%bs.raw
  {|
    function(target){
        typeof target
    }
    |}
];