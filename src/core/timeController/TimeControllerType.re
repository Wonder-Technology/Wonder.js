type timeControllerData = {
    mutable elapsed: float,
    mutable startTime:float,
    mutable deltaTime: float,
    mutable lastTime: option(float),
    mutable gameTime: float,
    mutable fps: float
}