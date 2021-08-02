import BasketWrapper from './BasketWrapper/BasketWrapper';
import { StoreProvider } from "./store/useStore";

const App = () => {

    return <StoreProvider>
        <BasketWrapper/>
    </StoreProvider>

}

export default App;
