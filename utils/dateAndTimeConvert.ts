const getDaySuffix = (day: number) => {
    if (day >= 11 && day <= 13) {
        return 'th';
    }

    const lastDigit = day % 10;

    switch (lastDigit) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        case 21:
            return 'st';
        case 22:
            return 'nd';
        case 23:
            return 'rd';
        case 31:
            return 'st';
        default:
            return 'th';
    }
};

// Function is used to convert the date to the Format of DD(st,nd,rd,th) MM YYYY
export const dateAndTimeConvert = (dateTimeString: string) => {

    const dateTime = new Date(dateTimeString);
    const monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', "July", 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    const day = dateTime.getDate();
    const month = dateTime.getMonth();
    const year = dateTime.getFullYear();
    const daySuffix = getDaySuffix(day);
    
    const formattedDate = `${day}${daySuffix} ${monthName[month]} ${year}`;
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const timeHours = hours < 10 ? `0${hours}` : `${hours}`;
    const timeMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return { date: formattedDate, time: `${timeHours}:${timeMinutes}` };
}
