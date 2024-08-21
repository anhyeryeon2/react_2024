//먼저 새스토어를 만든다.


import {createStore} from 'redux';

const counterReducer = (state={counter :0},action) =>{
    if (action.type ==='increment'){
        return{
            counter:state.counter+1
        }
    }
    if (action.type ==='decrement'){
        return{
            counter:state.counter-1
        }
    }
    return state;
}
const store = createStore(counterReducer);

//createStore에는 포인터가 있어야함
//리듀서함수에서 매개변수로


//리액트 앱과 리덕스 스토어를 연결하고싶다
export default store;