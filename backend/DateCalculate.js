
class DateCalculate {
    /**
     * Converts QuestionOneShift Times to minutes
     * @param shiftTime
     * @returns {Number}
     */
    static convertShiftTimeToMinutes(shiftTime){
        shiftTime = shiftTime.split(':')
        let hours = parseInt(shiftTime[0])
        let minutes = parseInt(shiftTime[1])
        let seconds = parseInt(shiftTime[2])
        return (hours*60)+minutes+(seconds/60)
    }
    static calculateRangeTimesMinutesOverlap(rangeOne, rangeTwo){
        const [rangeOneValOne, rangeOneValTwo] = rangeOne;
        const [rangeTwoValOne, rangeTwoValTwo] = rangeTwo;
        let oneLimit = Math.max(rangeOneValOne, rangeTwoValOne)
        let twoLimit = Math.min(rangeOneValTwo, rangeTwoValTwo)

        return oneLimit-twoLimit >= 0 ? oneLimit-twoLimit : twoLimit-oneLimit;
    }
}

module.exports = DateCalculate