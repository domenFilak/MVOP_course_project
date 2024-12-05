
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit'; 
import { validationResult, matchedData, checkSchema, param } from 'express-validator';
import { createCompanyValidationSchema } from './utils/validationSchemas.mjs';
import {Company} from './mongoose/schemas/company.mjs';


import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200', // Allow only this origin to access the server
    methods: ['GET', 'POST', 'DELETE', 'PATCH'] // Allow specific headers
}));

const PORT = process.env.PORT || 4000;

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to the database"))
.catch((err) => console.log("Error!" + err));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 min
    max: 100, //vsak IP 100 req na windowMs
    message: 'Too many requests, please try again later.'
});
   
app.use(limiter);

//endpoints

app.get('/api/company', async (req, res) => {
    try {
      const companies = await Company.find().select('-__v'); //omit '__v' field from db
      res.status(200).send(companies);
    } catch (err) {
      console.log('Error fetching companies!' + err);
      res.status(500).send({ msg: 'Server Error!' });
    }
});

app.get('/api/company/:id', param('id').isMongoId().withMessage('Dani id ne ustreza MongoDB _id formatu (neprazen string)!'), async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()){
        const errors = result.array().map(err => ({
            field: err.path || err.param,
            message: err.msg
        }));
            
        return res.status(400).send({ errors });
    }

    // Ensure that only the 'id' parameter is present
    const params = Object.keys(req.params);
    if (params.length !== 1 || params[0] !== 'id') {
        return res.status(400).send({ msg: 'Only the "id" parameter is allowed!' });
    }
        
    if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0) {
        return res.status(400).send({ msg: 'No body or query parameters are allowed for this request!' });
    }

    const validatedData = matchedData(req, {onlyValidData: true});
    const id = validatedData.id;

    try {
      const company = await Company.findById(id);
  
      if (!company) {
        return res.status(404).send({ msg: 'Company with id=' + id + ' not found!' });
      }
  
      return res.status(200).send(company);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ msg: 'Internal Server Error!', error: err.message });
    }
});


app.post('/api/company', checkSchema(createCompanyValidationSchema), async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()){
        const errors = result.array().map(err => ({
            field: err.path || err.param,
            message: err.msg
        }));
        
        return res.status(400).send({ errors });
    }

    //Give an error if any extra fields are sent through request body
    const allowedFields = Object.keys(createCompanyValidationSchema);
    const requestFields = Object.keys(req.body);

    const extraFields = requestFields.filter(field => !allowedFields.includes(field));
    if (extraFields.length > 0) {
        return res.status(400).send({
            error: `Extra fields are not allowed: ${extraFields.join(', ')}!`
        });
    }

    if (Object.keys(req.params).length > 0 || Object.keys(req.query).length > 0) {
        return res.status(400).send({ error: 'No parameters are allowed for this request!'});
    }

    //Extract only the fields that are valid and match the schema
    const data = matchedData(req, {onlyValidData: true});
    console.log("Received JSON data:", data);

    //PREVERI CE RANK ZE OBSTAJA ==> RANK NAJ BO ID KLJUC
    const newCompany = new Company(data);
    try {
        const savedCompany = await newCompany.save();
        return res.status(201).send({msg:"Company saved!"});
    } catch (err){
        console.log(err);
        return res.status(400).send({msg: "Bad request!"});
    }
    
});

app.patch('/api/company/:id', param('id').isMongoId().withMessage('Dani id ne ustreza MongoDB _id formatu (neprazen string)!'), checkSchema(createCompanyValidationSchema),  async (req, res) => {

    //MI BOMO IZ ANGULAR POSLALI IF UPDATE FORME BODY Z VSEMI FIELDI!

    const result = validationResult(req);
    if (!result.isEmpty()){
        const errors = result.array().map(err => ({
            field: err.path || err.param,
            message: err.msg
        }));
        
        return res.status(400).send({ errors });
    }

    //Give an error if any extra fields are sent through request body
    const allowedFields = Object.keys(createCompanyValidationSchema);
    const requestFields = Object.keys(req.body);
    
    const extraFields = requestFields.filter(field => !allowedFields.includes(field));
    if (extraFields.length > 0) {
        return res.status(400).send({
            error: `Extra fields are not allowed: ${extraFields.join(', ')}!`
        });
    }

    //Give an error if any other parameters instead of id are given
    const params = Object.keys(req.params);
    if (params.length !== 1 || params[0] !== 'id') {
        return res.status(400).send({ msg: 'Only the "id" parameter is allowed!' });
    }
    
    if (Object.keys(req.query).length > 0) {
        return res.status(400).send({ msg: 'No query parameters are allowed for this request!' });
    }


    // Extract only the fields from `req.body` and `req.params`
    const bodyData = matchedData(req, {onlyValidData: true, locations: ['body'] });
    const paramsData = matchedData(req, {onlyValidData: true, locations: ['params'] });
    const id = paramsData.id;

    console.log("Received JSON body data:", bodyData);
    console.log("Received params data:", id);

    
    try {
        const updatedCompany = await Company.findByIdAndUpdate(id, bodyData, {
            new: true, 
            runValidators: true
        });

        if (!result) {
            return res.status(404).send({ msg: 'Company with id='+id+" not found!" });
        }
        return res.status(200).send({ msg: "Company with id="+id+" successfully patched!"});

    } catch (error) {
        console.error('Error patching the company!', error);
        return res.status(500).send({ msg: 'Internal Server Error!', error: error.message });
    }
    
});

app.delete(
    '/api/company/:id',   
    param('id')
        .isMongoId().withMessage('Dani id ne ustreza MongoDB _id formatu (neprazen string)!'), 
    async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()){
        const errors = result.array().map(err => ({
            field: err.path || err.param,
            message: err.msg
        }));
            
        return res.status(400).send({ errors });
    }

    // Ensure that only the 'id' parameter is present
    const params = Object.keys(req.params);
    if (params.length !== 1 || params[0] !== 'id') {
        return res.status(400).send({ msg: 'Only the "id" parameter is allowed!' });
    }
    
    if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0) {
        return res.status(400).send({ msg: 'No body or query parameters are allowed for this request!' });
    }

    const validatedData = matchedData(req, {onlyValidData: true});
    const id = validatedData.id;
    
    try {
        const result = await Company.findByIdAndDelete(id);
  
        if (!result) {
            return res.status(404).send({ msg: 'Company with id='+id+" not found!" });
        }
        return res.status(200).send({ msg: "Company with id="+id+" successfully deleted!"});

      } catch (error) {
        console.error('Error deleting the company!', error);
        return res.status(500).send({ msg: 'Internal Server Error!', error: error.message });
    }
    
});


app.listen(PORT, () => {
    console.log("Server running on port="+PORT);
});
