import React, { useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { myContext } from "../App";
import axios from "axios";
import "../Css/UserChart.css";
import { useNavigate } from "react-router-dom";

function UserChart(props) {
  const navigate = useNavigate();

  const { userList, setUserList, username } = useContext(myContext);

  useEffect(() => {
    getBookingDetails();
  }, []);

  const getBookingDetails = async () => {
    try {
      const bookedList = await axios.post(
        "https://fligthback.onrender.com/api/getBooking",
        { username: username }
      );

      setUserList(bookedList.data.data);

      console.log("BL", bookedList);
    } catch (error) {
      console.log("error in fetching user details", error);
    }
  };

  const cdata = {
    labels: userList.map((doc) => doc.bookedDate),
    datasets: [
      {
        label: "Number of passengers travelled on this date",
        data: userList.map((doc) => doc.passengercount),
        backgroundColor: [
          "rgba(155, 255, 155 )",
          "rgba(255, 155, 155 )",
          "rgba(255, 255, 155 )",
          "rgba(255, 255, 215 )",
        ],
        borderWidth: 2,
      },
    ],
  };

  const handleGotouser = () => {

    setTimeout(() => {
      navigate("/userpage");
    }, 0);
  };
  const handleGotosearch = () => {

    setTimeout(() => {
      navigate("/search");
    }, 0);
  };

  return (
    <div
      onResize={() => {
        location.window.reload;
      }}
    >
      <div className="chartdi">
        <div className="chart-container container-fluid">
          <header>
            <div className="charthead text-center">
              <h1 className="col-12 tickhead">TICKET BOOKED CHART</h1>
            </div>
          </header>

          <div className="chartmain container text-center">
            <button
              className="refresh btn bx bx-refresh fs-2"
              onClick={() => {
                location.reload();
              }}
            ></button>

            <Bar
              data={cdata}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "NO. OF PASSENGERS TRAVELLED ON DATE",
                  },
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
          <div className="btnn  container-fluid text-cenetr row">
            <button
              onClick={handleGotouser}
              className="chrtbtn btn btn-danger mx-1 mt-1 mb-1"
            >
              Go to user page
            </button>
            <button
              onClick={handleGotosearch}
              className="chrtbtn btn btn-primary mx-1 mt-1 mb-1"
            >
              Go to search page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChart;
