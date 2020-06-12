function mouseHovering(x, y, r) {
    return sqrt(pow(x - mouseX, 2) + pow(y - mouseY, 2)) < r;
}
