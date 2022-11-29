
module.exports = async function (req, res, next) {
    let queryFive = await global.Database.queryFive()
    res.json(queryFive);
}


