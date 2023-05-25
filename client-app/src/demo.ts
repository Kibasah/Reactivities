interface Itik{
    name: string,
    numLegs: number,
    makeSound: (sound: string) => void;
}

interface Mallard{
    name: string,
    numLegs: number,
    makeGrunt: (sound:string) => void;
}

let duck2 : Mallard= {
    name: "Donald",
    numLegs: 2,
    makeGrunt: (sound : string) => console.log(sound)
}

const duck1 : Itik= {
    name: "Budak",
    numLegs: 2,
    makeSound: (sound : any) =>console.log(sound)
}

duck1.makeSound('quack');
duck2.numLegs;

