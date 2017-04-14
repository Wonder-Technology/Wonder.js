import {hideLog, log} from "./debug";

onmessage = (e) => {
    var position:number = e.data.position;

    var isCollide = false;
    var newPosition = null;



    // log("receive collision in worker: ", position)

    if(_isCollide(position)){
        isCollide = true;
        newPosition = 0.2;
    }
    else{
        isCollide = false;
        newPosition = position;
    }

    self.postMessage({
        isCollide: isCollide,
        position: newPosition
    });
};

var _isCollide = (position) => {
    return position > 0.2;
}



hideLog();
