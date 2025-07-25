













function RenderApp() {
  const welcome = "Welcome! to the app";
  return <h1>Welcome! to the app</h1>;
}


function RenderLogin() {
  const please = "provide details for";
  return (
    <form>
      <h2>{please } Login </h2>
      <label>Email:
        <input type="text" />
      </label>
      <br />
      <label>Password:
        <input type="text" />
      </label>
    </form>
  );
}



function Home(props) {
  const authenticated = props.authenticated;
  return (
    <div>
      { authenticated ? <RenderApp/> : <RenderLogin/> }
      <h1>This is Home Page</h1>
      <ul>
        <li>Apples</li>
        <li>Bananas</li>
        <li>Cherries</li>
      </ul>
      <p>Here I am</p>
  </div>
  );
}




export default Home;


