import { IApiRoutes } from '../interfaces/api.routes.interfaces';

export const originsUrls = [ 'http://localhost:4200', 'http://localhost:4400' ];

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
        all:     'all/:limit?/:skip?',
        findOne: ':id'
    },
    PAGES: {
        root:    'pages',
        create:  'create',
        findAll: 'all/:limit?/:skip?',
        findOne: ':id',
        delete:  'delete/:id',
        update:  'update/:id',
        remove:  'remove/:id'
    }
};