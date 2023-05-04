import buildclient from "../api/buildclient";

const LandingPage = ({currentUser}) => {

  return currentUser ? <h1> You are signed in. </h1> :
   <h1> You are Not signed in !</h1>
  
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildclient(context).get('/api/users/currentuser');
  return data;
}

export default LandingPage; 