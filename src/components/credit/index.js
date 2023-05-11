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
            <small style={{fontSize:10}}>{store.reportCredit}</small>
            <button onClick={ onClickIncrease } className="creditButton">Inc.</button>
            <button onClick={ onClickDecrease } className="creditButton">Dec.</button>
        </div>
    );
});

export { CreditView };