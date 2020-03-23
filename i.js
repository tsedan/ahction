class Inventory {
  //The inventory as viewed by the client
  constructor(wid, hei) {
    this.items = [];
    for (let i = 0; i < hei; i++) {
      this.items[i] = [];
      for (let j = 0; j < wid; j++) this.items[i][j] = new Item({}, true);
    }
    this.wid = wid, this.hei = hei;
  }

  draw(x, y, d, sx, sy) { //x, y, radius, spacing
    push();
    for (let i = 0; i < this.wid; i++)
      for (let j = 0; j < this.hei; j++)
        this.items[j][i].draw(x + i*sx, y + j*sy, d);

    for (let i = 0; i < this.wid; i++)
      for (let j = 0; j < this.hei; j++)
        if (mouseHovering(x + i*sx, y + j*sy, d/2)) this.items[j][i].tooltip();
    pop();
  }

  add(item) {
    for (let i = 0; i < this.hei; i++)
      for (let j = 0; j < this.wid; j++)
        if (this.items[i][j].isNull) { this.items[i][j] = item; return true; }
    return false;
  }
}

class Item {
  constructor(props, nothing=false) {
    if (nothing) { this.isNull = true; return; }
    this.name = props.name;
    this.desc = props.desc;
    this.ench = props.ench;
    this.type = props.type;
    this.rare = props.rare;
    this.imag = props.imag;
    this.isNull = false;
  }

  draw(x, y, d) {
    push();
    fill(mouseHovering(x, y, d/2) ? 158 : 102);
    circle(x, y, d);
    if (!this.isNull) image(this.imag, x, y, 5*d/4, 5*d/4);
    pop();
  }

  tooltip() {
    if (this.isNull) return;
    push();

    stroke('#2d3436');
    strokeWeight(8);
    fill('#636e72');
    rect(mouseX,mouseY,300,500);

    pop();
  }
}
