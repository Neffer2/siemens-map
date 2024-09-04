export class Game extends Phaser.Scene {
    constructor ()
    {
        super('Game');
    }

    preload(){
        this.load.setPath('public/assets');
        this.load.image('mapa', 'mapa.png');
    }

    create(){
        this.cameras.main.setBounds(0, 0, 1080, 1920);
        this.add.image(0, 0, 'mapa').setScale(0.47, .57).setOrigin(0);

        const cam = this.cameras.main;
        cam.setZoom(1);
        cam.centerOn(0, 0);

        setTimeout(() => {
            // cam.pan(767, 1096, 2000, 'Power2');
            cam.zoomTo(2, 2500);
        }, 1500);



    }
} 