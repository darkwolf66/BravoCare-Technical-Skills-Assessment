
module.exports = async function (req, res, next) {
    let jobs = await global.Database.getJobs()
    res.json(jobs);
}
