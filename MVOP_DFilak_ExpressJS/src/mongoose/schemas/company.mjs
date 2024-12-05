import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    rank: {
        type: mongoose.Schema.Types.String,
        required: true
        //unique: true // da je unique v db
    },
    ime: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    prihodek: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    dobicek: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    sredstva: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    stZaposlenih: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});


export const Company = mongoose.model('Company', CompanySchema);