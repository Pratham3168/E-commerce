import { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { listAdminOrders, updateOrderStatus } from "../admin.service";
import StatusBadge from "../../../components/common/StatusBadge";
import Modal from "../../../components/common/Modal";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [pendingChange, setPendingChange] = useState(null);
  const load = () =>
    listAdminOrders({ limit: 50 })
      .then((result) => setOrders(result.orders))
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message || "Unable to load admin orders",
        ),
      );
  useEffect(() => {
    load();
  }, []);
  function requestStatusChange(order, event) {
    const nextStatus = event.target.value;
    if (!nextStatus || nextStatus === order.status) return;
    setPendingChange({ order, nextStatus });
  }
  async function confirmStatusChange() {
    if (!pendingChange) return;
    await updateOrderStatus(
      pendingChange.order._id || pendingChange.order.id,
      pendingChange.nextStatus,
    )
      .then(load)
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Unable to update order status",
        ),
      );
    setPendingChange(null);
  }
  const visible = orders.filter((order) =>
    `${order._id} ${order.user?.firstName || ""} ${order.user?.lastName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <div className="admin-content">
      <div className="admin-heading">
        <div>
          <span className="eyebrow">Workspace / Orders</span>
          <h1>Orders</h1>
        </div>
        <button className="date-button">
          <Filter size={15} /> Live data
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
      <div className="admin-toolbar">
        <label className="filter-search">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search orders"
          />
        </label>
      </div>
      <div className="admin-order-table full">
        <div className="table-head">
          <span>Order</span>
          <span>Customer</span>
          <span>Date</span>
          <span>Payment</span>
          <span>Status</span>
          <span>Total</span>
        </div>
        {visible.map((order) => {
          const id = order._id || order.id;
          return (
            <div className="table-row" key={id}>
              <Link to={`/admin/orders/${id}`}>
                <b>{id}</b>
              </Link>
              <span>
                {order.user?.firstName} {order.user?.lastName}
              </span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              <StatusBadge
                status={
                  order.payment?.status || order.paymentStatus || "Pending"
                }
              />
              <select
                value={order.status}
                onChange={(event) => requestStatusChange(order, event)}
              >
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Packed</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
              <strong>
                ${Number(order.totalAmount || order.total || 0).toFixed(2)}
              </strong>
            </div>
          );
        })}
      </div>
      <Modal
        open={Boolean(pendingChange)}
        title="Confirm status change"
        onClose={() => setPendingChange(null)}
      >
        <div className="confirm-dialog">
          <p>
            Change order{" "}
            <strong>
              {pendingChange?.order?._id || pendingChange?.order?.id}
            </strong>{" "}
            from <strong>{pendingChange?.order?.status}</strong> to{" "}
            <strong>{pendingChange?.nextStatus}</strong>?
          </p>
          <div className="confirm-actions">
            <button
              className="button button-outline"
              onClick={() => setPendingChange(null)}
            >
              Cancel
            </button>
            <button
              className="button button-dark"
              onClick={confirmStatusChange}
            >
              Confirm change
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
