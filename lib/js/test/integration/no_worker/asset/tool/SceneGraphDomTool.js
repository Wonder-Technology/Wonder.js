'use strict';


var buildFakeImage = (
   function (param){
     window.Image = function(){
       this.src = null;
       this.onload = null;
       this.complete = true;
     }
   }
);

exports.buildFakeImage = buildFakeImage;
/* buildFakeImage Not a pure module */
