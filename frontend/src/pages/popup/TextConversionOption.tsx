import React, { useState } from "react";
import "@pages/popup/index.scss";
import { Icon } from "@iconify/react";

type TextConversionOptionProps = {
    name: string;
    options: any[];
};

const TextConversionOption = ({ name, options }: TextConversionOptionProps) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(false);

    const dropdownOnClick = () => {
        setOpenDropdown((prevValue) => !prevValue);
    };

    const dropdownSelect = (newSelectedOption: any) => {
        setSelectedOption(newSelectedOption);
    };
    console.log(selectedOption);

    return (
        <div className="Text-conversion-option">
            <h1 className="Text-conversion-option__Header">{name}</h1>
            <div
                className="Text-conversion-option__Parent Parent"
                onClick={dropdownOnClick}
            >
                <h3>
                    {selectedOption ? (
                        selectedOption
                    ) : (
                        <span>Select audience</span>
                    )}
                </h3>
                <Icon
                    className={`Parent__Icon Icon ${
                        openDropdown ? "Icon--expanded" : ""
                    }`}
                    icon="dashicons:arrow-down-alt2"
                />
            </div>
            <div
                className={`Text-conversion-option__Container Container ${
                    openDropdown ? "Container--expanded" : ""
                }`}
            >
                {options.map((option, index) => (
                    <span
                        onClick={() => dropdownSelect(option)}
                        key={index}
                        className="Conatiner__Item Item"
                    >
                        {option}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TextConversionOption;
