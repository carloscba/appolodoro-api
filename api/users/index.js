const express = require('express')
const api = express.Router()
const Validator = require('validatorjs')
const admin = require('firebase-admin')
const serviceAccount = require('../../serviceAccountKey.json')
const Model = require('./model')

const COLLECTION = 'users'

try{
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://appolodoro-a6b3a.firebaseio.com'
    });
}catch(error){
    console.log(error)
}

var db = admin.firestore();

api.get('/', (req, res, next) => {
    try{
        let docs = [];
        db.collection(COLLECTION).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                let data = doc.data()
                data['id'] = doc.id
                docs.push(data)
            });
            res.json({
                data : docs
            })
        }).catch((err) => {
            next(new Error(err))
        });        
    }catch(error){
        next(error)
    }
    
})

api.get('/:id', (req, res, next) => {
    try{
        db.collection(COLLECTION).get(req.param.id).then((snapshot) => {
            let data;
            snapshot.forEach((doc) => {
                data = doc.data()
                data['id'] = doc.id
            });
            res.json(data)
        }).catch((err) => {
            next(new Error(err))
        });        
    }catch(error){
        next(error)
    }   

})

api.post('/', (req, res, next) => {
    try{
        const data = req.body
        const validation = new Validator(data, Model);
        
        validation.passes(() => {
            const doc = Date.now().toString()
            const docRef = db.collection(COLLECTION).doc(doc)
            docRef.set(data).then(()=> {
                res.json(data)
            }).catch((error)=>{
                next(new Error(error))
            })
        });

        validation.fails(() => {
            const errors = validation.errors.all();
            const keyName = Object.keys(errors)[0];
            next(new Error(errors[keyName][0]))
        });
        
    }catch(error){
        next(error)
    }   
})

module.exports = api