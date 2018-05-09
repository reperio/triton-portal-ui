import { axios } from "./axiosService";

class ImageService {
    async getImages() {
        return await axios.get(`/triton/images`);
    }

    async getImageByUuid(uuid: string) {
        return await axios.get(`/triton/images/${uuid}`);
    }
}

export const imageService = new ImageService();