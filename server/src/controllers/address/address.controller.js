import * as addressService from '../../services/address/address.service.js';
import ApiResponse from '../../utils/apiResponse.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createAddressController = asyncHandler(async (req, res) => {

    const newAddress = await addressService.createAddress(req.user._id,req.body);

    return res.status(201).json(
        new ApiResponse(201, newAddress, "Address added successfully")
    )

});


export const getMyAddressesController = asyncHandler(async (req, res) => {
    const addresses = await addressService.getMyAddresses(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            addresses,
            "Addresses fetched successfully"
        )
    );
});


export const getAddressByIdController = asyncHandler(async (req, res) => {
    const address = await addressService.getAddressById(
        req.user._id,
        req.params.addressId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            address,
            "Address fetched successfully"
        )
    );
});


export const updateAddressController = asyncHandler(async (req, res) => {
    const updatedAddress = await addressService.updateAddress(
        req.user._id,
        req.params.addressId,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedAddress,
            "Address updated successfully"
        )
    );
});


export const deleteAddressController = asyncHandler(async (req, res) => {
    await addressService.deleteAddress(
        req.user._id,
        req.params.addressId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Address deleted successfully"
        )
    );
});

export const setDefaultAddressController = asyncHandler(async (req, res) => {

    const address = await addressService.setDefaultAddress(
        req.user._id,
        req.params.addressId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            address,
            "Default address updated successfully"
        )
    );
});