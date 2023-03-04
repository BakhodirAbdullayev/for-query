import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Users from "./pages/Users";
import { ConfigProvider, theme } from "antd";
import User from "./pages/User";
import CreateUser from "./pages/CreateUser";
import Edit from "./pages/Edit";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#005036",
        },
        // algorithm: theme.darkAlgorithm,
      }}
    >
      <div className="App">
        <Layout>
          <Routes>
            <Route index element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users/:id/edit" element={<Edit />} />
            <Route path="createuser" element={<CreateUser />} />
          </Routes>
        </Layout>
      </div>
    </ConfigProvider>
  );
}

export default App;
