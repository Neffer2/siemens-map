let width, height, targets = [];

export class Game extends Phaser.Scene {
    constructor ()
    {
        super('Game');
    }

    preload(){
        this.load.setPath('public/assets');
        this.load.image('mapa', 'mapa.png');
        this.load.image('square', 'square.png');
    }

    create(){
        width = this.game.config.width;
        height = this.game.config.height;

        this.cameras.main.setBounds(0, 0, 1920, 1080);
        this.add.image(0, 0, 'mapa').setScale(0.47, .57).setOrigin(0);

        const cam = this.cameras.main;
        cam.setZoom(1);
        cam.centerOn(0, 0);

        
        targets.push(
            this.add.sprite(1520, 435, 'square').setScale(1.8).setInteractive().setAngle(45),
            this.add.sprite(1421, 370, 'square').setScale(1.8).setInteractive().setAngle(45),
            this.add.sprite(1290, 273, 'square').setScale(1.8).setInteractive().setAngle(45),
            this.add.sprite(1170, 214, 'square').setScale(1.8).setInteractive().setAngle(45),
            this.add.sprite(1084, 121, 'square').setScale(1.8).setInteractive().setAngle(45),

            this.add.sprite(1160, 558, 'square').setScale(3.5, 3).setInteractive().setAngle(45),
            this.add.sprite(1008, 692, 'square').setScale(2).setInteractive().setAngle(45),
            this.add.sprite(840, 825, 'square').setScale(2.5, 2).setInteractive().setAngle(45),
            this.add.sprite(701, 956, 'square').setScale(2).setInteractive().setAngle(45),
            this.add.sprite(427, 1001, 'square').setScale(2).setInteractive().setAngle(45),
            this.add.sprite(101, 977, 'square').setScale(2).setInteractive().setAngle(45),
            this.add.sprite(242, 845, 'square').setScale(2).setInteractive().setAngle(45),
            this.add.sprite(492, 785, 'square').setScale(3, 2.5).setInteractive().setAngle(45),
            this.add.sprite(648, 685, 'square').setScale(2).setInteractive().setAngle(45),
            this.add.sprite(395, 645, 'square').setScale(2).setInteractive().setAngle(45),
            this.add.sprite(530, 568, 'square').setScale(2).setInteractive().setAngle(45),
            this.add.sprite(732, 843, 'square').setScale(2).setInteractive().setAngle(45),
            this.add.sprite(732, 483, 'square').setScale(2).setInteractive().setAngle(45),
            this.add.sprite(943, 338, 'square').setScale(2).setInteractive().setAngle(45),

            this.add.sprite(1496, 825, 'square').setScale(2).setInteractive().setAngle(45),

            this.add.sprite(555, 182, 'square').setScale(2).setInteractive().setAngle(45),
            this.add.sprite(313, 59, 'square').setScale(4).setInteractive().setAngle(45),
            this.add.sprite(406, 307, 'square').setScale(2, 4).setInteractive().setAngle(45),
        );

        targets.forEach(target => {
            target.setAlpha(0.001);
        });

        let mouse = this.input;
        mouse.on('pointerdown', function(pointer){
            console.log(pointer.x, pointer.y);
        });

        targets.forEach(target => {
            target.on('pointerdown', function(){
                cam.pan(target.x, target.y, 2000, 'Power2');
                cam.zoomTo(2, 2500);
            });
        });

        // setTimeout(() => {
        //     cam.zoomTo(2, 2500);
        // }, 1500);

    }
} 