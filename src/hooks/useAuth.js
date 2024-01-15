import { useState } from "react";
import api from "../../utils/api";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
}
