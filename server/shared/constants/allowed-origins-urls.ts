import { IApiRoutes } from '../interfaces/api.routes.interfaces';

export const originsUrls = [ 'http://localhost:4200' ];

export const apiRoutes: IApiRoutes = {
    AUTH: {
        root:         'auth',
        login:        'login',
        signup:       'signup',
        logout:       'logout',
        refreshToken: 'refresh-token'
    },
    USERS: {
        root:           'users',
        findAll:        'findAll',
        findOne:        'findUser',
        changePassword: 'change-password',
        forgotPassword: 'forgot-password',
        resetPassword:  'reset-password',
        updateUser:     'update',
        removeUser:     'remove/:id'
    },
    PRODUCTS: {
        root:    'products',
        create:  'create',
        all:     'all',
        findOne: ':id'
    }
};