
module.exports = async function (req, res, next) {
    let nursesJobs = await global.Database.getNursesJobs()
    res.json(nursesJobs);
}
