import "./App.css";
import Dashboard from "./components/Dashboard";
import Greeting from "./components/Greeting";
import UserDashboard from "./components/UserDashboard";

function App() {
  const isLoggedIn = true;
  const user = {
    name: "Kirti",
    email: "kirt@gmail.com",
    bio: "wertyui sdfg dfghcvbn dfghjdfghxdfcgvhb",
    imageUrl:
      "https://cdn.pixabay.com/photo/2025/04/22/05/54/dog-9548923_640.jpg",
  };
  return (
    <>
      <Greeting name={"Kirti"} timeOfDay={"morning"} />
      <Dashboard isLoggedIn={isLoggedIn} />
      <UserDashboard
        name={user.name}
        email={user.email}
        bio={user.bio}
        imageUrl={user.imageUrl}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}

export default App;
