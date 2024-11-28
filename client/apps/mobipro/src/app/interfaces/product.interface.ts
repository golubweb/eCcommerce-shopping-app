
export interface IProduct {
    name:            string;
    mainDescription: string;
    price:           number;
    category:        string[];
    brand:           string;
    imagesURL:       string[];
    isNew:           boolean;
    isNewProduct:    boolean;
    isPopular:       boolean;
    onDiscount:      boolean;
    reviews:         number;
    secoundDescription: string;
    stock:           number;
    thumbImageURL:   string;
    updatedAt:       Date;
    whoCreated:      string;
    _id:             string;
}

/*{
    "name":            "Iphone 4",
    "mainDescription": "Telefon sa veoma pouzdom batrerijom, velicene 4500mlAh, sa 4GB RAM-a, i 64GB memorije.",
    "price":           "100",
    "category":        "Mogile"
    "brand":           "Iphone",
    "imagesURL":       "C:\git\golubweb\eCcommerce-shopping-app\mockup\images\products\iphone4.png",
    "isNew":           "true",
    "isPopular":       "true",
    "onDiscount":      "false",
    "reviews":         0
    "secoundDescription": "Veoma pouzdan telefon, po veoma niskoj ceni",
    "stock":           "10",
    "thumbImageURL":   "C:\git\golubweb\eCcommerce-shopping-app\mockup\images\products\iphone4.png"
    "updatedAt":       "",
    "whoCreated":      string;
}*/