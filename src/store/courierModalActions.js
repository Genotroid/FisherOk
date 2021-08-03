export const courierModalInitialState = {
    courierModalActive: false,
    departureCity: {},
    deliveryList: []
};

export const courierModalActions = {
    setCourierModalActive: (state, data) => ({courierModalActive: data}),
    setDepartureCity: (state, data) => ({departureCity: data}),
    setDeliveryList: (state, data) => ({deliveryList: data}),
};
