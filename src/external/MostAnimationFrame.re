/* TODO move to bs- */
open Most;

[@bs.module "wonder-most-animation-frame"] external animationFrames : unit => stream(float) = "";


[@bs.module "wonder-most-animation-frame"] external nextAnimationFrame : unit => stream(float) = "";
