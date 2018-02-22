let getSelf = [%bs.raw {|
    function(){
        return self;
    }
    |}];