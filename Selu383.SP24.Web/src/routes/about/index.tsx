import { Outlet } from 'react-router-dom';
import "./about.css"
import logo from "../../images/logo.png";

function About() {
    return (
        <div className="container">
            <h1 className="aboutusH1">About Us</h1>
            <table className="centerAbout">
                <tr>
                    <img src={logo} alt="Logo" />
                </tr>
                <div className="about-card about-card-custom">
                    <div className="about-card-body">
                        <h4 className="about-card-title">Innovative Design</h4>
                        <p className="about-card-text about-card-text-custom">The up-and-coming hotel stands out with its innovative design,
                            blending cutting-edge architecture and stylish interiors to create a visually stunning environment that
                            captivates guests from the moment they arrive.</p>
                    </div>
                </div>
                <div className="about-card about-card-custom">
                    <div className="about-card-body">
                        <h4 className="about-card-title">Exceptional Service</h4>
                        <p className="about-card-text about-card-text-custom">Service excellence is the cornerstone of our hotel experience.
                            From the warm welcome at check-in to the attentive assistance throughout your stay, our dedicated staff goes above
                            and beyond to ensure every guest feels valued and cared for. Anticipating needs and exceeding expectations is our standard,
                            leaving a lasting impression on each visitor.</p>
                    </div>
                </div>
                <div className="about-card about-card-custom">
                    <div className="about-card-body">
                        <h4 className="about-card-title">Amenities  for All</h4>
                        <p className="about-card-text about-card-text-custom"> Our hotel prides itself on offering amenities that cater to
                            the diverse needs and preferences of our guests. Whether you seek relaxation, entertainment, or productivity,
                            our range of offerings has you covered. From interactive common areas
                            designed for socializing, there's something for everyone to enjoy, ensuring a fulfilling and memorable stay for all.</p>
                    </div>
                </div>
            </table>
            <Outlet />
        </div>
    );
}

export default About;