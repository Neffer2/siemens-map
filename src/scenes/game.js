let width, height, targets = [], slide, popButtons = [], mContext, fullScreen, video_28;
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
        this.load.image('mapa', 'mapa.jpg');
        this.load.image('square', 'square.png');
        this.load.image('next', 'siguiente.png');
        this.load.image('prev', 'atras.png');
        this.load.image('home', 'home.png');
        this.load.image('fullScreen-on', 'fullscreen-on.png');
        this.load.image('fullScreen-off', 'fullscreen-off.png');
        this.load.spritesheet('indicador', 'indicador.png', { frameWidth: 100, frameHeight: 120 });

        slides.forEach(cont => {
            this.load.image(cont, `slides/${cont}.png`);
        });

        this.load.video('28', [ 'slides/28.mp4']);
    }

    create(){
        mContext = this;
        width = this.game.config.width;
        height = this.game.config.height;

        this.cameras.main.setBounds(0, 0, 1920, 1080);
        this.add.image(0, 0, 'mapa').setOrigin(0);

        const cam = this.cameras.main;
        cam.setZoom(1);
        cam.centerOn(0, 0);
        this.init_();

        /* FULLSCREEN */
        fullScreen.setInteractive().on('pointerdown', function() {
            if (mContext.scale.isFullscreen) {
                mContext.scale.stopFullscreen();
                fullScreen.setTexture('fullScreen-on');
                // On full screen off
            } else {
                mContext.scale.startFullscreen();
                fullScreen.setTexture('fullScreen-off');
                // On start fulll screen
            }
        });

        targets.forEach(target => {
            target.setAlpha(0.001);
        });

        // let mouse = this.input;
        // mouse.on('pointerdown', function(pointer){
        //     console.log(pointer.x, pointer.y);
        // });

        targets.forEach(target => {
            target.on('pointerdown', function(){
                cam.pan(target.x, target.y, 2000, 'Power2');
                cam.zoomTo(1.5, 2000);

                cam.on('camerapancomplete', () => {
                    if (cam.panEffect.destination.x != 0 && cam.panEffect.destination.y != 0){
                        setTimeout(() => {
                            mContext.popUp(target, cam);
                        }, 500);
                    }
                });
            });
        });
    }

    popUp(target, cam){
        let contSlide = 0;
        mContext.deletePopUp();
        slide = mContext.physics.add.sprite((cam.width/2), (cam.height/2), target.slides[contSlide]).setScale(0.45, 0.6).setScrollFactor(0);

        let nextBtn = mContext.physics.add.sprite((cam.width/2) + 350, (cam.height) - 270, 'next').setScale(0.3).setInteractive().setScrollFactor(0).setAlpha(.6).setDepth(1);;
        let prevBtn = mContext.physics.add.sprite((cam.width/2) + 220, (cam.height) - 270, 'prev').setScale(0.3).setInteractive().setScrollFactor(0).setAlpha(0).setDepth(1);;
        let homeBtn = mContext.physics.add.sprite((cam.width/2) + 115, (cam.height) - 270, 'home').setScale(0.3).setInteractive().setScrollFactor(0).setAlpha(.6).setDepth(1);
        if (target.slides.length === 1){ nextBtn.setAlpha(0);homeBtn.setX((cam.width/2) + 350); }
        popButtons.push(nextBtn, prevBtn, homeBtn);
        
        nextBtn.on('pointerdown', () => {
            nextBtn.setScale(.25);
            if (contSlide < target.slides.length-1){
                contSlide++;
                
                if (target.slides[contSlide] === 28){
                    slide.setAlpha(.001);
                    video_28 = mContext.add.video((cam.width/2), (cam.height/2), target.slides[contSlide]).setScale(1.3).setScrollFactor(0);
                    video_28.play();
                }else {
                    slide.setTexture(target.slides[contSlide]);
                }
            }

            if (contSlide === target.slides.length-1){
                nextBtn.setAlpha(0);
            }

            if (contSlide > 0){
                prevBtn.setAlpha(.6);
            }
        });

        nextBtn.on('pointerout', () => {            
            nextBtn.setScale(.3); 
        });

        prevBtn.on('pointerdown', () => {
            prevBtn.setScale(.25);
            if (contSlide > 0){
                contSlide --;

                if (target.slides[contSlide + 1] === 28){
                    slide.setAlpha(1);
                    video_28.destroy();
                }


                slide.setTexture(target.slides[contSlide]);
            }

            if (contSlide > 0){
                nextBtn.setAlpha(.6);
            }else {
                prevBtn.setAlpha(0);
            }
        });

        prevBtn.on('pointerout', () => {            
            prevBtn.setScale(.3); 
        });

        homeBtn.on('pointerdown', function(){
            homeBtn.setScale(.25); 
            cam.pan(0, 0, 2000, 'Power2');
            cam.zoomTo(1, 2000);
            mContext.deletePopUp();
            target.setInteractive();
        });

        homeBtn.on('pointerout', () => {            
            homeBtn.setScale(.3); 
        });
    }

    deletePopUp(){
        if (slide){slide.destroy()}
        if (video_28){video_28.destroy();}
        if (popButtons){ popButtons.forEach(btn => { btn.destroy() })}
    }

    init_(){
        /* ANIMACIONES */
        this.anims.create({
            key: 'iddle',
            frames: this.anims.generateFrameNumbers('indicador', { start: 0, end: 32 }),
            frameRate: 15,
            repeat: -1
        });

        fullScreen = this.add.image(50, 50, 'fullScreen-on').setScale(.6); 

        let indicador = this.add.sprite(1180, 104, 'indicador'); 
        indicador.anims.play('iddle');
        let target = this.add.sprite(1170, 214, 'square').setScale(1.8).setInteractive().setAngle(45);
        target.slides = [36];
        targets.push(target);

        indicador = this.add.sprite(1094, 11, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(1084, 121, 'square').setScale(1.8).setInteractive().setAngle(45);
        target.slides = [20, 21, 22];
        targets.push(target);

        indicador = this.add.sprite(1179, 448, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(1160, 558, 'square').setScale(3.5, 3).setInteractive().setAngle(45);
        target.slides = [13, 20, 21, 22];
        targets.push(target);

        indicador = this.add.sprite(1018, 582, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(1008, 692, 'square').setScale(2).setInteractive().setAngle(45);
        target.slides = [12, 52, 53, 55, 56];
        targets.push(target);

        indicador = this.add.sprite(850, 715, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(840, 825, 'square').setScale(2.5, 2).setInteractive().setAngle(45);
        target.slides = [47];
        targets.push(target);

        indicador = this.add.sprite(711, 846, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(701, 956, 'square').setScale(2).setInteractive().setAngle(45);
        target.slides = [39];
        targets.push(target);

        indicador = this.add.sprite(110, 867, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(101, 977, 'square').setScale(2).setInteractive().setAngle(45);
        target.slides = [36];
        targets.push(target);

        indicador = this.add.sprite(502, 675, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(492, 785, 'square').setScale(3, 2.5).setInteractive().setAngle(45);
        target.slides = [8, 9, 10, 11, 39, 46, 47, 52, 53, 54];
        targets.push(target);
        
        indicador = this.add.sprite(405, 535, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(395, 645, 'square').setScale(2).setInteractive().setAngle(45)
        target.slides = [36, 46, 52, 53];
        targets.push(target);
        
        indicador = this.add.sprite(826, 111, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(816, 221, 'square').setScale(2).setInteractive().setAngle(45);
        target.slides = [20, 21, 22];
        targets.push(target);

        indicador = this.add.sprite(953, 228, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(943, 338, 'square').setScale(2).setInteractive().setAngle(45);
        target.slides = [58];
        targets.push(target);

        indicador = this.add.sprite(565, 72, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(555, 182, 'square').setScale(2).setInteractive().setAngle(45);
        target.slides = [36, 15, 16, 17, 18];
        targets.push(target);
        
        indicador = this.add.sprite(323, 59, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(313, 59, 'square').setScale(4).setInteractive().setAngle(45);
        target.slides = [36, 15, 16, 17, 18];
        targets.push(target);
        
        indicador = this.add.sprite(416, 187, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(406, 197, 'square').setScale(2, 4).setInteractive().setAngle(45);
        target.slides = [14, 15, 17, 18];
        targets.push(target);

        indicador = this.add.sprite(1505, 56, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(1495, 96, 'square').setScale(2, 4).setInteractive().setAngle(45);
        target.slides = [59, 60, 61, 62, 63, 64, 65];
        targets.push(target);

        indicador = this.add.sprite(1577, 133, 'indicador'); 
        indicador.anims.play('iddle');
        target = this.add.sprite(1567, 233, 'square').setScale(2, 4).setInteractive().setAngle(45);
        target.slides = [23, 24, 26, 27, 28];
        targets.push(target);
    }
} 