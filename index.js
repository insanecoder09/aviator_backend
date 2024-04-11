import express from 'express'
import cors from 'cors'

const app = express();

const keys = [
    "dht-dct-ksy",
    "ahr-dhv-eut",
    "yet-kgt-eit",
]

const keyDetails = {
    "dht-dct-ksy": {
        name: "Vivek",
        isActive: true,
        activateTime: "Thu Apr 11 2024 22:26:56 GMT+0530 (India Standard Time)",
        validity: 1
    },
    "ahr-dhv-eut": {
        name: "Lala",
        isActive: true,
        activateTime: "Tue Apr 10 2024 19:47:49 GMT+0530 (India Standard Time)",
        validity: 2
    },
    "yet-kgt-eit": {
        name: "Lali",
        isActive: true,
        activateTime: "Thu Apr 11 2024 21:58:43 GMT+0530 (India Standard Time)",
        validity: 3
    },
}

app.use(cors());

const timeValidater = (keyTime, keyValidity) => {
    const currentTime = Date();
    const currentTimeCode = new Date(currentTime).getTime();
    const keyTimeCode = new Date(keyTime).getTime();

    const timeSpent = (currentTimeCode - keyTimeCode) / 3600000;

    if (timeSpent > (keyValidity * 24)) {
        return {
            resType: 'error',
            resCode: '2',
            message: 'Key Expired'
        }
    }
    else return {
        resType: 'success',
        resCode: '3',
        message: 'Check the Key in Local Storage',
        timeSpent: timeSpent
    }
}

app.get('/', (req, res) => {
    res.send("Hello World");
})


app.get('/keyCheck/:key', (req, res) => {
    if (keys.includes(req.params.key)) {
        if (!keyDetails[req.params.key].isActive) {
            res.send({
                resType: 'error',
                resCode: '1',
                message: 'Key Inactive'
            });
        }
        else {
            let validatorResult = timeValidater(keyDetails[req.params.key].activateTime, keyDetails[req.params.key].validity)
            res.send(validatorResult);
        }
    }
    else res.send({
        resType: 'error',
        resCode: '0',
        message: 'Invalid Key'
    });
})

app.get('/newPrediction/:key', (req, res) => {
    if (keys.includes(req.params.key)) {
        const Prediction = ((Math.random()*3)+1).toFixed(2)
        res.send(Prediction);
    }
    else res.send('0')
})


app.listen(3000, console.log("Server running on port 3000"));
