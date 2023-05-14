interface IConnection {
  numOfSimCards: string;
  simCardsFormat: string[];
  communicationStandards: string[];
};
interface IScreen {
  diagonal: number;
  resolution: string;
  refreshRate: number;
  pixelDensity: number;
  type: string;
};
interface IProcessor {
  name: string;
  coresNum: number;
  gpu?: string;
};
interface IMemory {
  internalMemory: number;
  ram: number;
};
interface ICamera {
  camera: string;
  videoRecording: string;
  opticalStabilization: string;
  frontCamera: string;
};
interface IWirelessTechnologies {
  wifi: string;
  gps: string;
  bluetooth: number;
  nfc: string;
  wirelessCharging: string;
  infraredPort: string;
};
interface IFrame {
  protectionStandard: string;
  color: string;
};
interface IBattery {
  capacity: number;
  fastCharging: string;
};
interface IDimensions {
  dimensions: string;
  weight: number;
};

interface ISmartphone {
  connection: IConnection;
  screen: IScreen;
  cpu: IProcessor;
  memory: IMemory;
  camera: ICamera;
  os: string;
  wirelessTechnologies: IWirelessTechnologies;
  interfacesAndConnections: string;
  frame: IFrame;
  battery: IBattery;
  dimensions: IDimensions;
};
interface ITablet {
};
interface ILaptop {
};
interface IProduct {
  id: string;
  name: string;
  price: number;
  brand: string;
  category: string;
  description: string;
  image: string[];
  salesCount: number;
  characteristics: ISmartphone | ITablet | ILaptop;
};
export interface IProducts {
  products: IProduct[];
};

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
