import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import axios from 'axios';
import geoData from '../../jsons/ymap.json';
import s from './PostDelivery.module.css';
import SearchIcon from '../../Icons/SearchIcon';
import CustomSelect from '../../BasketWrapper/CustomSelect/CustomSelect';
import MapImage from '../../BasketWrapper/img/map.png';
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import placemarkIcon from '../../BasketWrapper/img/placemark.png';
import {useStore} from '../../store/useStore';
import './placemark.css';

const PostDelivery = () => {
    const addressRef = useRef();
    const modalRef = useRef();
    const {state, dispatch} = useStore();
    const changeModalStatus = useCallback((data) => dispatch({type: "setPostModalActive", data: data}), [dispatch]);
    const [mobileModalState, setMobileModalState] = useState(window.innerWidth < 768 ? 1 : 0);
    const [activeAddress, setActiveAddress] = useState(geoData[0].address_geo);
    const [placemarkList, setPlacemarkList] = useState([]);
    const [center, setCenter] = useState(geoData[0].address_geo.split(','));
    const mapState = useMemo(() => ({center, zoom: 12}), [center]);
    const imgStyle = {width: '61px', height: '27px', marginRight: '10px', objectFit: 'cover'};

    const enterKeyDown = (e) => {

        if (e.key === 'Enter') {
            filterGeoDataHandler(e);
        }

    }

    const returnToTKHandle = () => {
        dispatch({type: "setCourierModalActive", data: true});
        changeModalStatus(false);
    }

    const placemarkClickHandler = (placemark) => {
        setCenter(placemark.address_geo.split(','));
        setActiveAddress(placemark.address_geo);
    }

    const changeCheckBoxHandler = (newMobileState) => {

        console.log('newMobileState', newMobileState);

        // axios.post(
        //     'https://livosnami/site2/api/change-delivery-type',
        //     {
        //         "operation": "change_delivery_type",
        //         "data": {
        //             "departure_city_id": state.departureCity.city_id,
        //             "shipping_type_id": newDelivery.delivery_info_type === 'points'
        //                 ? newDelivery.module_id
        //                 : newDelivery.default_shipping_type,
        //             "module_id": newDelivery.module_id,
        //             "client_address": null
        //         }
        //     })
        //     .then(result => dispatch({type: 'setBaket', data: result.data}))
        //     .catch(error => dispatch({type: 'setBaket', data: tempBasket}));

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
                        <button class="baloon-btn">Выбрать пункт</button>
                    </div>
                </div>`

            return {
                geometry: geoPlace.address_geo.split(','),
                properties: {
                    balloonContent: placemarkContent,
                },
                options: {
                    iconLayout: 'default#image',
                    iconImageHref: placemarkIcon,
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
        const placeMarks = convertGeoDataToPlacemark(geoData);
        setPlacemarkList(placeMarks);
    }, []);

    const filterGeoDataHandler = (e) => {
        const tempGeoData = geoData.filter(geo =>
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
                {(mobileModalState === 1 || !mobileModalState) && <>
                    <button className={s.ModalPostChooseTKButton} onClick={returnToTKHandle}>
                        {'Вернуться к выбору ТК'}
                    </button>
                    <div className={mobileModalState === 1 ? s.ModalDeliveryName : s.ModalPostDeliveryName}>
                        {`Выбор адреса пункта выдачи ${state.selectedDelivery.name}`}
                    </div>
                    <div style={{marginLeft: '50px'}}>
                        {`Стоимость доставки ${state.selectedDelivery.shipping_cost} `}&#8381;
                    </div>
                </>}
                {(mobileModalState > 1 || !mobileModalState) &&
                <div className={s.MainBox}>
                    {(mobileModalState === 3 || !mobileModalState) && <div className={s.AddressBox}>
                        <div className={s.SearchAddress}>
                            {mobileModalState !== 0 &&
                            <button className={s.ModalPostHideList} onClick={() => setMobileModalState(2)}>
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
                                    <li key={key} className={activeAddress === placemark.address_geo ? 'active' : ''}
                                        onClick={() => placemarkClickHandler(placemark)}>
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
                        {mobileModalState === 2 &&
                        <div style={{justifyContent: 'flex-end', display: 'flex'}}>
                            <button className={s.ModalPostShowList} onClick={() => setMobileModalState(3)}>
                                <span>{'Показать списком'}</span><span className={s.OpenSelector}/>
                            </button>
                        </div>}
                    </div>
                </div>
                }
            </div>
        </div>
    )
}
export default PostDelivery;