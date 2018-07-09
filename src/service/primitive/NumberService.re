let hexFloat_of_string: string => float = [%bs.raw
  {|
function(str) {
    return parseInt(str, 16);
}
|}
];

let leastFloat = (min, num) => num < 0. ? 0. : num;

let bigThan = (num, below) => num < below ? below : num;

let clamp = (num, below, up) => num < below ? below : num > up ? up : num;