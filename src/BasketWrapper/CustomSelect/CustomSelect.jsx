import React, {useState, useRef} from 'react';
import useOutsideClick from './useOutsideClick';
import './customSelect.css';

const CustomSelect = ({items, modalForm}) => {
    let buttonRef = useRef();
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [selectedItem, setSelectedItem] = useState(items[0]); 

    useOutsideClick(buttonRef, () => {
        setIsOpenSelect(false);
    }, modalForm.current);

    return <div className='custom-select-wrapper' onClick={() => setIsOpenSelect(!isOpenSelect)}>
        <div className={`custom-select ${isOpenSelect ? 'open' : ''}`} ref={buttonRef}>
            <div className={'custom-select__trigger'}>
                <span className={'custom-select-label'}>{selectedItem.name}</span>
            </div>
            <div className={'custom-options'}>
                {items.map((item, key) =>
                    <span className={`custom-option ${selectedItem === item ? 'selected' : ''}`}
                          key={key} onClick={() => setSelectedItem(item)}>
                        {item.name}
                    </span>
                )}
            </div>
        </div>
    </div>
}

export default CustomSelect;