type detectTarget;

let hasProperty: (string, detectTarget) => bool = [%bs.raw
  {|
    function has(property, target){
        return property in target
    }
    |}
];