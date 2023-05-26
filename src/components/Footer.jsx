import React from "react";
import { RiFacebookCircleFill } from "react-icons/ri";
import { AiFillTwitterCircle, AiOutlineMail } from 'react-icons/ai';
import "../style/footer.css"

export default function Footer() {
    const style = {
        backgroundColor: 'rgba(245,243,246,0.88)',
        color: '#230202',
        borderRadius: "20px",
        justifyContent: 'left'
      };
    return (
        <div className="footer-dark" style={style}>
            <footer className="container">
             
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Contact Us</h3>
                            <ul>
                                <li>Phone: +212 6-56-76-56-35</li>
                                <li>Email: anasjegoual.2000@gmail.com</li>
                                <li>Address: emsi, Marrakech</li>
                            </ul>
                        </div>
                        <div className="col item social">
                            <a href="#"><AiOutlineMail/></a>
                            <a href="#"><RiFacebookCircleFill/></a>
                            <a href="#"><AiFillTwitterCircle/></a>
                            </div>
                    </div>
                    <p className="copyright">Localisation Pharmacie ©2023</p>
           
            </footer>
        </div>
    );
}