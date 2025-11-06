import { useRouteError } from "react-router-dom";

const error = () => {
    const err = useRouteError();// this hook gives the error object just to see and understand the error
    console.log(err); // to see the error object in console for better understanding to developers

    return (
        <div>
            <h1>404 Not Found</h1>
            <h2>the page you are looking for is not available</h2>
            <h2>Try after sometime...</h2>
        </div>
    );
}
export default error;