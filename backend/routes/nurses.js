
module.exports = async function (req, res, next) {
    let nurses = await global.Database.getNurses()
    res.json(nurses);
}
