import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PostDelivery from './PostDelivery/PostDelivery';
import CourierDelivery from './CourierDelivery/CourierDelivery';
import availableDelivers from '../jsons/delivers.json';

const ModalDelivery = ({active, setActive, departureCityId, selectedDelivery}) => {
    const [delivers, setDelivers] = useState([]);

    useEffect(() => {
        axios.get()
            .then(res => console.log('get available delivers for city'));

        setDelivers(availableDelivers);
    }, []);

    return <PostDelivery active={active} setActive={setActive} delivers={delivers} selectedDelivery={selectedDelivery}/>

    // if (modalType === 1) {
    //     return <PostDelivery active={active} setActive={setActive}/>
    // }
    //
    // if (modalType > 1) {
    //     return <CourierDelivery active={active} setActive={setActive}/>
    // }

}
export default ModalDelivery;