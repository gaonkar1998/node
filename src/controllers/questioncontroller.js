const questionservice = require('../services/questionservice');

const { validationResult } = require('express-validator');

const addquestions = async (req, res) =>
{
    // validate the sent request 
    const error = validationResult(req);
    //if their are errors in the request print the errors
    if (!error.isEmpty()) 
    {
        return res.status(401).json({ "error": error });
    }
    // execute service file
    const addquestion = await questionservice.addquestion(req, res);

    if (addquestion.status == "error") 
    {
        return res.status(401).json(addquestion.message);
    }
    else if (addquestion.status == "success") 
    {
        return res.status(200).json(addquestion.data);
    }
}
const fetchquestions = async (req, res) => 
{
    const fetchquestion = await questionservice.viewquestion(req, res);
    if (fetchquestion.status == 200) 
    {
        return res.status(200).json(fetchquestion.data);
    }
    else if (fetchquestion.status == 401) 
    {
        return res.status(404).json({ error: fetchquestion.message });
    }
}
module.exports =
{
    addquestions,
    fetchquestions
}