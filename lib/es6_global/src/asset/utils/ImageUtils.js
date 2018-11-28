


var getImageName = function (image){
        return image.name;
    };

var setImageName = function (image,name){
    /* if(image.name !== undefined){
        image.name = name;
    } */

        image.name = name;
    };

export {
  getImageName ,
  setImageName ,
  
}
/* No side effect */
