import React from "react";
import { Helmet } from "react-helmet";
export default function DocumentationContainer() {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous"
        />
      </Helmet>
      <div style={{ background: "#fff" }}>
        <div className="alert alert-success" role="alert">
          <h3 className="alert-heading container">Documentation</h3>
        </div>
        <h3 className="container text-success">Neuron documentation</h3>
        <br />
        <h6 className="container">Everything you need to know about Neuron.</h6>

        <br />
        <hr />
        <br />
        <h4 className="container text-success">First Steps</h4>
        <br />
        <h6 className="container">
          Are you new to Neuron or to Recommendation systems? This is the place
          to start!
        </h6>
        <br />
        <ul>
          {/* <!-- <a className="text-danger" href="from scrach\overview.html"><u>Overview</u></a> --> */}
          <li className="container">
            <span className="font-weight-bold">From scratch: </span>{" "}
            <span className="text-danger">
              <u>Overview</u> | <u>Get authenticated</u>
            </span>
          </li>

          <br />

          <li className="container">
            <span className="font-weight-bold">Tutorial: </span>
            <span className="text-danger">
              <u>Part 1: Request and responses</u> |{" "}
              <u>Part 2: Models and the admin site</u> |{" "}
              <u>Part 3: Recommendation system</u> |{" "}
              <u>Part 4: Sugssion system</u>
            </span>
          </li>
        </ul>
        <br />
        <hr />
        <br />
        <h4 className="container text-success">Getting help</h4>
        <br />
        <h6 className="container">Having trouble? We’d like to help!</h6>
        <br />
        <ul>
          <li className="container">
            Try the{" "}
            <span className="text-danger">
              <u>FAQ</u>
            </span>{" "}
            – it will get answers to many common questions.
          </li>
          <br />
          <li className="container">
            Looking for specific information? Try the{" "}
            <span className="text-danger">
              <u>Index contents.</u>
            </span>
          </li>
          <br />
          <li className="container">
            Report bugs with Neuron in our{" "}
            <span className="text-danger">
              <u>question tracker.</u>
            </span>
          </li>
        </ul>
        <br />
        <hr />
        <br />
        <h4 className="container text-success">
          How the documentation is organized
        </h4>
        <br />
        <h6 className="container">
          Nuron follows the Django documentaion flow. A high-level overview of
          how it’s organized will help you know where to look for certain
          things:
        </h6>
        <br />
        <ul>
          <li className="container">
            <span className="text-danger">
              <u>Tutorials</u>
            </span>{" "}
            take you by the hand through a series of steps to create a AI
            application. Start here if you’re new to Neuron or Recommendation
            systems development. Also look at the{" "}
            <span className="text-danger">
              <u>“First steps”.</u>
            </span>
          </li>
          <br />
          <li className="container">
            <span className="text-danger">
              <u>Topic guides</u>
            </span>{" "}
            discuss key topics and concepts at a fairly high level and provide
            useful background information and explanation.
          </li>
        </ul>

        <br />
        <hr />
        <br />
        <h4 className="container text-success">The systematic layers</h4>
        <br />
        <h6 className="container font-weight-normal">
          Neuron provides an abstraction layer (the "systematic layer") for
          structuring and organizing the data and other layes. These are
          high-level layers, making condensed halo shape between nodes.
        </h6>
        <br />
        <ul>
          <li className="container">
            <span className="font-weight-bold">Recommendation: </span>
            <span className="text-danger">
              <u>Media</u> | <u>Informatial</u> | etc.
            </span>
          </li>
          <br />
          <li className="container">
            <span className="font-weight-bold">Suggesion: </span>
            <span className="text-danger">
              <u>Single point output</u>
            </span>
          </li>
        </ul>
        <br />
        <hr />
        <br />
        <h4 className="container text-success">The Channel layers</h4>
        <br />
        <h6 classNameName="container font-weight-normal">
          Neuron performs unique AI tasks with in the Channel-nodes. Each
          channel nodes consists different units with API's.
        </h6>
        <br />
        <ul>
          <li className="container">
            <span className="text-danger">
              <u>Channel 1: Media in Recommendation</u>
            </span>{" "}
            is one of a recommendation unit, it provides all kinds media
            recommendation services.
          </li>
          <br />
          <li className="container">
            <span className="text-danger">
              <u>Channel 2: Informationa in Recommendation</u>
            </span>{" "}
            provides high-level API services for any kind of information service
            applications.
          </li>
        </ul>
        <br />
        <hr />
        <br />
        <h4 className="container text-success">The Unit layers</h4>
        <br />
        <h6 className="container font-weight-normal">
          The threat node which directly link with the user applications. Based
          on the domain and service the user provides, the input and output of
          the API models will vary.
        </h6>
        <br />
        <ul>
          <li className="container">
            Movies - Songs - Broadcast - Videos - Gaming
          </li>
          {/* <!-- <br/> -->
        <!-- <li className="container">Movies - Songs - Broadcast - Videos - Gaming</li> --> */}
        </ul>
        <br />
        <h6 className="container font-weight-normal">
          The Request and Response are controlable with in your accound
          dashboard.
        </h6>
        <br />
        <hr />
        <br />
        <h4 className="container text-success">The APIs and Models</h4>
        <br />
        <h6 className="container font-weight-normal">
          Neuron provides differnt sets of APIs for specific applications
          requirments. Each API requires a structured input and returns a
          organized outputs.
          <br />
          <br />
          <ul>
            <li className="container">
              In Neuron terminology the request and response structures are
              called as models. each APIs requires unique models to perform.{" "}
            </li>
            <br />
            <li className="container">
              <span className="text-danger">
                <u>Tags:</u>
              </span>{" "}
              The organized form of keys and value pairs needs to send in API
            </li>
          </ul>
        </h6>
      </div>
    </>
  );
}
