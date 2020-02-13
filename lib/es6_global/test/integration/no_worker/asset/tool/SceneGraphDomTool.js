


var buildFakeImage = (
   function (param){
     window.Image = function(){
       this.src = null;
       this.onload = null;
       this.complete = true;
     }
   }
);

export {
  buildFakeImage ,
  
}
/* buildFakeImage Not a pure module */
