import React from "react";
import Button from "./Button";

const Primary = ({ icon, ...props }) => {
    return <Button {...props} backgroundColor={{ h: 353, s: 0.87, l: 0.41 }} />;
};

export default Primary;
