import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import HeaderA from './Components/HeaderA';
import {Footer} from '../Login/Components/Footer'
import { Body } from './Components/Body';
export default function App() {
  return (
    <div>
    <HeaderA/>
    <Body/>
    <Footer />
    </div>
  );
}

