const examservice = require('../services/examservice')

const getexam = async (req, res) => {
    
    const exams = await examservice.getexams(req, res);
    if (exams.status==200) {
        return res.status(200).json(exams.data);
    }
    else if(exams.status==401){
        return res.status(404).json({error:exams.message});
    }
}
module.exports = {
    getexam
}