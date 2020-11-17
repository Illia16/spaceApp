const setTodayDate = require('./setTodayDate');

const todayDateTest = () => {
    const today = new Date();
    return [today.getFullYear(), String(today.getMonth()+1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
};

test('today\'s date is', () => {
    expect(setTodayDate()).toBe(todayDateTest());
});