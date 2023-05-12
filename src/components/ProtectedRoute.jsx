import { Navigate } from "react-router-dom";
import { accountService } from "../service/account.service";

const ProtectedRoute = ({children}) => {

  if(!accountService.isLogged()){
      return <Navigate to="/"/>
  }
 
  return children
};

export default ProtectedRoute;