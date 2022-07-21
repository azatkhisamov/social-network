const FOLLOW_UNFOLLOW = "FOLLOW-UNFOLLOW";
const SET_USERS = 'SET-USERS';

let initialState = {
  users: [
    // {
    //   id: 1,
    //   fullName: "Checo Perez",
    //   status: "I am mexican driver",
    //   location: { city: "Mexico", country: "Mexico" },
    //   isFollowed: true,
    //   avatarUrl:
    //     "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2022/5/10/hop9yksneuaqtv4coxri/sergio-perez-portrait-imola-gp-f1-2022",
    // },
    // {
    //   id: 2,
    //   fullName: "Charle Leclerc",
    //   status: "I am momaco driver",
    //   location: { city: "Monaco", country: "Monaco" },
    //   isFollowed: false,
    //   avatarUrl: "https://cdn.f1ne.ws/userfiles/leclerc/143896.jpg",
    // },
    // {
    //   id: 3,
    //   fullName: "Valtery Bottas",
    //   status: "I am finland driver",
    //   location: { city: "Helsinki", country: "Finland" },
    //   isFollowed: true,
    //   avatarUrl:
    //     "https://autosport.com.ru/files/styles/896x504/public/news/2021/09/06/113282-cb0a40b6-3019-4d75-8d26-7094f9275812.jpg?itok=096WUnPz",
    // },
  ],
};

let usersReducer = (state = initialState, action) => {
  //   debugger;
  switch (action.type) {
    case FOLLOW_UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return { ...user, followed: !user.followed };
          }
          return user;
        }),
      };
      case SET_USERS:
        return {
          ...state, 
          users: [...state.users, ...action.users],
        }
    default:
      return state;
  }
};

export const followUnfollowAC = (userID) => ({
  type: FOLLOW_UNFOLLOW,
  userID: userID,
});

export const setUsersAC = (users) => ({
  type: SET_USERS, 
  users: users,
})

export default usersReducer;
