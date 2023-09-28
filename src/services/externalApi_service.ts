import { Routes } from "../utils/enum";
import { setBearerAuthorization, useClient } from "../clients/AxiosClient";
import { AxiosResponse } from "axios";

class ExternalApiService {
  static async validateToken(token: string): Promise<AxiosResponse<any, any>> {
    try {
      setBearerAuthorization(useClient(), token);
      
      const response = await useClient().post(Routes.VERIFYTOKEN);

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ExternalApiService;
