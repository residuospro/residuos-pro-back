import { Routes } from "../utils/enum";
import { setBearerAuthorization, useClient } from "../clients/AxiosClient";
import { AxiosResponse } from "axios";

class ExternalApiService {
  static async validateToken(token: string): Promise<AxiosResponse<any, any>> {
    try {
      setBearerAuthorization(useClient(), token);

      const response = await useClient().get(Routes.VERIFYTOKEN);

      return response;
    } catch (error) {
      throw error;
    }
  }

  static async updateUserAfterDepartment(
    name: string,
    ramal: number,
    idDepartment: string
  ) {
    try {
      const data = {
        name,
        ramal,
        idDepartment,
      };

      const response = await useClient().post(
        Routes.UPDATE_USER_AFTER_DEPARTMENT,
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserAfterDepartment(id: string) {
    try {
      const response = await useClient().delete(
        `${Routes.DELETE_USER_AFTER_DEPARTMENT}${id}`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ExternalApiService;
