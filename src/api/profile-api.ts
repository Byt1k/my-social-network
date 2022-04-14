import {ProfilePhotosType, ProfileType} from "../types/types";
import {instance, ServerResponseType} from "./api";

export const profileAPI = {
    getUserProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getUserStatus(userId: number | null) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data)
    },
    updateUserStatus(status: string) {
        return instance.put<ServerResponseType>('profile/status', {status: status}).then(res => res.data)
    },
    uploadMainPhoto(photos: File) {
        let formData = new FormData();
        formData.append('image', photos);
        return instance.put<ServerResponseType<ProfilePhotosType>>('profile/photo', formData).then(res => res.data);
    },
    updateProfileData(data: ProfileType) {
        return instance.put<ServerResponseType>('profile', data).then(res => res.data)
    }
}