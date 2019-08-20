
let buildFakeImage = [%bs.raw
{|
   function (param){
     window.Image = function(){
       this.src = null;
       this.onload = null;
       this.complete = true;
     }
   }
|}
];
