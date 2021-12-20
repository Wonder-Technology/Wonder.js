let throwErr = %bs.raw(`
(err) => {
    throw err;
}
`)

let buildErr = %bs.raw(`
(message) => {
return new Error(message);
}
`)
