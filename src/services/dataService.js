export const getCurrentTime = () => {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var curr_hour = d.getHours();
    var curr_min = d.getMinutes();
    var curr_second = d.getSeconds();
    var formattedDate = curr_date + "-" + curr_month + "-" + curr_year + " " + curr_hour + ":" + curr_min + ":" + curr_second;
    return formattedDate;
}

export const createId = () => {
    return (Math.random()*100000).toFixed(0);
}