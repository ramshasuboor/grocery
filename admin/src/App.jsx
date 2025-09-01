import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Product from "./pages/Product/Product";
import Layout from "./components/Layout/Layout";
import AddProduct from "./pages/Product/AddProduct";
import Customer from "./pages/Customer/Customer";
import Supplier from "./pages/Supplier/Supplier";
import AddCustomer from "./pages/Customer/AddCustomer";
import AddSupplier from "./pages/Supplier/AddSupplier";
import ShowCustomer from "./pages/Customer/ShowCustomer";
import EditCustomer from "./pages/Customer/EditCustomer";
import ShowSupplier from "./pages/Supplier/ShowSupplier";
import EditSupplier from "./pages/Supplier/EditSupplier";
import ShowProduct from "./pages/Product/ShowProduct";
import EditProduct from "./pages/Product/EditProduct";
import Invoice from "./pages/Invoice/Invoice";
import PrintInvoice from "./pages/Invoice/PrintInvoice";
import Recipe from "./pages/Recipe/Recipe"
import ReverseCalculation from "./pages/ReverseCalculation.jsx/ReverseCalculation";
import Invoices from "./pages/Invoices/Invoices"
import EditInvoice from "./pages/Invoice/EditInvoice";
import ShowInvoice from "./pages/Invoice/ShowInvoice";
import RecipeInvoice from "./pages/Recipe/RecipeInvoice";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/items"
            element={
              <Layout>
                <Product />
              </Layout>
            }
          />
          <Route
            path="/add-item"
            element={
              <Layout>
                <AddProduct />
              </Layout>
            }
          />
          <Route
            path="/show-item/:id"
            element={
              <Layout>
                <ShowProduct />
              </Layout>
            }
          />
          <Route
            path="/edit-item/:id"
            element={
              <Layout>
                <EditProduct />
              </Layout>
            }
          />
          <Route
            path="/customer"
            element={
              <Layout>
                <Customer />
              </Layout>
            }
          />
          <Route
            path="/add-customer"
            element={
              <Layout>
                <AddCustomer />
              </Layout>
            }
          />
          <Route
            path="/show-customer/:id"
            element={
              <Layout>
                <ShowCustomer />
              </Layout>
            }
          />
          <Route
            path="/edit-customer/:id"
            element={
              <Layout>
                <EditCustomer />
              </Layout>
            }
          />
          <Route
            path="/supplier"
            element={
              <Layout>
                <Supplier />
              </Layout>
            }
          />
          <Route
            path="/add-supplier"
            element={
              <Layout>
                <AddSupplier />
              </Layout>
            }
          />
          <Route
            path="/show-supplier/:id"
            element={
              <Layout>
                <ShowSupplier />
              </Layout>
            }
          />
          <Route
            path="/edit-supplier/:id"
            element={
              <Layout>
                <EditSupplier />
              </Layout>
            }
          />
          <Route
            path="/invoice"
            element={
              <Layout>
                <Invoice />
              </Layout>
            }
          />
          <Route
            path="/invoices"
            element={
              <Layout>
                <Invoices />
              </Layout>
            }
          />
          <Route
            path="/edit-invoice/:id" 
            element={
              <Layout>
                <EditInvoice />
              </Layout>
            }
          />
          <Route
            path="/show-invoice/:id" 
            element={
             
                <ShowInvoice />
      
            }
          />
          <Route
            path="/print-invoice"
            element={<PrintInvoice />}
          />
          <Route
            path="/recipe"
            element={
             <Layout>
              <Recipe />
             </Layout>
            }
          />
          <Route
            path="/recipe-invoice"
            element={
             <RecipeInvoice/>
            }
          />
          <Route
            path="/reversecalculation"
            element={
             <Layout>
              <ReverseCalculation />
             </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
