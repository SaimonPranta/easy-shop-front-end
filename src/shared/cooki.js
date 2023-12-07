import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });

export const getCooki = () => {
    const cooki = cookies.get('token');
 
    return cooki ? cooki : ""
}