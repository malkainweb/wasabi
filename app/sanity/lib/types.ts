export interface FooterData {
  locationTitle: string;
  addressLine1: string;
  addressLine2: string;
  hoursLabel: string;
  operatingHours: string;
  openDaysLabel: string;
  openDays: string;
  phoneNumber: string;
  email: string;
  copyrightText: string;
}

export interface TheSpaceData {
  mainTitle: string;
  subtitle: string;
  backgroundImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  featuresTitle: string;
  features: string[];
}
