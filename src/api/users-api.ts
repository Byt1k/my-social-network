import {UserType} from "../types/types";
import {GetItemsResponse, instance, ServerResponseType} from "./api";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, isFriend: boolean | undefined = undefined) {
        return instance.get<GetItemsResponse<UserType>>(`users?page=${currentPage}&count=${pageSize}&friend=${isFriend}`)
            .then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<ServerResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<ServerResponseType>(`follow/${userId}`).then(res => res.data)
    }
}