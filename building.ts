// const i = img`
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
// `;

// const Test = new SpriteBuilder()
//     .withImage(i)
//     .withKind(SpriteKind.Placeholder)
//     .withFlag(SpriteFlag.StayInScreen)
//     .withPosition(screen.width / 2, screen.height / 2, 90)
//     .build();

// forever(() => {
//     const range = 150;

//     if (randint(1, 9) > 6) {
//         Test.setVelocity(
//             randint(-range, range),
//             randint(-range, range)
//         );
//     }
// });

// let fac = new particles.ShapeFactory(15, 15, createImage(16, 16, game.Color.Purple));
// let src = new particles.ParticleSource(Test, 50, fac);
// let par = fac.createParticle(src.anchor);

// fac.setSpeed(0);

// for (let i = 18; i > 0; i -= 2) {
//     let color = 0;

//     if (randint(1, 2) == 2) {
//         color = game.Color.Purple
//     } else {
//         color = 1;
//     }

//     fac.addShape(createImage(i, i, color));
// }