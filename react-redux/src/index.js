function createStore(reducer){
    const handle = [];
    let state = null;

    const subscribe = (callback) => {
        handle.push(callback);
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        handle.forEach(
            (callback) => callback()
        )
    };

    const getState = () => state;

    dispatch();

    return {getState, subscribe, dispatch}
}

function reducer(state, action){
    if(!state){
        return  {
            title:{
                text:'React',
                color:'red',
            },
            content:{
                text:'React-content',
                color:'blue',
            }
        }
    }

    switch(action.type){
        case 'UPDATE_TITLE_TEXT':
            // appState.title.text = action.text;
            return {
                ...state,
                title:{
                    ...state.title,
                    text : action.text
                }
            };
        case 'UPDATE_TITLE_COLOR':
            // appState.title.color = action.color;
            return {
                ...state,
                title:{
                    ...state.title,
                    color : action.color
                }
            };
        default:
            return state;
    }
}

function renderApp (appState,oldAppState = {}) {
    if(appState === oldAppState)
        return;
    console.log('App')
    renderTitle(appState.title, oldAppState.title);
    renderContent(appState.content, oldAppState.content);
}

function renderTitle (title, oldTitle = {}) {
    if(title === oldTitle)
        return;
    console.log('title')
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}

function renderContent (content, oldContent = {}) {
    if(content === oldContent)
        return;
    console.log('content')
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}

const App = createStore(reducer);
let oldApp = App.getState();
App.subscribe(()=>{
    let newApp = App.getState();
    renderApp(newApp,oldApp);
    oldApp = newApp;
});

renderApp(App.getState());
App.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React》' }); // 修改标题文本
App.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }); // 修改标题颜色
// appState.content = {};
// appState.title.text = '';    //浅复制，指向同一内存的指针都改变
// appState.content = ''; //深复制
// console.log(JSON.stringify(appState))
// console.log(JSON.stringify(App.getState()))
