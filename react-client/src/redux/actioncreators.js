import * as ActionTypes from './actionTypes';


export const signUp = (firstname, lastname, username,password) => (dispatch)=>{
   const newUser = {
      firstname: firstname,
      lastname:lastname,
      username:username,
      password: password
   };

  
   console.log(newUser);

   newUser.date = new Date().toISOString();
   return fetch('http://localhost:5000/users/signup',{
      method:'POST',
      body: JSON.stringify(newUser),
      headers:{
         'Content-Type': 'application/json'
      },


   })
   .then(response=>{
      if(response.ok){
         return response;
      }
      else{
         var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
      }
   },error => {
      throw error;
   })
   .then(response => response.json())
   .then(response => alert(response + ' you are successfully signed up!'))
   .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};





export const requestLogin = (creds) => {
   return {
      type: ActionTypes.LOGIN_REQUEST,
      creds
   }
}

export const receiveLogin = (response) =>{
   return {
      type: ActionTypes.LOGIN_SUCCESS,
      token:  response.token
   }
}

  
export const loginError = (message) => {
   return {
       type: ActionTypes.LOGIN_FAILURE,
       message
   }
}

export const loginUser = (creds) => (dispatch)=>{
   
   dispatch(requestLogin(creds));
   console.log("creds are ",creds);
   return fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers:{
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(creds)
   })
   .then(response=>{
      console.log("inside response");
      if(response.ok){
         return response;
      }
      else {
         var error = new Error('Error ' + response.status + ': ' + response.statusText);
         error.response = response;
         console.log("error is  ", error);
         alert(response.status+" because of "+response.err);
         throw error;
     }
   },
   error => {
      console.log(error);
       throw error;
   })
   .then(response => response.json())
   .then(response => {
      console.log("inside response");
      console.log(response.status);
      if(response.success){
         localStorage.setItem('token', response.token);
         localStorage.setItem('creds', JSON.stringify(creds));
         dispatch(receiveLogin(response));
      }
      else{
         var error = new Error('Error '+ response.status );
         error.response = response;
         throw error;
      }
   })
   .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
   return {
     type: ActionTypes.LOGOUT_REQUEST
   }
}
 
export const receiveLogout = () => {
   return {
     type: ActionTypes.LOGOUT_SUCCESS
   }
}


export const logoutUser = () => (dispatch) => {
   dispatch(requestLogout())
   localStorage.removeItem('token');
   localStorage.removeItem('creds');
   // dispatch(favoritesFailed("Error 401: Unauthorized"));
   dispatch(receiveLogout())
}

export const isLoadingTrending = ()=>{
   return {
      type: ActionTypes.ISLOADING_TRENDING
   }
}

export const trendingAnime = (trending)=>{
   // console.log("from trending func ", trending);
   return {
      type:ActionTypes.TRENDING_ANIME,
      trending
   }
  
}

export const fetchTrending = () => (dispatch)=>{
   dispatch(isLoadingTrending());
   return fetch('https://kitsu.io/api/edge/trending/anime')
         .then(trending=>trending.json())
         .then((trending)=> {
            // console.log("inside action ",trending.data);
            dispatch(trendingAnime(trending))
         })
         .catch(err=>alert("something is not right ",err));
}


export const isLoadingAnime = ()=>{
   return{
      type: ActionTypes.ISLOADING_ANIME
   }
}


export const loadAnime = (anime) =>{
   return{
      type: ActionTypes.LOAD_ANIME,
      anime
   }
}
export const fetchAnime = (anime) => (dispatch)=>{
   dispatch(isLoadingAnime());
   // console.log(anime.searchInput, " made request for this anime");
   const input = anime.searchInput;
   return fetch(`https://kitsu.io/api/edge/anime?filter[text]=${anime.searchInput}`)
   .then(anime => anime.json())
   .then(anime=> { 
       
      dispatch(loadAnime(anime))
   })
   .catch(err=> alert("Failed to fetch anime"));
}

export const loadExtraData = (reviews,episodes,streamingLinks) =>{
   return{
      type: ActionTypes.LOAD_EXTRA_DATA,
      reviews:reviews,
      episodes:episodes,
      streamingLinks: streamingLinks
   }
}

export const fetchExtraData = (input) => (dispatch) => {
   return fetch(`https://kitsu.io/api/edge/anime/${input}/reviews`)
     
    .then((reviews) => {
      dispatch(loadExtraData(reviews.json()));
    })
   
    .catch((err) => {
        console.log(err);
    });
}
