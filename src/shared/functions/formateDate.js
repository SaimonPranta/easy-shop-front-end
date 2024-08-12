const dateToDateString = (dateString = new Date()) => {
    const date = new Date(dateString)
    
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
 
    return `${day}-${month}-${year}`;
}


export  {dateToDateString}