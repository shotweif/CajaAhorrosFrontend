import { useLocation, useNavigate } from 'react-router-dom';


export function navPath(path: string) {
    const navigation = useNavigate();
    const location = useLocation();

    // const navPath = (path: string) => {
        if (location.pathname !== path) {
            navigation(path);
        }
    // };

    // const navigate = useNavigate();
    // navigate(path);
}
