
module.exports = async function (req, res, next) {
    let facilities = await global.Database.getFacilities()
    res.json(facilities);
}
