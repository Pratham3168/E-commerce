import Address from "../../models/address.model.js";
import ApiError from "../../errors/apiError.js";

export const createAddress = async (userId, addressData) => {

    const addressCount = await Address.countDocuments({user: userId});

    const newAddress = new Address({
        user: userId, 
        ...addressData,
        isDefault: addressCount === 0
    });

    await newAddress.save();
    return newAddress;

};


export const getMyAddresses = async (userId) => {

    const addresses = await Address.find({user: userId}).sort({isDefault: -1, createdAt: -1});

    return addresses;

};


export const getAddressById = async (userId, addressId) => {
    const address = await Address.findOne({_id: addressId, user: userId});
    if (!address) {
        throw new ApiError(404, "Address not found");
    }  
    return address;
};


export const updateAddress = async (userId, addressId, addressData) => {

    const address = await Address.findOne({_id: addressId, user: userId});
    if (!address) {
        throw new ApiError(404, "Address not found");
    }
    Object.assign(address, addressData);
    await address.save();
    return address;

};


export const deleteAddress = async (userId, addressId) => {
    const address = await Address.findOne({
        _id: addressId,
        user: userId,
    });

    if (!address) {
        throw new ApiError(404, "Address not found");
    }

    if (address.isDefault) {
        throw new ApiError(
            400,
            "Default address cannot be deleted. Please set another address as default first."
        );
    }

    await address.deleteOne();

    return;
};


export const setDefaultAddress = async (userId, addressId) => {

    const address = await Address.findOne({
        _id: addressId,
        user: userId,
    });

    if (!address) {
        throw new ApiError(404, "Address not found");
    }

    await Address.updateMany(
        { user: userId },
        {
            $set: {
                isDefault: false,
            },
        }
    );

    address.isDefault = true;

    await address.save();

    return address;
};