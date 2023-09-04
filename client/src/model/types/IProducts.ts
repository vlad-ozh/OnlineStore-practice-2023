import { IUserCart } from './IUser';

interface IConnection {
  numOfSimCards?: string;
  simCardsFormat?: string[];
  communicationStandards?: string[];
};
interface IScreen {
  diagonal?: number;
  resolution?: string;
  refreshRate?: number;
  pixelDensity?: number;
  type?: string;
};
interface IProcessor {
  name?: string;
  coresNum?: number;
  gpu?: string;
  videoMemory?: number;
};
interface IMemory {
  internalMemory?: number;
  type?: string;
  ram?: number;
};
interface ICamera {
  camera?: string;
  videoRecording?: string;
  opticalStabilization?: string;
  frontCamera?: string;
};
interface IWirelessTechnologies {
  wifi?: string;
  gps?: string;
  bluetooth?: number;
  nfc?: string;
  wirelessCharging?: string;
  infraredPort?: string;
};
interface IFrame {
  protectionStandard?: string;
  color?: string;
};
interface IBattery {
  capacity?: number;
  fastCharging?: string;
};
interface IDimensions {
  dimensions?: string;
  weight?: number;
};
interface ICharacteristics {
  connection?: IConnection;
  screen?: IScreen;
  cpu?: IProcessor;
  memory?: IMemory;
  camera?: ICamera;
  os?: string;
  wirelessTechnologies?: IWirelessTechnologies;
  interfacesAndConnections?: string;
  frame?: IFrame;
  battery?: IBattery;
  dimensions?: IDimensions;
};
export interface IReview {
  id: string ,
  userId: string,
  userName: string,
  rating: number,
  text: string,
  date: string,
};

export interface IProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  image: string[];
  salesCount: number;
  reviews: IReview[];
  amount: number;
  characteristics: ICharacteristics;
}

export interface IProductsCategory {
  name: string;
  brands: string[];
};
export interface IProductsByBrandData {
  category: string;
  brand: string;
};
export interface IProductsCategories {
  smartphones: string;
  tablets: string;
  laptops: string;
  headphones: string;
  televisions: string;
};
export interface ICreateReview {
  userId: string;
  productId: string;
  rating: number;
  text: string;
};
export interface ISearch {
  search: string;
};
export interface ICommonProductsLogic {
  amountOfProduct: (amount: number) => boolean;
  onSelect: (userId: string, productId: string) => void;
  onRemoveSelected: (userId: string, productId: string) => void;
  isSelect: (productId: string, selectedProducts: string[]) => boolean;
  onCart: (userId: string, productId: string) => void;
  toCart: () => string;
  isCart: (productId: string, cart: IUserCart[]) => boolean;
  toProduct: (category: string, brand: string, productId: string) => string;
  toLogin: () => string;
  totalRating: (reviews: IReview[]) => number;
};
