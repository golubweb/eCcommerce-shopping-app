export interface IApiRoutes {
    AUTH: {
        root:         string;
        login:        string;
        signup:       string;
        logout:       string;
        refreshToken: string;
    },
    USERS: {
        root:           string;
        findAll:        string;
        findOne:        string;
        changePassword: string;
        forgotPassword: string;
        resetPassword:  string;
        updateUser:     string;
        removeUser:     string;
    },
    PRODUCTS: {
        root:    string;
        create:  string;
        all:     string;
        findOne: string;
    }
};