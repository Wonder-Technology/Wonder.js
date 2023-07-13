export let warn = (message) => {
    console.warn(message);
}

export let log = (message) => {
    console.log(message);
}

export let fatal = (message) => {
    console.error(message);
    throw new Error(message);
}

export let print = (message) => {
    console.log(message);
}