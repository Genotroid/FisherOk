import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PostDelivery from './PostDelivery/PostDelivery';
import CourierDelivery from './CourierDelivery/CourierDelivery';
import availableDelivers from '../jsons/delivers.json';

const ModalDelivery = ({active, setActive, departureCity}) => {
    const [delivers, setDelivers] = useState([]);

    useEffect(() => {
        axios.get()
            .then(res => console.log('get available delivers for city'));

        setDelivers(availableDelivers);
    }, []);

    if (departureCity.selected_delivery) {
        return <PostDelivery active={active} setActive={setActive} departureCity={departureCity} deliveryList={delivers}
                             selectedDelivery={departureCity.selected_delivery}/>
    } else {
        return <CourierDelivery active={active} setActive={setActive} departureCity={departureCity}
                                deliveryList={delivers} selectedDelivery={departureCity.selected_delivery}/>
    }

}
export default ModalDelivery;