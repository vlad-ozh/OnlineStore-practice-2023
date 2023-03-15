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
  diaphragm: string;
  videoRecording: string;
  opticalStabilization: boolean;
  frontCamera: string;
};
interface IWirelessTechnologies {
  wifi: string;
  gps: string;
  bluetooth: number;
  nfc: boolean;
  wirelessCharging: boolean;
  infraredPort: boolean;
};
interface IFrame {
  protectionStandard: string;
  gps: string;
  color: string;
};
interface IBattery {
  capacity?: number;
  fastCharging: boolean;
  color: string;
};
interface IDimensions {
  dimensions: string;
  weight: number;
};




interface ISmartphone {
  id: string;
  name: string;
  series: number;
  modification: string;
  images: string[];
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
  name: string;
};
interface ILaptop {
  name: string;
};

export interface IProducts {
  smartphones: ISmartphone[];
  tablets: ITablet[];
  laptops: ILaptop[];
};
