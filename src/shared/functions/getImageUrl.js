const getImageUrl = (img) => {
    if (Array.isArray(img)) {
        return `${process.env.REACT_APP_SERVER_HOST_URL}/${img[0]}`

    }
    return `${process.env.REACT_APP_SERVER_HOST_URL}/${img}`
}


export default getImageUrl