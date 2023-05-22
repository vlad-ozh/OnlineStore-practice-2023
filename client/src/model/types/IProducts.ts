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

export interface IProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  image: string[];
  salesCount: number;
  // comments: string[];
  // amount: number;
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
