


function getImageName (image){
        return image.name;
    };

function setImageName (image,name){
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
