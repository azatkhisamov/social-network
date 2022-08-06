import { createSelector } from 'reselect'
import { AppStateType } from './redux-store';

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
})

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getCountUsers = (state: AppStateType) => {
    return state.usersPage.countUsers;
}

export const getTotalCount = (state: AppStateType) => {
    return state.usersPage.totalCount;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getFilterUsers = (state: AppStateType) => {
    return state.usersPage.filterUsers;
}