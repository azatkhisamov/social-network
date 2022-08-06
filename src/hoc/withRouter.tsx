import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const ComponentWithRouterProp: React.FC<WCP> = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <WrappedComponent {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter;
