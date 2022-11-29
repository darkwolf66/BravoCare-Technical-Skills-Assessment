const DateCalculate = require('../DateCalculate')

test('calculateRangeTimesMinutesOverlap for equal numbers ', ()=>{
    expect(
        DateCalculate.calculateRangeTimesMinutesOverlap([400, 900], [400,900])
    ).toBe(500)
})



test('calculateRangeTimesMinutesOverlap for the first range first number in between second range', ()=>{
    expect(
        DateCalculate.calculateRangeTimesMinutesOverlap([300, 600], [250, 600])
    ).toBe(300)
})
test('calculateRangeTimesMinutesOverlap for the first range second number in between second range', ()=>{
    expect(
        DateCalculate.calculateRangeTimesMinutesOverlap([300, 600], [300, 700])
    ).toBe(300)
})
test('calculateRangeTimesMinutesOverlap for the second range first number in between first range', ()=>{
    expect(
        DateCalculate.calculateRangeTimesMinutesOverlap([300, 500], [400, 500])
    ).toBe(100)
})
test('calculateRangeTimesMinutesOverlap for the second range second number in between first range', ()=>{
    expect(
        DateCalculate.calculateRangeTimesMinutesOverlap([300, 500], [300, 400])
    ).toBe(100)
})
test('calculateRangeTimesMinutesOverlap for the second range inside first range', ()=>{
    expect(
        DateCalculate.calculateRangeTimesMinutesOverlap([330, 460], [300, 500])
    ).toBe(130)
})
test('calculateRangeTimesMinutesOverlap for the second range inside first range', ()=>{
    expect(
        DateCalculate.calculateRangeTimesMinutesOverlap([300, 500], [350, 450])
    ).toBe(100)
})
test('calculateRangeTimesMinutesOverlap not overlapping', ()=>{
    expect(
        DateCalculate.calculateRangeTimesMinutesOverlap([300, 500], [500, 600])
    ).toBe(0)
})