import { observer } from "mobx-react-lite";

const ScreenManager = observer(({store}) => {
    const curScreen = store.GetNewScreen();
    
    return (<div>{curScreen}</div>)
})

export { ScreenManager };