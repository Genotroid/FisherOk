import React, {useRef} from 'react';
import axios from 'axios';
import s from './CourierDelivery.module.css';
import SearchIcon from '../../Icons/SearchIcon';
import CustomSelect from '../../BasketWrapper/CustomSelect/CustomSelect';

const CourierDelivery = ({active, setActive, departureCity, deliveryList, selectedDelivery}) => {
    const modalRef = useRef();

    const deliveryChangeHandler = (newDeliveryModuleId) => {
        axios.post('https://livosnami/site2/api/changeDeliveryType',
            {})
            .then(res => console.log('changeDeliveryType', res))
    }

    return (
        <div className={(active ? s.ModalActive : s.Modal) + ' modal-active'} ref={modalRef}
             onClick={() => setActive(false)}>
            <div className={active ? s.ModalContentActive : s.ModalContent} onClick={e => e.stopPropagation()}>
                <div className={s.ModalOff}>
                    <a className={s.ModalOffLink} onClick={() => setActive(false)}></a>
                </div>
                <div className={s.ModalDeliveryName}>
                    {`Выбор транспортной компании из ${departureCity.city_name}`}
                </div>
                <div className={s.ModalDeliveryData}>
                    {deliveryList && deliveryList.map((delivery, key) =>
                        <div className={s.ModalDeliveryItem}>
                            <div className={s.ModalDeliveryOne}>
                                <div className={s.OneInput}>
                                    <input className={s.ModalDeliveryRadio} name={"delivery"}
                                           id={"input" + delivery.module_id} type={"radio"}
                                           checked={delivery.module_id === selectedDelivery.codule_id}
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