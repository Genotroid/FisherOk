import { useEffect } from "react";

const useOutsideClick = (ref, callback, modalForm) => {
    const handleClick = e => {

        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {

        if (modalForm) {
            modalForm.addEventListener("click", handleClick);

            return () => {
                modalForm.removeEventListener("click", handleClick);
            };
        }

    });
};

export default useOutsideClick;