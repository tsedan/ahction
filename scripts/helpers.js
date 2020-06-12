function mouseHovering(x, y, r) {
    return sqrt(pow(x - mouseX, 2) + pow(y - mouseY, 2)) < r;
}

function mouseInBounds(minX, minY, maxX, maxY) {
    return (mouseX >= minX && mouseX <= maxX) && (mouseY >= minY && mouseY <= maxY);
}
