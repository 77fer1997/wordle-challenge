import React, { FC } from "react";
import "./style.css";
interface IProps {
    toggled: boolean;
    onClick: () => void;
}
export const Toggle: FC<IProps> = ({ toggled, onClick }) => {
    return (
        <div onClick={onClick} className={`toggle${!toggled ? " night" : ""}`}>
            <div className="notch">
                <div className="crater" />
                <div className="crater" />
            </div>
            <div>
                <div className="shape sm" />
                <div className="shape sm" />
                <div className="shape md" />
                <div className="shape lg" />
            </div>
        </div>
    );
}