
module.exports = async function (req, res, next) {
    let shifts = await global.Database.getQuestionOneShifts()
    res.json(shifts);
}
