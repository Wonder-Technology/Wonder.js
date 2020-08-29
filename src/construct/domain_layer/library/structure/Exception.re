let throwErr = [%bs.raw {|
(err) => {
    throw err;
}
|}];
