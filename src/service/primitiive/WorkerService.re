let getSelf = [%bs.raw {|
    function(){
        return self;
    }
    |}];

let _isInOtherWorker = [%bs.raw
  {|
       function(worker) {
           return !!worker.location;
       }
        |}
];

let postMessage = (data, worker) => {
  /* TODO remove */
  _isInOtherWorker(worker) === Js.true_ ?
    {
      WonderLog.Log.log({j|--in other worker-- post message to main worker:|j});
      WonderLog.Log.logJson(data)
    } :
    {
      WonderLog.Log.log({j|**in main worker** post message to other worker:|j});
      WonderLog.Log.logJson(data)
    };
  worker |> Worker.postMessage(data)
};