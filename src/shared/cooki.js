import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });

export const getCooki = () => {
    const cooki = cookies.get('token');

    return cooki ? cooki : ""
}
export const getCookies = () => {
    const cookiesValue = cookies.get('token');

    return cookiesValue || ""
}
export const userHeader = () => {
    const cookiesValue = cookies.get('token') || ""

    return { authorization: `Bearer ${cookiesValue}` }
}