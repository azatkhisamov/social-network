let initialState = {
  friends: [
    {
      id: 1,
      name: "Checo",
      avatarUrl:
        "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2022/5/10/hop9yksneuaqtv4coxri/sergio-perez-portrait-imola-gp-f1-2022",
    },
    {
      id: 2,
      name: "Charle",
      avatarUrl: "https://cdn.f1ne.ws/userfiles/leclerc/143896.jpg",
    },
    {
      id: 3,
      name: "Valtery",
      avatarUrl:
        "https://autosport.com.ru/files/styles/896x504/public/news/2021/09/06/113282-cb0a40b6-3019-4d75-8d26-7094f9275812.jpg?itok=096WUnPz",
    },
  ],
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default navbarReducer;
