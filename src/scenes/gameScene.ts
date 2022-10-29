import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

  private platfroms?: Phaser.Physics.Arcade.StaticGroup;
  private player: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("GameScene");
  }
  //
  preload(): void {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  //
  create(): void {

    this.cursors = this.input.keyboard.createCursorKeys()

    this.add.image(400, 300, 'sky');

    this.platfroms = this.physics.add.staticGroup();

    this.add.image(400, 300, 'star');

    this.platfroms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platfroms.create(600, 400, 'ground');
    this.platfroms.create(50, 250, 'ground');
    this.platfroms.create(750, 220, 'ground');
    
    //player
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //animation
    this.anims.create({
        key:'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    //
    this.anims.create({
        key:'turn',
        frames:[{key:'dude', frame:4}],
        frameRate: 20
    });
    //
    this.anims.create({
        key:'right',
        frames: this.anims.generateFrameNumbers('dude',{start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });


    this.physics.add.collider(this.player, this.platfroms);
  }
  //
  update(time: number, delta: number): void {
    if(this.cursors.left.isDown){
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
    }else if(this.cursors.right.isDown){
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
    }else{
        this.player.setVelocity(0);
        this.player.anims.play('turn');
    }

    if(this.cursors.up.isDown && this.player.body.touching.down){
        this.player.setVelocityY(-330);
    }
  }
}
