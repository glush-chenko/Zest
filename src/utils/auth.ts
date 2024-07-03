export const token = localStorage.getItem('todoist_access_token');
export const testToken = localStorage.getItem('todoist_access_test_token');

export function isUserLoggedIn(): boolean {
    const token = localStorage.getItem('todoist_access_token');
    const testToken = localStorage.getItem('todoist_access_test_token');

    return !!token || !!testToken;
}