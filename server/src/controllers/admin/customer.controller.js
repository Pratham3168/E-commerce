import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";
import * as customerService from "../../services/admin/customer.service.js";

export const listCustomersController = asyncHandler(async (_req, res) => {
  const customers = await customerService.listCustomers();
  return res.status(200).json(new ApiResponse(200, customers, "Customers fetched successfully"));
});

export const updateCustomerStatusController = asyncHandler(async (req, res) => {
  const customer = await customerService.updateCustomerStatus(req.params.customerId, req.body.isActive);
  return res.status(200).json(new ApiResponse(200, customer, "Customer status updated successfully"));
});
