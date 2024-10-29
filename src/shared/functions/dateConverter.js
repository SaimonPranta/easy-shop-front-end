const dateToString = (dateString) => {
    const dateObj = new Date(dateString);

    const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()} || ${dateObj.getHours().toString().padStart(2, '0')}.${dateObj.getMinutes().toString().padStart(2, '0')} ${dateObj.getHours() >= 12 ? 'PM' : 'AM'}`;

    return formattedDate

}

const timeAgo = (inputDate = new Date()) => {
    const date = new Date(inputDate)
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return `${interval} years ago`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return `${interval} months ago`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return `${interval} days ago`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return `${interval} hours ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return `${interval} minutes ago`;
    }

    return `${Math.floor(seconds)} seconds ago`;
}

const dateToCalenderFormat = (isoString) => {
    // Parse the ISO date string
    const date = new Date(isoString);

    // Extract year, month, and day
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(date.getUTCDate()).padStart(2, "0");

    // Return the formatted date
    return `${year}-${month}-${day}`;
  }
 

export { dateToString, timeAgo, dateToCalenderFormat};