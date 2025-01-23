import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <>
      <div className="home-container">
        <header className="home-header">
          <h1>Welcome to <span>EventManage</span></h1>
          <p>Streamline your event planning and management effortlessly!</p>
          <div className="cta-buttons">
            {/* <NavLink to="/dashboard" className="button-primary">Go to Dashboard</NavLink> */}
            {/* <NavLink to="/login" className="button-secondary">Login</NavLink> */}
          </div>
        </header>

        <section className="features-section">
          <h2>Key Features</h2>
          <div className="features">
            <div className="feature-card">
              <h3>Manage Events</h3>
              <p>Create, update, and track all your events in one place.</p>
            </div>
            <div className="feature-card">
              <h3>Search & Filter</h3>
              <p>Quickly find events with advanced search and filter options.</p>
            </div>
            <div className="feature-card">
              <h3>Real-Time Updates</h3>
              <p>Stay updated with notifications for upcoming events.</p>
            </div>
          </div>
        </section>

        <section className="upcoming-events-section">
          <NavLink to="/dashboard" className="button-primary">View All Events</NavLink>
        </section>

        {/* User Reviews Section */}
        <section className="reviews-section">
          <h2>What Our Users Say</h2>
          <div className="reviews">
            <div className="review-card">
              <p>"EventManage has been a game changer for my events. I can track everything in one place!"</p>
              <h4>- Pratima, Event Planner</h4>
            </div>
            <div className="review-card">
              <p>"The real-time updates are fantastic! I never miss an event detail anymore."</p>
              <h4>- Yogendra, Organizer</h4>
            </div>
            <div className="review-card">
              <p>"With EventManage, planning has never been easier. Highly recommend!"</p>
              <h4>- Pravesh, Wedding Planner</h4>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
