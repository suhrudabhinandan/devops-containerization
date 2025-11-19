// App.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./Components/Home/Home";
import { loadFromStorage } from "./Slice/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage()); // load token into Redux on app start
  }, [dispatch]);

  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
