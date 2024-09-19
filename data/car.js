
class Car{

    constructor(carDetails){
        this.brand = carDetails.brand;
        this.model = carDetails.model;
        this.speed = 0;
        this.isTrunkOpen = false;
    }
    displayInfo(){
        console.log(`Brand: ${this.brand}, Model: ${this.model}, Speed: ${this.speed} km/h, TrunkInfo: ${this.isTrunkOpen}`);
    }
    go(){
        if(this.speed <= 195 && this.isTrunkOpen==false){this.speed += 5};
        console.log(`The ${this.brand} ${this.model} is going at ${this.speed} km/h.`);
    }
    brake(){
        if (!this.speed <= 5){this.speed -= 5};
        console.log(`The ${this.brand} ${this.model} is going at ${this.speed} km/h.`);
        // console.log(`The ${this.brand} ${this.model} has stopped.`);
    }
    openTrunk(){
        if (this.speed==0){
            this.isTrunkOpen = true;
            console.log(`The ${this.brand} ${this.model} trunk is open.`);
        }else{
            console.log(`The ${this.brand} ${this.model} cannot open the trunk while it is moving.`);
        }
    }
    closeTrunk(){
        if (this.isTrunkOpen==true){
            this.isTrunkOpen = false;
            console.log(`The ${this.brand} ${this.model} trunk is closed.`);
        }else{
            console.log(`The ${this.brand} ${this.model} trunk is already closed.`);
        }
    }
    honkHorn(){
        console.log(`The ${this.brand} ${this.model} beeped.`);
    }

}


class RaceCar extends Car{
    acceleration;
    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go(){
        if(this.speed <= 295){this.speed += this.acceleration};
        console.log(`The ${this.brand} ${this.model} is going at ${this.speed} km/h.`);
    }
    
}


const vehicleList = [
    { brand: "Toyota", model: "Camry" },
    { brand: "Honda", model: "Civic" },
    { brand: "Ford", model: "Mustang", acceleration: 5 },
    { brand: "Tesla", model: "Model S" },
    { brand: "Nissan", model: "Altima" },
    { brand: "Volkswagen", model: "Golf" },
    { brand: "BMW", model: "328i" },
    { brand: "Mercedes-Benz", model: "C-Class" },
    { brand: "Audi", model: "A4" },
    { brand: "Mazda", model: "3" },
    { brand: "Hyundai", model: "Elantra" },
    { brand: "Kia", model: "Optima" },
    { brand: "Subaru", model: "Impreza" },
    { brand: "Mitsubishi", model: "Outlander" },
    { brand: "Jeep", model: "Grand Cherokee" },
    { brand: "Land Rover", model: "Range Rover" },
    { brand: "Porsche", model: "911", acceleration: 10 },
    { brand: "Ferrari", model: "488 GTB", acceleration: 15 },
    { brand: "Lamborghini", model: "Huracan", acceleration: 12 },
    { brand: "Aston Martin", model: "DB9", acceleration: 8 }
].map((carDetails) => {
    if (carDetails.acceleration){
        return new RaceCar(carDetails)
    }
    return new Car(carDetails)
});

vehicleList.forEach(vehicle => {
    vehicle.go();
    vehicle.go();
    vehicle.go();
    vehicle.go();
    vehicle.brake();
    vehicle.displayInfo();
});

