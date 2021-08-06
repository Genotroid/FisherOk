import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import axios from 'axios';
import SearchIcon from '../../Icons/SearchIcon';
import CustomSelect from '../../BasketWrapper/CustomSelect/CustomSelect';
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import {useStore} from '../../store/useStore';
import s from './PostDelivery.module.css';
import './placemark.css';

const PostDelivery = () => {
    const addressRef = useRef();
    const modalRef = useRef();
    const {state, dispatch} = useStore();
    const [mobileModalState, setMobileModalState] = useState(window.innerWidth < 768 ? 1 : 0);
    const [placemarkList, setPlacemarkList] = useState([]);
    const [center, setCenter] = useState(state.geoData[0] ? state.geoData[0].address_geo.split(',') : [55, 47]);
    const mapState = useMemo(() => ({center, zoom: 12}), [center]);
    const imgStyle = {width: '61px', height: '27px', marginRight: '10px', objectFit: 'cover'};

    const changeModalStatus = useCallback((data) => dispatch({type: "setPostModalActive", data: data}), [dispatch]);

    const enterKeyDown = (e) => {

        if (e.key === 'Enter') {
            filterGeoDataHandler(e);
        }

    }

    const returnToTKHandle = () => {
        dispatch({type: "setCourierModalActive", data: true});
        changeModalStatus(false);
    }

    window.changeDelivery = (shippingTypeId) => {
        axios.post(
            ' https://devnew.lovisnami.ru:39878/api/v2/basket/delivery/?dev_test_key=c048db8a21f93d3dc4e6',
            {
                "operation": "change_delivery_type",
                "data": {
                    "departure_city_id": state.departureCity.departure_city_id,
                    "shipping_type_id": shippingTypeId,
                    "shipping_module_id": state.selectedDelivery.module_id,
                    "client_address": null
                }
            })
            .then(result => {
                dispatch({type: 'setBasket', data: result.data.data});
                dispatch({type: 'setPostModalActive', data: false});
            })
            .catch(error => console.log('Change delivery error', error));
    }

    const convertGeoDataToPlacemark = (geo) => {
        const placeMarks = geo.map(geoPlace => {
            const placemarkContent = `
                <div class="baloon-content">
                    <div class="opacity-text">Адрес:</div>
                    <div class="bold-text" style="line-height: 15px;">${geoPlace.address}</div>
                    <div class="opacity-text custom-text">Режим работы</div>
                    <div class="bold-text">Ежедневно 10:00-21:00</div>
                    <div>
                        <button class="baloon-btn" onclick="window.changeDelivery('${geoPlace.shipping_type_id}')">
                            Выбрать пункт
                        </button>
                    </div>
                </div>`

            return {
                geometry: geoPlace.address_geo.split(','),
                properties: {
                    balloonContent: placemarkContent,
                },
                options: {
                    iconLayout: 'default#image',
                    iconImageHref: state.selectedDelivery.logo_url,
                    iconImageSize: [25, 25],
                    balloonCloseButton: false,
                },
                modules: ['geoObject.addon.balloon'],
                address: geoPlace.address,
                address_geo: geoPlace.address_geo
            }
        });

        return placeMarks;
    }

    useEffect(() => {

        if(!state.geoData[0]) {
            return false;
        }

        const placeMarks = convertGeoDataToPlacemark(state.geoData);
        setPlacemarkList(placeMarks);

        const placemark = state.geoData
            .find(geoPlace => geoPlace.shipping_type_id === state.selectedDelivery.shipping_type_id);

        if (placemark) {
            setCenter(placemark.address_geo.split(','));
        } else {
            setCenter(state.geoData[0].address_geo.split(','));
        }

    }, [state.geoData]);

    const filterGeoDataHandler = (e) => {
        const tempGeoData = state.geoData.filter(geo =>
            geo.address.toLowerCase().includes(addressRef.current.value.toLowerCase())
        );
        const tempPlacemarks = convertGeoDataToPlacemark(tempGeoData);
        setPlacemarkList(tempPlacemarks);
    }

    if (!state.selectedDelivery) {
        return <></>
    }

    return (
        <div className={(state.postModalActive ? s.ModalActive : s.Modal) + ' modal-active'} ref={modalRef}
             onClick={() => changeModalStatus(false)}>
            <div className={mobileModalState === 1 ? s.ModalContentActive : s.ModalPostContentActive}
                 onClick={e => e.stopPropagation()}>
                <div className={mobileModalState ? s.ModalOff : s.ModalPostOff}>
                    <a className={mobileModalState ? s.ModalOffLink : s.ModalPostOffLink}
                       onClick={() => changeModalStatus(false)}></a>
                </div>
                <button className={s.ModalPostChooseTKButton} onClick={returnToTKHandle}>
                    {'Вернуться к выбору ТК'}
                </button>
                {(mobileModalState === 1 || !mobileModalState) && <>
                    {!mobileModalState && <>
                        <div className={mobileModalState === 1 ? s.ModalDeliveryName : s.ModalPostDeliveryName}>
                            {`Выбор адреса пункта выдачи ${state.selectedDelivery.name}`}
                        </div>

                        <div style={{marginLeft: '50px'}}>
                            {`Стоимость доставки ${state.selectedDelivery.shipping_cost} `}&#8381;
                        </div>
                    </>}
                </>}
                <div className={s.MainBox}>
                    {(mobileModalState === 3 || !mobileModalState) && <div className={s.AddressBox}>
                        <div>
                            {mobileModalState !== 0 &&
                            <button className={s.ModalPostHideList} onClick={() => setMobileModalState(1)}>
                                <span>{'Свернуть список'}</span><span className={s.CloseSelector}/>
                            </button>
                            }
                        </div>
                        <div className={s.SearchAddress}>
                            <input placeholder={'поиск адреса'} ref={addressRef} onKeyDown={enterKeyDown}/>
                            <button onClick={filterGeoDataHandler}>
                                <SearchIcon color={'#808AAE'} size={15}/>
                            </button>
                        </div>
                        <div className={s.AddressBook}>
                            <ul>
                                {placemarkList && placemarkList.map((placemark, key) =>
                                    <li key={key} onClick={() => setCenter(placemark.address_geo.split(','))}>
                                        {placemark.address}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>}
                    <div className={s.MapBox}>
                        <YMaps className={s.MapImg}>
                            <div>
                                <Map width={mobileModalState ? '298px' : '550px'}
                                     height={mobileModalState ? '390px' : '550px'} state={mapState}>
                                    {placemarkList && placemarkList.map((placemark, key) =>
                                        <Placemark key={key} {...placemark} />
                                    )}
                                </Map>
                            </div>
                        </YMaps>
                        {mobileModalState === 1 &&
                        <div style={{position: 'absolute', bottom: '0'}}>
                            <button className={s.ModalPostShowList} onClick={() => setMobileModalState(3)}>
                                <span>{'Показать списком'}</span><span className={s.OpenSelector}/>
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostDelivery;