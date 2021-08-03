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

    const deliveryChangeHandler = (newDeliveryModuleId) => {
        axios.post(
            'https://livosnami/site2/api/changeDeliveryType',
            {
                "operation": "change_delivery_type",
                "data": {
                    "departure_city_id": state.departureCity.city_id,
                    "shipping_type_id": 3018,
                    "module_id": newDeliveryModuleId,
                    "client_address": null
                }
            })
            .then(res => console.log('changeDeliveryType', res));
    }

    if (!state.departureCity) {
        return <></>
    }

    return (
        <div className={(state.courierModalActive ? s.ModalActive : s.Modal) + ' modal-active'} ref={modalRef}
             onClick={() => changeModalStatus(false)}>
            <div className={state.courierModalActive ? s.ModalContentActive : s.ModalContent} onClick={e => e.stopPropagation()}>
                <div className={s.ModalOff}>
                    <a className={s.ModalOffLink} onClick={() => changeModalStatus(false)}></a>
                </div>
                <div className={s.ModalDeliveryName}>
                    {`Выбор транспортной компании из ${state.departureCity.city_name}`}
                </div>
                <div className={s.ModalDeliveryData}>
                    {state.deliveryList && state.deliveryList.map((delivery, key) =>
                        <div className={s.ModalDeliveryItem}>
                            <div className={s.ModalDeliveryOne}>
                                <div className={s.OneInput}>
                                    <input className={s.ModalDeliveryRadio} name={"delivery"}
                                           id={"input" + delivery.module_id} type={"radio"}
                                           checked={delivery.module_id === state.selectedDelivery.codule_id}
                                           onChange={() => deliveryChangeHandler(delivery.module_id)}/>
                                    <label htmlFor={"input" + key}>
                                        <div className={s.OneImg}>
                                            <img src={delivery.logo_url} alt=""/>
                                        </div>
                                        <div className={s.OneName}>{delivery.name}</div>
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