import 'bootstrap/dist/css/bootstrap.css';
import buildclient from "../api/buildclient";
// import Headers from '../components/headers';

const AppComponent = ({Component, pageProps,currentUser}) => {
    return <div>
  
        <Component {...pageProps} />
    </div>
};

AppComponent.getInitialProps = async (appContext) => {
    
    const client = buildclient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};

    if(appContext.Component.getInitialProps){
        pageProps = await  appContext.Component.getInitialProps(appContext.ctx)
    }

    return {
        pageProps,
        ...data
    };
}
  

export default AppComponent;