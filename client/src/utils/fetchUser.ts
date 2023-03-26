export const fetchUser = () => {
    let userInfo = JSON.parse(localStorage.getItem('profile') || 'false')
    if (userInfo?.result)
        userInfo = userInfo.result
    return userInfo
}