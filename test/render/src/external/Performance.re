[@bs.val] external root : Js.t({..}) = "window";

let setFakeNow: float => unit = [%bs.raw{|
   function(time) {
     window.performance.now = function(){
       return time
     }
   }
    |}]