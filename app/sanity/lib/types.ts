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

export interface ImageSliderData {
  sectionTitle: string;
  slides: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
  }>;
  cheersIcon: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface TeamData {
  sectionTitle: string;
  description: string;
}

export interface AboutBeliefData {
  heroBackgroundImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  heroBackgroundImageMobile: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  logo: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  aboutUsLabel: string;
  philosophyLabel: string;
  philosophyText: string;
  dividerLine: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  chefLabel: string;
  chefDescription: string;
  stats: Array<{
    icon: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
    label: string;
  }>;
  bottomImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

export interface MenuGalleryData {
  mainMenuImages: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
  }>;
  innerMenuImages: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
  }>;
}

export interface GalleryData {
  images: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
  }>;
}

export interface OurStoryData {
  subtitle: string;
  title: string;
  description: string;
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  buttonImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  buttonText: string;
  buttonLink: string;
}

export interface OurExperienceData {
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  mobileImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  mainTitle: string;
  locationTitle: string;
  locationCountry: string;
  addressLine1: string;
  addressLine2: string;
  hoursLabel: string;
  operatingHours: string;
  openDaysLabel: string;
  openDays: string;
  leftImages: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
  }>;
  rightImages: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
  }>;
}

export interface HomeRecipesData {
  mainTitle: string;
  buttonText: string;
  buttonLink: string;
  recipeImages: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
  }>;
}

export interface HomeMenuData {
  mainTitle: string;
  centerImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  description: string;
  buttonText: string;
  buttonLink: string;
  leftSideItems: Array<{
    image: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
    name: string;
  }>;
  rightSideItems: Array<{
    image: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
    name: string;
  }>;
}

export interface HomeHeaderData {
  mainTitle: string;
  heroImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  ctaTitle: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  leftGridImages: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
  }>;
  rightGridImages: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
  }>;
  bottomSectionTitle: string;
  bottomSectionDescription: string;
  reservationButtonText: string;
  reservationButtonLink: string;
}
