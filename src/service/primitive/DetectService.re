type detectTarget;

let hasProperty: (string, detectTarget) => Js.boolean = [%bs.raw
  {|
    function has(property, target){
        return property in target
    }
    |}
];