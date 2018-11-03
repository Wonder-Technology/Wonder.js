let getImageName = [%bs.raw image => {|
        return image.name;
    |}];

let setImageName = [%bs.raw
  (image, name) => {|
    /* if(image.name !== undefined){
        image.name = name;
    } */

        image.name = name;
    |}
];