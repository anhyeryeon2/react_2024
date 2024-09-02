import {redirect} from 'react-router-dom';
export function getTokenDuration() {
    const expirationDateFromStorage = localStorage.getItem("expiration");
    const expirationDate = new Date(expirationDateFromStorage); // Date객체로 변환해주어야함
    const now = new Date(); // 현재시간
  
    // 토큰 잔여 기간(밀리초)
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
  }

export function getAuthToken(){
    const token =localStorage.getItem('token');

    const tokenDuration = getTokenDuration();
    if(tokenDuration <0){
        return 'EXPRIED';
    }
    return token;
}

export function tokenLoader(){
    return getAuthToken();
}

export function checkAuthLoader(){
    const token = getAuthToken();

    if(!token){
        return redirect('/auth');
    }
}