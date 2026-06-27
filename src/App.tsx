import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Browse from "@/pages/Browse";
import Wizard from "@/pages/Wizard";
import ToolDetail from "@/pages/ToolDetail";
import MyStack from "@/pages/MyStack";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/:category" element={<Browse />} />
        <Route path="/wizard" element={<Wizard />} />
        <Route path="/tool/:id" element={<ToolDetail />} />
        <Route path="/my-stack" element={<MyStack />} />
      </Routes>
    </Layout>
  );
}
