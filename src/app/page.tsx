import Image from "next/image";
import styles from "./page.module.css";
import AuthGuard from "./auth/components/AuthGuard";

const App = () => {
  return (
    <AuthGuard>
      <h1>HOME</h1>
    </AuthGuard>
  );
};
export default App;
