import { observer } from "mobx-react-lite";
import './index.css';

const CreditView = observer(({store}) => {

    const onClickIncrease = () => {
        store.increaseCredit();
    }

    const onClickDecrease = () => {
        store.decreaseCredit();
    }

    return(
        <div>
            <div><small style={{fontSize:10}}>{store.reportCredit}</small></div>
            <div><button onClick={ onClickIncrease } className="creditButton">Inc.</button></div>
            <div><button onClick={ onClickDecrease } className="creditButton">Dec.</button></div>
        </div>
    );
});

export { CreditView };