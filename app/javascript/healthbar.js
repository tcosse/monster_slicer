export class HealthBar {
  constructor (scene, x, y, width, height, color) {
    this.bg = scene.add.rectangle(x, y, width + 2, height + 2, 0, 0.6)
      .setOrigin(0, 0);
    this.depth = 20;
    this.bar = scene.add.rectangle(x + 1, y + 1, width, height, color)
      .setOrigin(0, 0);
  }

  add (target) {
    target.on('healthchange', this.draw, this);
  }

  draw (target, change, health, max) {
    this.bar.displayWidth = Math.max(0, health);
  }
}
