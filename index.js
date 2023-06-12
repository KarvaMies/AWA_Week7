"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
let vehicleList = [];
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("<h1>This is the home page!</h1>");
});
app.get("/hello", (req, res) => {
    res.send("Hello world");
});
app.post("/vehicle/add", (req, res) => {
    const { model, color, year, power } = req.body;
    if (model && color && year && power) {
        const vehicle = { model, color, year, power };
        if ("bodyType" in req.body && "wheelCount" in req.body) { // car
            console.log("it's a car!");
            const { bodyType, wheelCount } = req.body;
            vehicle.bodyType = bodyType;
            vehicle.wheelCount = wheelCount;
        }
        else if ("draft" in req.body) { // boat
            console.log("it's a boat!");
            const { draft } = req.body;
            vehicle.draft = draft;
        }
        else if ("wingspan" in req.body) { // plane
            console.log("it's a plane!");
            const { wingspan } = req.body;
            vehicle.wingspan = wingspan;
        }
        vehicleList.push(vehicle);
        res.status(201).send("Vehicle added");
    }
    else {
        res.status(400).send("Invalid vehicle data");
    }
    console.log("Vehicle list:");
    console.log(vehicleList);
});
app.get("/vehicle/search/:model", (req, res) => {
    let { model } = req.params;
    let foundVehicle = vehicleList.find((vehicle) => vehicle.model === model);
    if (foundVehicle) {
        res.status(200).json(foundVehicle);
    }
    else {
        res.status(404).send("Vehicle not found");
    }
});
app.listen(port, () => {
    console.log("Server is running at http://localhost:" + port);
});
