import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import validationMiddleware from "../middlewares/validation.middleware.js";

import { createAddressController, deleteAddressController, getAddressByIdController, getMyAddressesController, setDefaultAddressController, updateAddressController } from "../controllers/address/address.controller.js";

import { createAddressValidator } from "../validators/address/createAddress.validator.js";
import { mongoIdValidator } from "../validators/common/mongoId.validator.js";
import { updateAddressValidator } from "../validators/address/updateAddress.validator.js";

const router = Router();

router.post(
    "/",
    protect,
    createAddressValidator,
    validationMiddleware,
    createAddressController
);


router.get("/",
    protect,
    getMyAddressesController
);

router.get(
    "/:addressId",
    protect,
    mongoIdValidator("addressId", "Invalid address id"),
    validationMiddleware,
    getAddressByIdController
);

router.patch(
    "/:addressId",
    protect,
    mongoIdValidator("addressId", "Invalid address id"),
    updateAddressValidator,
    validationMiddleware,
    updateAddressController
);


router.delete(
    "/:addressId",
    protect,
    mongoIdValidator("addressId", "Invalid address id"),
    validationMiddleware,
    deleteAddressController
);

router.patch(
    "/:addressId/default",
    protect,
    mongoIdValidator("addressId", "Invalid address id"),
    validationMiddleware,
    setDefaultAddressController
);


export default router;