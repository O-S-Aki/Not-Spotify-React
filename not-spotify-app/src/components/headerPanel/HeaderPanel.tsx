import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { IHeaderPanelProps, IPageProps } from "../../assets/helpers/interfaces/propsInterfaces";
import { getDominantColor } from '../../assets/helpers/colorPalette';

import './headerPanel.css';

const HeaderPanel: React.FC<IHeaderPanelProps> = ({ primary, secondary, description, extras }) => {
  
  return (
    <></>
  )
}

export default HeaderPanel