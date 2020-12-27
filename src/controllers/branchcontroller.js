const branchservice = require('../services/branchservice');

const getbranch = async (req, res) => 
{

    const getbranches = await branchservice.getbranch(req, res);
    if (getbranches.status == 200) 
    {
        return res.status(200).json(getbranches.data);
    }
    else if (getbranches.status == 401) 
    {
        return res.status(404).json({ error: getbranches.message });
    }
}

module.exports = 
{
    getbranch
}