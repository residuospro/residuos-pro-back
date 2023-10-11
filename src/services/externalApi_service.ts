import { Routes } from "../utils/enum";
import { setBearerAuthorization, useClient } from "../clients/AxiosClient";
import { AxiosResponse } from "axios";
import { ICreateUsers } from "../utils/interfaces";

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

  static async createUserAfterDepartment(user: ICreateUsers) {
    try {
      const data = {
        name: user.responsible,
        email: user.email,
        department: user.department,
        idDepartment: user.idDepartment,
        ramal: user.ramal,
        idCompany: user.idCompany,
        service: "Residuos-Pro",
      };

      const res = await useClient().post(Routes.SAVE_USER, data);

      return res;
    } catch (error) {
      throw error;
    }
  }
}

export default ExternalApiService;
