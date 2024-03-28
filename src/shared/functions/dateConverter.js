const dateToString = (dateString) => {
    const dateObj = new Date(dateString);

    const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()} || ${dateObj.getHours().toString().padStart(2, '0')}.${dateObj.getMinutes().toString().padStart(2, '0')} ${dateObj.getHours() >= 12 ? 'PM' : 'AM'}`;

    return formattedDate

}

export { dateToString };