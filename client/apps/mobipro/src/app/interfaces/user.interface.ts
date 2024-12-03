export interface IUser {
    email: string;
    password: string;
}

export interface IUserData {
    _id: string;
    name: string;
    lastname: string;
    displayName: string;
    email: string;
    avatarUrl: string;
    role: string[];
    contact: {
        primary_address: string;
        secondary_address: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        phone: string;
        mobile: string;
        fax: string;
    };
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IUserToken { token: string; refreshToken: string; };