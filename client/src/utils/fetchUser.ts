export const fetchUser = () => {
    let userInfo =  JSON.parse(localStorage.getItem('profile') || 'false')
    return userInfo
}