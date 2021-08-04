import React, {useState, useEffect} from 'react';
import s from './Delivery.module.css'
import ModalAddress from './../../ModalAddress/ModalAddress';

const Delivery = ({deliveryList}) => {
    const [ModalActive, setModalActive] = useState(false);
    const [modalType, setModalType] = useState(deliveryList[0].id);
    const [deliveryAddress, setDeliveryAddress] = useState({});

    return <div className={s.MeinInfo}>
        <div className={s.Delivery}>
            <div className={s.DeliveryType}>{'Тип доставки'}</div>
            <div className={s.DeliveryMedia}>
                <div className={s.DeliveryTypeData}>
                    {deliveryList.length && deliveryList.map((item, key) =>
                        <div className={s.DeliveryTypeItem}>
                            <input className={s.DeliveryRadio} name={'deliveryRadioList'} value={item.id}
                                   checked={item.id === modalType}
                                   id={`delivery-${key}-radio`} type={'radio'} onChange={() => setModalType(item.id)}/>
                            <label htmlFor={`delivery-${key}-radio`}>{item.title}</label>
                        </div>
                    )}
                </div>
                {modalType === 1 && (deliveryAddress.city
                    ? <div className={s.DeliveryAddress}>
                    <div className={s.DeliveryAddressTitle}>{'Адрес доставки'}</div>
                    <div className={s.DeliveryAddressLoca}>{deliveryAddress}</div>
                    <div className={s.DeliveryAddressButton}>
                        <button onClick={() => setModalActive(true)} className={s.DeliveryAddressButtonItem}>
                            {'Изменить'}
                        </button>
                    </div>
                </div>
                    : <button className={s.AddAddressButton} onClick={() => setModalActive(true)}>
                            {'Добавить адрес доставки'}
                    </button>
                )}
            </div>
        </div>
    </div>
}

export default Delivery;