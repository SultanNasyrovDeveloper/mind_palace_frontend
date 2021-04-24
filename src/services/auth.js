

class AuthService {
    getAuthHeaders() {
        if (localStorage.getItem('apiKey')) {
            return {'Authorization': 'Bearer ' + localStorage.getItem('apiKey')}
        }
        return {}
    }
}

export default new AuthService();