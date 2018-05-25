import { axios } from "./axiosService";

class ServerService {
    async getServerByUuid(server_uuid: string) {
        return await axios.get(`/triton/servers/${server_uuid}`);
    }
}

export const serverService = new ServerService();