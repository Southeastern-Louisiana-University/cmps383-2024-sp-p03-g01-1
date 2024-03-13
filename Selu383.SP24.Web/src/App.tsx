
import './App.css';

function App() {
    return (
        <div className="app">
            <div className="colorMe">
                <header className="header">

                    <button className="logo" >EnStay</button>
                    <select className="menubar">
                        <option className="menubar" value="" disabled selected>Travel</option>
                        <option value="hotel1" >Hotel 1</option>
                        <option value="hotel2">Hotel 2</option>
                        <option value="hotel3">Hotel 3</option>
                    </select>
                    <button className="menubar">Offers</button>
                    <button className="menubar">Contact Us</button>
                    <button className="menubar">About Us</button>
                    <button className="login">Login</button>
                    <button className="login"> Register</button>



                </header>
            </div>
            <section className="color-block">
                <h1>Where Convenience Checks In</h1>
            </section>
            <main>
                <table>
                    <td>
                        <div className="hotel-info">
                            <img src="https://professionals.tarkett.com/media/img/M/THH_25094225_25187225_001.jpg" alt="Placeholder image"></img>
                            <div className="hotel-name">Our Benefits</div>
                            <br></br>
                            <div className="description">Placeholder for EnStay benefits.</div>
                            <button className="bookButton">Book Now</button>
                        </div>
                    </td>
                    <td>
                        <div className="hotel-info">
                            <img src="https://professionals.tarkett.com/media/img/M/THH_25094225_25187225_001.jpg" alt="Placeholder image"></img>
                            <div className="hotel-name">Our Features</div>
                            <br></br>
                            <div className="description">Placeholder for EnStay features.</div>
                            <button className="bookButton">Book Now</button>
                        </div>
                    </td>
                    <td>
                        <div className="hotel-info">
                            <img src="https://professionals.tarkett.com/media/img/M/THH_25094225_25187225_001.jpg" alt="Placeholder image"></img>
                            <div className="hotel-name">Our Gurantees</div>
                            <br></br>
                            <div className="description">Placeholder for EnStay gurantees.</div>
                            <button className="bookButton">Book Now</button>
                        </div>
                    </td>
                </table>
            </main>
            <footer className="footer">
                <p>&copy; 2024 Our Hotel. All rights reserved.</p>
            </footer>
        </div>
    );
}
export default App;