const getImageUrl = (img) => {
    return `${process.env.REACT_APP_SERVER_HOST_URL}/${img}`
}


export default getImageUrl