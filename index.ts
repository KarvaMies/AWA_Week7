import express, {Express, Request, Response} from "express";

const app: Express = express();
const port: number = 3000;

interface Vehicle {
    model: string
    color: string
    year: number
    power: number
    bodyType?: string
    wheelCount?: number
    draft?: number
    wingspan?: number
}

let vehicleList: Vehicle[] = [];

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("<h1>This is the home page!</h1>")
});

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello world")
});

app.post("/vehicle/add", (req: Request, res: Response) => {
    const { model, color, year, power }: Vehicle = req.body;
    if (model && color && year && power) {
        const vehicle: Vehicle = { model, color, year, power };

        if ("bodyType" in req.body && "wheelCount" in req.body) { // car
            console.log("it's a car!");
            const { bodyType, wheelCount }: Vehicle = req.body;
            vehicle.bodyType = bodyType;
            vehicle.wheelCount = wheelCount;
        } else if ("draft" in req.body) { // boat
            console.log("it's a boat!");
            const { draft }: Vehicle = req.body;
            vehicle.draft = draft;
        } else if ("wingspan" in req.body) { // plane
            console.log("it's a plane!");
            const { wingspan }: Vehicle = req.body;
            vehicle.wingspan = wingspan;
        }

        vehicleList.push(vehicle);
        res.status(201).send("Vehicle added");
    } else {
        res.status(400).send("Invalid vehicle data");
    }
    console.log("Vehicle list:");    
    console.log(vehicleList);
});


app.get("/vehicle/search/:model", (req: Request, res: Response) => {
    let { model } = req.params;
    let foundVehicle = vehicleList.find((vehicle) => vehicle.model === model);

    if (foundVehicle) {
        res.status(200).json(foundVehicle);
    } else {
        res.status(404).send("Vehicle not found");
    }
});


app.listen(port, () => {
    console.log("Server is running at http://localhost:" + port)
})
