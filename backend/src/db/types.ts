interface GeoType {
  lat: string;
  lng: string;
}

interface AddressType {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoType;
}

interface CompanyType {
  name: string;
  catchPhrase: string;
  bs: string;
}

type RoleType = "Admin" | "User";

export interface UserType {
  _id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  role: RoleType;
  address?: AddressType;
  phone: string;
  website?: string;
  company?: CompanyType;
}

type ItemCategoryType = "men" | "women" | "kids";

export interface ItemType {
  _id: number;
  title: string;
  isNew: boolean;
  oldPrice: string;
  price: number;
  description: string;
  category: ItemCategoryType;
  image: string;
  rating: number;
}

export interface CartType {
  _id: number;
  ownerId: number;
  items: ItemType[];
}

export interface DiscountType {
  _id: number;
  discountCode: string;
  discountRate: number;
  expiresOn: Date;
}

export interface PurchaseType {
  _id: number;
  userId: number;
  amount: number;
  cart: CartType;
  discount?: DiscountType;
  createdOn: Date;
}
