const entries = Entries.create();
const datapack = new DataCompound("coiltest");

enablePrint()


let playerImg = img`
    ...............bbbbbbbbbbbbbbbbbbb...............
    ...........bbbbdd111111111111111ddbbbb...........
    ........bbbd1111111111111111111111111dbbb........
    ......bbd11111111dddddddddddddd111111111dbb......
    ....bbd1111111ddd11111111111111dddd1111111dbb....
    ...bd111111ddd111111111111111111111ddd111111db...
    ..bd11111ddd111ddddddddddddddddddd111ddd11111db..
    .bd11111dd111dddd111111111111111dddd111dd11111db.
    .b11111d111ddd111111111111111111111ddd111d11111b.
    bd11111d1ddd1111111111111111111111111ddd1111111db
    b11111d1ddd111111111111111111111111111ddd1d11111b
    b11111ddddd111111111111111111111111111ddddd11111b
    b11111ddddd111111111111111111111111111dddbd11111b
    b111111dddd111111111111111111111111111dddb111111b
    bd111111dddd1111111111111111111111111dddbd11111db
    .b1111111dddd11111111111111111111111dddbd111111b.
    .bd1111111dbbdd1111111111111111111dddbbd111111db.
    ..bd11111111dbbdd111111111111111dddbbd1111111db..
    ...bd111111111dbbbbbbdddddddddddddd111111111db...
    ....bbd11111111111dbbbbbbbbbddd11111111111dbb....
    ......bbdd11111111111111111111111111111ddbb......
    ........bbbdd11111111111111111111111ddbbb........
    ...........bbbbbddd11111111111dddbbbbb...........
    ................bbbbbbbbbbbbbbbbb................
`;
let player = entries.sprite("Player", playerImg);

imageTest(playerImg);



function imageTest(img: Image) {
    for (let w = 0; w < img.width; w++) {
        for (let h = 0; h < img.height; h++) {
            const pixel = img.getPixel(
                w,
                h
            );

            if (pixel != game.Color.Transparent) {
                let pre = img.getPixel(w, h);

                img.setPixel(
                    w,
                    h,
                    game.Color.Yellow
                );

                pause(1);

                img.setPixel(
                    w,
                    h,
                    pre
                );
            }

            pause(1);
        }
    }

    pause(50);

    for (let w = 0; w < img.width; w++) {
        for (let h = 0; h < img.height; h++) {
            const pixel = img.getPixel(
                w,
                h
            );

            if (pixel != game.Color.Transparent) {
                let pre = img.getPixel(w, h);

                img.setPixel(
                    w,
                    h,
                    game.Color.Yellow
                );

            }

            pause(1);
        }
    }

    pause(50);

    for (let i = 0; i < img.height; i++) {
        img.scroll(0, 1);
        pause(25);
    }
}