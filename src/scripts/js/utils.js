export const checkToken = () => {
    const refresh_token = localStorage.getItem('refresh_token');
    return Boolean(refresh_token);
}

export const redirect = (path) => {
    window.location.href = path;
}

export const logout = () => {
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');

    redirect('/login.html');
}