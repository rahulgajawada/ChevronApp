import React, { useState } from "react";
import { Button, TextField, Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
const Worker = require('./models/worker1')
const WorkOrder1 = require('./models/workOrder1')
const sendSMS = require('./twilio/send_sms')

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(2),
        align: "center"
    },
    rad: {

    },
}));


export default function WorkOrder() {
    //sets styling
    const classes = useStyles();
    const [facility, setFacility] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [equipmentType, setType] = useState("");
    const [equipmentID, setID] = useState("");
    const [priority, setPriority] = useState("");
    const [time, setTime] = useState("");

    //checks if they put in an email and password
    function validateForm() {
        return facility.length > 0 && equipmentType.length > 0 && equipmentID.length > 0 && priority.length > 0 && time.length;
    }

     //submits data to the backend
     function handleSubmit(event) {
        event.preventDefault();
         fetch('http://localhost:4000/api/workOrder',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({ location: facility, rescueType: equipmentType, disasterType: equipmentID, priority: priority, rescueInstructions: time })
        }).then(x => console.log(x)).catch(error => console.log("ERROR1"))
        
        // const f = async () => {
        
        // const order =  await WorkOrder1.find({ location: facility, rescueType: equipmentType, disasterType: equipmentID, priority: priority, rescueInstructions: time })          
        // console.log(order)
            // const _id = order._id;
            // const url = 'http://localhost:4000/api/assignOrder/' + _id
            // fetch(url).then(response => response.json()).then(data => console.log(data)).catch(error => console.log("ERROR: not able to assign"))
            // const worker = Worker.findByID({order: _id})
            // sendSMS(order["rescueInstructions"], worker["phone"])
        // }
        // f()
        // axios.post("localhost:4000/api/workOrder", { facility: facility, equipment: equipmentType, equipmentID: equipmentID, priority: priority, timeToComplete: time });
    }

    //Notably here the button is disabled if the form isn't validated
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <img src="chevron.jpg"></img>
                <br />
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="facility"
                        label="Location"
                        name="facility"
                        autoFocus
                        form className={classes.form}
                        onChange={e => setFacility(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="latitude"
                        label="Latitude"
                        id="latitude"
                        form className={classes.form}
                        onChange={e => setLatitude(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="longitude"
                        label="Longitude"
                        id="longitude"
                        form className={classes.form}
                        onChange={e => setLongitude(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="equipmentType"
                        label="Rescue Type"
                        id="equipmentType"
                        form className={classes.form}
                        onChange={e => setType(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="equipmentID"
                        label="Disaster Type"
                        id="equipmentID"
                        form className={classes.form}
                        onChange={e => setID(e.target.value)}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="priority"
                        label="Priority(1-5)"
                        id="priority"
                        form className={classes.form}
                        onChange={e => setPriority(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="time"
                        label="Rescue Instructions"
                        id="time"
                        form className={classes.form}
                        onChange={e => setTime(e.target.value)}
                    />
                    <Button
                        margin="normal"
                        fullWidth
                        form className={classes.form}
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!validateForm()}
                    >
                        Send
          </Button>
                </form>
            </div>
            <Box mt={8}>
            </Box>
        </Container>
    );
}
