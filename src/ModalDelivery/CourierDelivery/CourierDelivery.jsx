import React, {useRef, useCallback} from 'react';
import axios from 'axios';
import s from './CourierDelivery.module.css';
import SearchIcon from '../../Icons/SearchIcon';
import CustomSelect from '../../BasketWrapper/CustomSelect/CustomSelect';
import {useStore} from '../../store/useStore';

const CourierDelivery = () => {
    const modalRef = useRef();
    const {state, dispatch} = useStore();
    const changeModalStatus = useCallback((data) => dispatch({type: "setCourierModalActive", data: data}), [dispatch]);

    const deliveryChangeHandler = (newDelivery) => {

        console.log('selectedDelivery', state.selectedDelivery);
        console.log('deliveryList', state.deliveryList);
        console.log('newDelivery', newDelivery);

        if (!state.selectedDelivery || newDelivery.module_id !== state.selectedDelivery.module_id) {
            dispatch({type: 'setSelectedDelivery', data: newDelivery});

            if (newDelivery.delivery_info_type === 'points') {
                axios.post(
                    ' https://devnew.lovisnami.ru:39878/api/v2/basket/delivery?dev_test_key=c048db8a21f93d3dc4e6',
                    {
                        "operation": "get_points",
                        "data": {
                            "module": newDelivery.module_id
                        }
                    })
                    .then(result => dispatch({type: "setGeoData", data: result.data.data}))
                    .catch(error => console.log('GetPoints error', error));
                dispatch({type: 'setPostModalActive', data: true});
            } else {
                dispatch({type: 'setAddressModalActive', data: true});
            }

            changeModalStatus(false);
        }

    }

    if (!state.departureCity) {
        return <></>
    }

    return (
        <div className={(state.courierModalActive ? s.ModalActive : s.Modal) + ' modal-active'} ref={modalRef}
             onClick={() => changeModalStatus(false)}>
            <div className={state.courierModalActive ? s.ModalContentActive : s.ModalContent}
                 onClick={e => e.stopPropagation()}>
                <div className={s.ModalOff}>
                    <a className={s.ModalOffLink} onClick={() => changeModalStatus(false)}></a>
                </div>
                <div className={s.ModalDeliveryName}>
                    {`Выбор транспортной компании из ${state.departureCity.departure_city_name}`}
                </div>
                <div className={s.ModalDeliveryData}>
                    {state.deliveryList && state.deliveryList.map((delivery, key) =>
                        <div className={s.ModalDeliveryItem}>
                            <div className={s.ModalDeliveryOne}>
                                <div className={s.OneInput}>
                                    <input className={s.ModalDeliveryRadio} name={"delivery"}
                                           id={"input" + delivery.module_id} type={"radio"}
                                           checked={state.selectedDelivery && delivery.module_id == state.selectedDelivery.module_id}
                                           onChange={() => deliveryChangeHandler(delivery)}/>
                                    <label htmlFor={"input" + delivery.module_id}>
                                        <div className={s.OneImg}>
                                            <img src={delivery.logo_url} alt=""/>
                                        </div>
                                        <div className={s.OneName}>
                                            <span>{delivery.name}</span>
                                            <span>
                                                {delivery.delivery_info_type === 'points'
                                                    ? 'Постамат'
                                                    : 'Доставка курьером'
                                                }
                                            </span>
                                        </div>
                                        <div className={s.OneData}>
                                                {`${delivery.shipping_deliveries_days} (24-26 июля)`}
                                        </div>
                                        <div className={s.OnePrice}>
                                            {`${delivery.shipping_cost.toLocaleString()} ₽`}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default CourierDelivery;