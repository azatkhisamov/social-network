import { ResponseType, usersAPI } from "../api/api";
import { follow } from "./usersReducer"

jest.mock("../api/api");
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: ResponseType = {
    resultCode: 0,
    messages: [],
    data: {}
}


test('', async () => {
    userAPIMock.followUser.mockReturnValue(Promise.resolve(result));

    const thunk = follow(2);
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    await thunk(dispatchMock, getStateMock, {});
 
    expect(dispatchMock).toBeCalledTimes(3)
})