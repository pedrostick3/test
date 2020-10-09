"use strict";

const MongoClient = require("mongodb").MongoClient;
const options = require("../config/options.json");

function getMongoDbClient() {
    return new MongoClient(options.mongoDB.connectionString, { useUnifiedTopology: true });
}

/** Sensors Handlers */
/**
 * Função para retornar a lista de sensores da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getSensors(req, res) {
    let client = getMongoDbClient();
    client.connect(function (err) {
        if (err) res.json({"message": "error", "error": err });
        else {            
            let collection = client.db('bluenergy').collection("sensors");
            //collection.find({}, {_id:1, name:1, date:1, sensorId:1, value:1}).toArray(function(err, documents) {
            collection.find({}, {_id:1, id:1, local:1, depart:1, updated_at:1, last_write_at:1, sensors:1}).toArray(function(err, documents) {
                if (err) res.json({"message": "error", "error": err });
                else res.json({"message": "success", "sensors": documents });
                client.close();
            });
        }
    });    
}

/**
 * Função para adicionar um dado de um Sensor à BD.
 * @param {*} req 
 * @param {*} res 
 */
function createSensor(req, res) {
    let client = getMongoDbClient();
    client.connect(function (err) {
        if (err) res.json({"message": "error", "error": err });
        else {
            let collection = client.db('bluenergy').collection("sensors");
            collection.insertOne({
                id: req.body.id,
                local: req.body.local,
                depart: req.body.depart,
                updated_at: req.body.updated_at,
				last_write_at: req.body.last_write_at,
                sensors: req.body.sensors
            }
            /*collection.insertOne({
                    name: req.body.name,
                    date: req.body.date,
                    sensorId: req.body.sensorId,
                    value: req.body.value
                }*/,
                function(err, response) {
                    if (err) res.sendStatus(404);
                    else res.send(response.result);
                    client.close();
                }
            );
        }
    });
}

module.exports.getSensors = getSensors;
module.exports.createSensor = createSensor;