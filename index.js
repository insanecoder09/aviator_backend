import express from 'express'
import cors from 'cors'

const app = express();

const keys = [
    "dht-dct-ksy",
    "ahr-dhv-eut",
    "yet-kgt-eit",
    "hgt-str-khy",
    "nhy-fht-ltc",
]

const keyDetails = {
    "dht-dct-ksy": {
        name: "Vivek",
        isActive: true,
        activateTime: "Tue Jun 18 2024 19:47:49 GMT+0530 (India Standard Time)",
        validity: 180
    },
    "ahr-dhv-eut": {
        name: "Lala",
        isActive: true,
        activateTime: "Tue Apr 10 2024 19:47:49 GMT+0530 (India Standard Time)",
        validity: 2
    },
    "yet-kgt-eit": {
        name: "Lali",
        isActive: false,
        activateTime: "",
        validity: 3
    },
    "hgt-str-khy": {
        name: "Vivek Lodu",
        isActive: true,
        activateTime: "Fri Apr 12 2024 18:38:05 GMT+0530 (India Standard Time)",
        validity: 20
    },
    "nhy-fht-ltc": {
        name: "Vivek Lodu 2",
        isActive: true,
        activateTime: "Fri Apr 12 2024 18:38:05 GMT+0530 (India Standard Time)",
        validity: 20
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

const btw12 = () => {
    var num = ((Math.random() * 2)).toFixed()
    if(num==0)
    num = btw12();

    return num;
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
        const Prediction = btw12()==1?'BIG':'SMALL';
        res.send(Prediction);
    }
    else res.send('0')
})


app.listen(3000, console.log("Server running on port 3000"));
