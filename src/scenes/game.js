let width, height, targets = [], slide, mContext;
let slides = [
    '3', '8', '9', '10', '11', '12', '13', '14', '15', '16',
    '17', '18', '20', '21', '22', '23', '24', '26', '27', '36',
    '39', '46', '47', '52', '53', '54', '55', '56', '58', '59',
    '60', '61', '62', '63', '64', '65'
];

export class Game extends Phaser.Scene {
    constructor ()
    {
        super('Game');
    }

    preload(){
        this.load.setPath('public/assets');
        this.load.image('mapa', 'mapa.png');
        this.load.image('square', 'square.png');
        this.load.image('next', 'siguiente.png');
        this.load.image('prev', 'atras.png');
        this.load.image('home', 'home.png');

        slides.forEach(cont => {
            this.load.image(cont, `slides/${cont}.png`);
        });
    }

    create(){
        mContext = this;
        width = this.game.config.width;
        height = this.game.config.height;

        this.cameras.main.setBounds(0, 0, 1920, 1080);
        this.add.image(0, 0, 'mapa').setScale(0.47, .57).setOrigin(0);

        const cam = this.cameras.main;
        cam.setZoom(1);
        cam.centerOn(0, 0);

        this.init();

        targets.forEach(target => {
            target.setAlpha(0.001);
        });

        // let mouse = this.input;
        // mouse.on('pointerdown', function(pointer){
        //     console.log(pointer.x, pointer.y);
        // });

        targets.forEach(target => {
            target.on('pointerdown', function(){
                target.removeInteractive();
                cam.pan(target.x, target.y, 2000, 'Power2');
                cam.zoomTo(1.5, 2000);

                cam.on('camerapancomplete', () => {
                    if (cam.panEffect.destination.x != 0 && cam.panEffect.destination.y != 0){
                        mContext.popUp(target, cam);
                    }
                });
            });
        });
    }

    popUp(target, cam){
        let popButtons = [];
        slide = mContext.physics.add.sprite((cam.width/2), (cam.height/2), slides[0]).setScale(0.6).setScrollFactor(0);

        let nextBtn = mContext.physics.add.sprite((cam.width/2) + 500, (cam.height) - 270, 'next').setScale(0.3).setInteractive().setScrollFactor(0);
        let prevBtn = mContext.physics.add.sprite((cam.width/2) + 370, (cam.height) - 270, 'prev').setScale(0.3).setInteractive().setScrollFactor(0);
        let homeBtn = mContext.physics.add.sprite((cam.width/2) + 265, (cam.height) - 270, 'home').setScale(0.3).setInteractive().setScrollFactor(0);
        popButtons.push(nextBtn, prevBtn, homeBtn);

        homeBtn.on('pointerdown', function(){
            cam.pan(0, 0, 2000, 'Power2');
            cam.zoomTo(1, 2000);
            slide.destroy();
            popButtons.forEach(btn => {
                btn.destroy();
            });

            target.setInteractive();
        });
    }

    init(){
        let target = this.add.sprite(1520, 435, 'square').setScale(1.8).setInteractive().setAngle(45);
        target.slides = [3, 8, 9]
        targets.push(target);

        // targets.push(
        //     this.add.sprite(1421, 370, 'square').setScale(1.8).setInteractive().setAngle(45),
        //     this.add.sprite(1290, 273, 'square').setScale(1.8).setInteractive().setAngle(45),
        //     this.add.sprite(1170, 214, 'square').setScale(1.8).setInteractive().setAngle(45),
        //     this.add.sprite(1084, 121, 'square').setScale(1.8).setInteractive().setAngle(45),

        //     this.add.sprite(1160, 558, 'square').setScale(3.5, 3).setInteractive().setAngle(45),
        //     this.add.sprite(1008, 692, 'square').setScale(2).setInteractive().setAngle(45),
        //     this.add.sprite(840, 825, 'square').setScale(2.5, 2).setInteractive().setAngle(45),
        //     this.add.sprite(701, 956, 'square').setScale(2).setInteractive().setAngle(45),
        //     this.add.sprite(427, 1001, 'square').setScale(2).setInteractive().setAngle(45),
        //     this.add.sprite(101, 977, 'square').setScale(2).setInteractive().setAngle(45),
        //     this.add.sprite(242, 845, 'square').setScale(2).setInteractive().setAngle(45),
        //     this.add.sprite(492, 785, 'square').setScale(3, 2.5).setInteractive().setAngle(45),
        //     this.add.sprite(648, 685, 'square').setScale(2).setInteractive().setAngle(45),
        //     this.add.sprite(395, 645, 'square').setScale(2).setInteractive().setAngle(45),
        //     this.add.sprite(530, 568, 'square').setScale(2).setInteractive().setAngle(45),
        //     this.add.sprite(732, 843, 'square').setScale(2).setInteractive().setAngle(45),
        //     this.add.sprite(732, 483, 'square').setScale(2).setInteractive().setAngle(45),
        //     this.add.sprite(943, 338, 'square').setScale(2).setInteractive().setAngle(45),

        //     this.add.sprite(1496, 825, 'square').setScale(2).setInteractive().setAngle(45),

        //     this.add.sprite(555, 182, 'square').setScale(2).setInteractive().setAngle(45),
        //     this.add.sprite(313, 59, 'square').setScale(4).setInteractive().setAngle(45),
        //     this.add.sprite(406, 307, 'square').setScale(2, 4).setInteractive().setAngle(45),
        // );
    }
} 