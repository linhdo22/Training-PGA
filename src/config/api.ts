import { SERVER_URL } from '../utils/constant'


enum APIService {
    auth, protected, public
}

function getBaseUrl(service: APIService) {
    switch (service) {
        case APIService.auth:
            return SERVER_URL + "/auth"
        case APIService.protected:
            return SERVER_URL + "/protected"
        default:
            return SERVER_URL

    }
}

export const API_PATH = {
    signIn: getBaseUrl(APIService.auth) + "/login",
    register: getBaseUrl(APIService.auth) + "/register",
    getProfile: getBaseUrl(APIService.public) + "/user",
    uploadAvatar: getBaseUrl(APIService.public) + "/user",
    getLocation: getBaseUrl(APIService.public) + "/location",
    getPhotos: 'https://jsonplaceholder.typicode.com/photos'
}