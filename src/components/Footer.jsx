import React from "react";
import { RiFacebookCircleFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle } from 'react-icons/ai';
import { RiTelegramFill } from 'react-icons/ri';
import "../style/footer.css"

export default function Footer() {
    return (
        <div className="footer-dark" style={{marginTop:"50px"}}>
            <footer className="container">
             
                    <div className="row">
                        <div className="col-md-6 item text">
                            <h3>About Our App</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sit quis, accusamus quidem ea beatae provident numquam sed maiores ipsam totam officiis perferendis explicabo dolor exercitationem sint harum, dolore quod.</p>
                        </div>

                        <div className="col-sm-6 col-md-3 item">
                            <h3>About Us</h3>
                            <ul>
                                <li><a href="/#">Company</a></li>
                                <li><a href="/#">Team</a></li>
                                <li><a href="/#">Careers</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Contact Us</h3>
                            <ul>
                                <li><a href="#">Phone: +212 6-56-76-56-35</a></li>
                                <li><a href="#">Email: anas@pharmacie.com</a></li>
                                <li><a href="#">Address: emsi, Marrakech</a></li>
                            </ul>
                        </div>
                        <div className="col item social">
                            <a href="#"><RiTelegramFill/></a>
                            <a href="#"><RiFacebookCircleFill/></a>
                            <a href="#"><AiFillTwitterCircle/></a>
                            <a href="#"><RiInstagramFill/></a></div>
                    </div>
                    <p className="copyright">Localisation Pharmacie ©2023</p>
           
            </footer>
        </div>
    );
}