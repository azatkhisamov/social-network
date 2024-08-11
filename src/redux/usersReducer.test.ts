import usersReducer, { actions, InitialStateType } from "./usersReducer"

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 1, name: 'Den', followed: false, photos: {
                    small: null, large: null
                }, status: 'status1'
            }, 
            {
                id: 2, name: 'Ben', followed: false, photos: {
                    small: null, large: null
                }, status: 'status2'
            },
            {
                id: 3, name: 'Bob', followed: true, photos: {
                    small: null, large: null
                }, status: 'status3'
            },
            {
                id: 4, name: 'Willy', followed: true, photos: {
                    small: null, large: null
                }, status: 'status4'
            }
        ],
        countUsers: 10,
        totalCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filterUsers: {term: '', friend: null},
        changingFriends: false,
    }
})

test('follow success', () => {
    

    const newState = usersReducer(state, actions.followUnfollow(2));

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();

})

test('unfollow success', () => {
    

    const newState = usersReducer(state, actions.followUnfollow(3));

    expect(newState.users[2].followed).toBeFalsy();
    expect(newState.users[3].followed).toBeTruthy();

})