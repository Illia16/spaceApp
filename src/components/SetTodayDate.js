const SetTodayDate = () => {
        const today = new Date();
        const dateArr = [today.getFullYear(), String(today.getMonth()+1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')];
        const todayRes = dateArr.join('-');
        return todayRes;
};

export default SetTodayDate;
