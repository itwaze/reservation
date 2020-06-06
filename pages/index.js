import React, { createContext, useReducer } from "react";
import Head from "next/head";
import { reducer, initialState } from "../store/reducer";
import { ReservationComponent } from '../components/ReservationComponent/ReservationComponent'

export const Context = createContext();

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
 
  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="container">
        <Head>
          <meta name='description' content='Awesome Reservation App'/>
          <title>Reservation App</title>
          <link rel="icon" href="/favicon.ico" />
          <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQVF4N0q1oDyyvSdHq0XI3iwMuLtxWVQs&libraries=places"></script>
        </Head>
        <ReservationComponent />

        <style jsx global>{`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            background: linear-gradient(to right, #757f9a, #d7dde8)
          }
        `}</style>
      </div>
    </Context.Provider>
  );
};

export default Home;
