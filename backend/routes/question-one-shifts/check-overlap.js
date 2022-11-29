const DC = require("../../DateCalculate");
module.exports = async function (req, res, next) {
    let shiftOne = (await global.Database.getQuestionOneShiftId(req.params.shiftIdOne))[0]
    let shiftTwo = (await global.Database.getQuestionOneShiftId(req.params.shiftIdTwo))[0]

    shiftOne.startTimeInMinutes = DC.convertShiftTimeToMinutes(shiftOne.start_time);
    if(DC.convertShiftTimeToMinutes(shiftOne.start_time) <= DC.convertShiftTimeToMinutes(shiftOne.end_time)){
        shiftOne.endTimeInMinutes = DC.convertShiftTimeToMinutes(shiftOne.end_time);
    }else{
        shiftOne.endTimeInMinutes = DC.convertShiftTimeToMinutes(shiftOne.end_time)+(24*60);
    }

    shiftTwo.startTimeInMinutes = DC.convertShiftTimeToMinutes(shiftTwo.start_time);
    if(DC.convertShiftTimeToMinutes(shiftTwo.start_time) <= DC.convertShiftTimeToMinutes(shiftTwo.end_time)){
        shiftTwo.endTimeInMinutes = DC.convertShiftTimeToMinutes(shiftTwo.end_time);
    }else{
        shiftTwo.endTimeInMinutes = DC.convertShiftTimeToMinutes(shiftTwo.end_time)+(24*60);
    }

    let overlapInMinutes = DC.calculateRangeTimesMinutesOverlap([
        shiftOne.startTimeInMinutes, shiftOne.endTimeInMinutes
    ], [
        shiftTwo.startTimeInMinutes, shiftTwo.endTimeInMinutes
    ])
    let maximumOverlapThreshold = shiftOne.facility_id === shiftTwo.facility_id ? 30 : 0;

    res.json({
        overlapInMinutes: overlapInMinutes,
        maximumOverlapThreshold: maximumOverlapThreshold,
        exceedsOverlapThreshold: overlapInMinutes > maximumOverlapThreshold
    });
}


