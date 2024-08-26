import {Link} from 'react-router-dom';

function HomePage(){
    return (
        <>
        <h1>My home page0</h1>
        <p>go to <Link to="/products"> the list of products </Link></p>
        </>
    );
}
export default HomePage;