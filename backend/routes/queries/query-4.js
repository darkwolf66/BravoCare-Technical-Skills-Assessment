
module.exports = async function (req, res, next) {
    let queryFour = await global.Database.queryFour()
    res.json(queryFour);
}


