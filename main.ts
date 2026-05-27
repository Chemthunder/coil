const src = "https://github.com/Chemthunder/coil";

const Coil = new Game(
    "Coil",
    {
        author: "Chemthunder",
        version: 1.5,
        license: "ARR",
        desc: "A compact library of commonly used utilities by Chemthunder."
    }
);

const CoilConfig = new Config();
CoilConfig.writeEntries(
    [
        Property.of("IsPublicRelease", true)
    ]
);
CoilConfig.sync();

const coilDetails = [
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