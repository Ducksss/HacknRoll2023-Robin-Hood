import React, { useState } from "react";
import "@pages/popup/index.scss";
import { Switch } from "@mui/material";
import logo from "@assets/img/logo.svg";

export default function Popup(): JSX.Element {
    const [zeroShotChecked, setZeroShotChecked] = useState(true);

    const handleZeroShotSwitch = () => {
        setZeroShotChecked((prevValue) => !prevValue);
    };

    return (
        <div className="Popup absolute top-0 left-0 right-0 bottom-0 text-center h-full bg-gray-800">
            {/* Title */}
            <div className="Popup__Title Title">
                <img src={logo} alt="logo" />
                <div className="Title__Right Right">
                    <h1>Robin Hood</h1>
                    <p>Catch me if you can</p>
                </div>
            </div>
            <hr />
            {/* Zero shot detection */}
            <div className="Popup__Zero-shot Zero-shot">
                <h2>Zero shot Detection</h2>
                <Switch
                    checked={zeroShotChecked}
                    onChange={handleZeroShotSwitch}
                    inputProps={{ "aria-label": "controlled" }}
                    color="primary"
                />
            </div>
            <hr />
            {/* Footer */}
            <div className="Footer">
                <p>Made with &#9829; in Prince Albert Dr.</p>
            </div>
        </div>
    );
}
