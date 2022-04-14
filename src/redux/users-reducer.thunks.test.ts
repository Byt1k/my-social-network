import {follow, getUsers, unfollow} from "./users-reducer";
import {GetItemsResponse, ResultCodesEnum, ServerResponseType} from "../api/api";
import {usersAPI} from "../api/users-api";
import {UserType} from "../types/types";

jest.mock('../api/users-api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

const followResult: ServerResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

beforeEach(() => {
    getStateMock.mockClear()
    dispatchMock.mockClear()
})

test('', async () => {

    const getUsersResult: GetItemsResponse<UserType> = {
        items: [],
        error: '',
        totalCount: 0
    }

    userAPIMock.getUsers.mockReturnValue(Promise.resolve(getUsersResult))
    const thunk = getUsers(1, 10)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(4);
})

test('success follow thunk', async () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(followResult))
    const thunk = follow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3);
})

test('success unfollow thunk', async () => {
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(followResult))
    const thunk = unfollow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3);
})