import { observer } from "mobx-react-lite";
import { Text } from 'react';

const creditView = observer(({store}) => {

    return(
        <div>
            {store.report}
            <Text>Hello</Text>
        </div>
    );
});

export { creditView };