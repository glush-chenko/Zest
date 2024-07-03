export function isUserLoggedIn(): boolean {
    const token = localStorage.getItem('todoist_access_token');
    const testToken = localStorage.getItem('todoist_access_test_token');

    return !!token || !!testToken;
}