import axios, { AxiosInstance } from "axios";

/**
 * Axios instance for interacting with the Open Meteo API.
 * Provides methods to fetch weather data based on latitude and longitude.
 *
 * @class OpenMeteoApi
 * */
class OpenMeteoApi {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.OPEN_METEO_API,
    });
  }

  /**
   * Fetches weather data from the Open Meteo API for a given location.
   *
   * @async
   * @param {number} latitude - The latitude of the location for which to fetch weather data.
   * @param {number} longitude - The longitude of the location for which to fetch weather data.
   * @returns {Promise<any>} The weather data retrieved from the Open Meteo API.
   * @throws {Error} If there is an issue fetching the data from the API.
   */
  async fetchFromApi(latitude: number, longitude: number): Promise<any> {
    try {
      const ROUTE = `/forecast`;
      const res = await this.apiClient.get(ROUTE, {
        params: {
          latitude,
          longitude,
          current: [
            "precipitation_probability,wind_gusts_10m,temperature_2m,relative_humidity_2m,weather_code",
          ],
          daily:
            "temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset",
        },
      });
      return res.data;
    } catch (e) {
      throw new Error(`Error fetching from Open Meteo: ${e}`);
    }
  }
}

export default new OpenMeteoApi();
