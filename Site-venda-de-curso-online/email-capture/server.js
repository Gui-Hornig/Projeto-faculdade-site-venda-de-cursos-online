const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost:27017/emailDB', { useNewUrlParser: true, useUnifiedTopology: true });


const emailSchema = new mongoose.Schema({
    email: String
});

const Email = mongoose.model('Email', emailSchema);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 


app.post('/add-email', (req, res) => {
    const newEmail = new Email({
        email: req.body.email
    });

    newEmail.save((err) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao salvar e-mail' });
        } else {
            res.status(200).json({ message: 'E-mail salvo com sucesso!' });
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
