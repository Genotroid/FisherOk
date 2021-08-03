export const postModalInitialState = {
    postModalActive: false,
    selectedDelivery: {},
};

export const postModalActions = {
    setPostModalActive: (state, data) => ({postModalActive: data}),
    setSelectedDelivery: (state, data) => ({selectedDelivery: data}),
};
