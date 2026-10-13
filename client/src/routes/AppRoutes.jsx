import { Route, Routes } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";
import AdminLayout from "../layouts/AdminLayout";
import useMockState from "../hooks/useMockState";
import Home from "../features/home/pages/Home";
import Products from "../features/product/pages/Products";
import ProductDetails from "../features/product/pages/ProductDetails";
import AuthPage from "../features/auth/pages/AuthPage";
import Cart from "../features/cart/pages/Cart";
import Wishlist from "../features/wishlist/pages/Wishlist";
import Checkout from "../features/checkout/pages/Checkout";
import Orders from "../features/order/pages/Orders";
import OrderDetails from "../features/order/pages/OrderDetails";
import Profile from "../features/user/pages/Profile";
import Addresses from "../features/address/pages/Addresses";
import NotFound from "../components/common/NotFound";
import Dashboard from "../features/admin/pages/Dashboard";
import AdminOrders from "../features/admin/pages/Orders";
import AdminCustomers from "../features/admin/pages/Customers";
import AdminManagement from "../features/admin/pages/Management";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getProfile } from "../features/user/user.service";
import RouteErrorBoundary from "../components/common/RouteErrorBoundary";

function AdminGuard() {
  const [status, setStatus] = useState(() => sessionStorage.getItem("ecommerce.authenticated") === "true" ? "checking" : "denied");
  useEffect(() => {
    if (sessionStorage.getItem("ecommerce.authenticated") !== "true") return;
    getProfile().then(profile => { sessionStorage.setItem("ecommerce.role", profile.role || "user"); setStatus(profile.role === "admin" ? "allowed" : "denied") }).catch(() => { clearSession(); setStatus("denied") });
  }, []);
  if (status === "checking") return <div className="page-shell"><p>Checking admin access...</p></div>;
  return status === "allowed" ? <AdminLayout /> : <Navigate to="/login" replace />;
}

function clearSession() {
  sessionStorage.removeItem("ecommerce.authenticated");
  sessionStorage.removeItem("ecommerce.role");
}

function GuestOnly({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState(() => sessionStorage.getItem("ecommerce.authenticated") === "true" ? "checking" : "guest");
  useEffect(() => {
    if (sessionStorage.getItem("ecommerce.authenticated") !== "true") return;
    getProfile()
      .then(profile => {
        sessionStorage.setItem("ecommerce.authenticated", "true");
        sessionStorage.setItem("ecommerce.role", profile.role || "user");
        setStatus(profile.role === "admin" ? "admin" : "authenticated");
      })
      .catch(() => {
        clearSession();
        setStatus("guest");
      });
  }, []);
  if (status === "checking") return <div className="page-shell"><p>Checking session...</p></div>;
  if (status === "admin") return <Navigate to="/admin" state={{ from: location }} replace />;
  if (status === "authenticated") return <Navigate to="/" state={{ from: location }} replace />;
  return children;
}

function RequireAuth({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState(() => sessionStorage.getItem("ecommerce.authenticated") === "true" ? "checking" : "denied");
  useEffect(() => {
    if (sessionStorage.getItem("ecommerce.authenticated") !== "true") return;
    getProfile()
      .then(profile => {
        sessionStorage.setItem("ecommerce.authenticated", "true");
        sessionStorage.setItem("ecommerce.role", profile.role || "user");
        setStatus("allowed");
      })
      .catch(() => {
        clearSession();
        setStatus("denied");
      });
  }, []);
  if (status === "checking") return <div className="page-shell"><p>Checking session...</p></div>;
  return status === "allowed" ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

function CustomerRoutes({ state }) {
  return (
    <Routes>
      <Route element={<CustomerLayout state={state} />}>
        <Route path="/" element={<Home state={state} />} />
        <Route path="/products" element={<Products state={state} />} />
        <Route
          path="/products/:slug"
          element={<RouteErrorBoundary><ProductDetails state={state} /></RouteErrorBoundary>}
        />
        <Route
          path="/login"
          element={<GuestOnly><AuthPage mode="login" state={state} /></GuestOnly>}
        />
        <Route
          path="/register"
          element={<GuestOnly><AuthPage mode="register" state={state} /></GuestOnly>}
        />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/cart" element={<RequireAuth><Cart state={state} /></RequireAuth>} />
        <Route path="/wishlist" element={<RequireAuth><Wishlist state={state} /></RequireAuth>} />
        <Route path="/checkout" element={<RequireAuth><Checkout state={state} /></RequireAuth>} />
        <Route path="/orders" element={<RequireAuth><Orders /></RequireAuth>} />
        <Route path="/orders/:id" element={<RequireAuth><RouteErrorBoundary><OrderDetails /></RouteErrorBoundary></RequireAuth>} />
        <Route path="/addresses" element={<RequireAuth><Addresses /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default function AppRoutes() {
  const state = useMockState();
  return (
    <Routes>
      <Route path="/admin" element={<AdminGuard />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<RouteErrorBoundary><OrderDetails /></RouteErrorBoundary>} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="management" element={<AdminManagement />} />
      </Route>
      <Route path="*" element={<CustomerRoutes state={state} />} />
    </Routes>
  );
}
