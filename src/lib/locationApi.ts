import { Country as CountryData, City as CityData } from "country-state-city";
import { Country as CountryType, City as CityType } from "@/types";
import { LocationError } from "@/utils/errorHandler";

/**
 * An interface to handle interactions in a predictable way with country-state-city.
 * Primarily used for retrieving country and city coordinates.
 *
 * @class LocationApi
 * */
class LocationApi {
  constructor() {}

  /**
   * Retuns a list of all countries and coordinates.
   *
   * Fetches data from the `CountryData` source, parses the coordinates,
   * and formats the data into an array of country objects.
   * If no countries are found, it throws a `LocationError`.
   */
  public async getCountries(): Promise<CountryType[]> {
    try {
      const countries = CountryData.getAllCountries();
      const data = countries.map((country) => ({
        latitude: this.parseCoordinate(country.latitude),
        longitude: this.parseCoordinate(country.longitude),
        name: country.name,
        isoCode: country.isoCode,
        flag: country.flag,
      }));
      return data;
    } catch (e) {
      throw new LocationError(`Failed to fetch Countries: ${e}`);
    }
  }

  /**
   * Fetches a list of cities for a country's ISO code.
   *
   * This method fetches the cities from the `CityData` source using a country's ISO code.
   * If no cities are found, it throws a `LocationError`.
   */
  public async getCities(isoCode: string): Promise<CityType[]> {
    try {
      const cities = CityData.getCitiesOfCountry(isoCode);
      if (!cities || cities.length === 0) {
        throw new LocationError(
          `No cities found for country with ISO code: ${isoCode}`,
        );
      }
      const data = cities.map((city) => ({
        name: city.name,
        latitude: this.parseCoordinate(city.latitude),
        longitude: this.parseCoordinate(city.longitude),
      }));
      return data;
    } catch (e) {
      throw new LocationError(`Failed to fetch Cities: ${e}`);
    }
  }

  /**
   * Parses a coordinate from a string to a floating-point type.
   */
  private parseCoordinate(coordinate: string | null | undefined): number {
    const parsed = coordinate ? parseFloat(coordinate) : null;
    if (parsed === null) {
      throw new LocationError("Invalid coordinate: null or undefined");
    }
    return parsed;
  }
}

export default new LocationApi();
