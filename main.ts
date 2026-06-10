const Coil = new Game(
    "Coil",
    {
        author: "Chemthunder",
        version: 1.6,
        license: "ARR",
        desc: "A compact library of commonly used utilities by Chemthunder."
    }
);

const CoilConfig = new Config();
CoilConfig.writeEntries(
    [
        Property.of("IsPublicRelease", false)
    ]
);
CoilConfig.sync();

module Coil_Core {
    export const src = "https://github.com/Chemthunder/coil";

    export const coilDetails = [
        `~~~~ Coil ${Coil.getMetaData().getVersion()} ~~~~`,
        `Owned by ${Coil.getMetaData().getAuthor()}`,
        `Licensed under the ${Coil.getMetaData().getLicense()} license!`,
        `Thank you for using Coil!`,
        `Source code can be found here < ${src} >`,
        `~~~~ <><><> ~~~~`
    ];

    if (CoilConfig.fetch("IsPublicRelease")) {
        coilDetails.forEach(value => print(value));
    }
}


/**
 * DEPRECATED FEATURES
 * @ can be used with functions as a 'decorator', allowing for code to be run (@sealed)
 * Usage of `namespace` can instead be `module`,
 *  module Test {
 *      export const i = 0;
 *  }
 * 
 *  print(Test.i);
 * 
 * Triple nested functions cannot use simplistic math operations.
 * function () {function () {function () {i++;}}}
 */