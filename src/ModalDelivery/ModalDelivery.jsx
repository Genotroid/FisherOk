import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PostDelivery from './PostDelivery/PostDelivery';
import CourierDelivery from './CourierDelivery/CourierDelivery';
import availableDelivers from '../jsons/deliveries_available.json';

const ModalDelivery = ({departureCity}) => {
    const [delivers, setDelivers] = useState([]);

    useEffect(() => {
        axios.get()
            .then(res => console.log('get available delivers for city'));

        setDelivers(availableDelivers);
    }, []);

    if (departureCity.selected_delivery) {
        return <PostDelivery departureCity={departureCity} deliveryList={delivers}
                             selectedDelivery={departureCity.selected_delivery}/>
    } else {
        return <CourierDelivery departureCity={departureCity} deliveryList={delivers}
                                selectedDelivery={departureCity.selected_delivery}/>
    }

}
export default ModalDelivery;