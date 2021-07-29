import React, {useEffect} from 'react';
import PostDelivery from './PostDelivery/PostDelivery';
import CourierDelivery from './CourierDelivery/CourierDelivery';

const ModalDelivery = ({active, setActive, modalType}) => {

    if (modalType === 1) {
        return <PostDelivery active={active} setActive={setActive}/>
    }

    if (modalType > 1) {
        return <CourierDelivery active={active} setActive={setActive}/>
    }

}
export default ModalDelivery;