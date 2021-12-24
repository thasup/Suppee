import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="App">
      <>
        <Header />
        <main>
          <Container>
            <h1>Welcome to Suppee</h1>
          </Container>
        </main>
        <Footer />
      </>
    </div>
  );
};

export default App;
