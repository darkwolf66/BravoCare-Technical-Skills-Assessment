
module.exports = async function (req, res, next) {
    let querySix = await global.Database.querySix()
    res.json(querySix);
}


