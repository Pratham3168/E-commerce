import User from "../../models/user.model.js";
import ApiError from "../../errors/apiError.js";

export const listCustomers = async () => User.find({ role: "user" })
  .select("firstName lastName email phone isActive isVerified createdAt")
  .sort({ createdAt: -1 });

export const updateCustomerStatus = async (customerId, isActive) => {
  const customer = await User.findOneAndUpdate(
    { _id: customerId, role: "user" },
    { isActive },
    { new: true, runValidators: true },
  ).select("firstName lastName email phone isActive isVerified createdAt");

  if (!customer) throw new ApiError(404, "Customer not found");
  return customer;
};
