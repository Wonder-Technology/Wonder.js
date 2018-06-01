let _isArraySame = [%bs.raw
  {|
   function(arr1, arr2) {
       return arr1 === arr2;
   }
    |}
];

let isArraySame = (arr1, arr2) => _isArraySame(arr1, arr2);