export const addressModalInitialState = {
    addressModalActive: false,
    cityId: 0,
    cityName: '',
    streetName: '',
    house: 0,
    apartment: 0,
    comment: ''
};

export const addressModalActions = {
    setAddressModalActive: (state, data) => ({addressModalActive: data}),
    setAddressCityId: (state, data) => ({cityId: data}),
    setAddressCityName: (state, data) => ({cityName: data}),
    setAddressStreetName: (state, data) => ({streetName: data}),
    setAddressHouseNumber: (state, data) => ({house: data}),
    setAddressApartmentNumber: (state, data) => ({apartment: data}),
    setAddressModalComment: (state, data) => ({comment: data}),
};
