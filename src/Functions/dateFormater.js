const dateFormater = (dateString) => {
    let date = new Date(),
        day = date.getDay(),
        month = date.getMonth(),
        year = date.getFullYear(),
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${day} ${months[month]} ${year}`;
}

export default dateFormater;