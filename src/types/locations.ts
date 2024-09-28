interface Country {
  latitude: number;
  longitude: number;
  name: string;
  isoCode: string;
  flag: string;
}

interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export { Country, City };
