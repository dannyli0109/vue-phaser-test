function addAnimation (sprite, name, positions, speed) {
    let frames = positions.map((element) => {
        return twoDIndexConvert(element[0], element[1], element[2])
    })
    sprite.animations.add(name, frames, speed, true)
}

function twoDIndexConvert (row, col, colLength) {
    return row * (colLength) + col
}

function sign (number) {
    return number > 0.5 ? 1 : -1
}

export { addAnimation, sign }
