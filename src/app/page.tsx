import Image from "next/image";
import styles from "./page.module.css";
import AuthGuard from "./auth/components/AuthGuard";
import Home from "./home/components/Home";

const App = () => {
  return (
    <AuthGuard>
      <Home />
    </AuthGuard>
  );
};
export default App;
