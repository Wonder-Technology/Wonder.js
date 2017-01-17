declare var window:Window;

module wd{
    export var root:any = null,
        // RSVP:any = null,
        expect:any = null;

    // if(JudgeUtils.isNodeJs() && typeof global != "undefined"){
    //     root = global;
    // }
    // else{
    root = window;
    // }

    // if (!!root.RSVP){
    // if(typeof RSVP != "undefined"){
    //     // RSVP = root.RSVP;
    // }
    // else{
    //     RSVP = root;
    // }

    // if(!!root.chai){
    if(typeof chai != "undefined"){
        expect = chai.expect;
    }
}


