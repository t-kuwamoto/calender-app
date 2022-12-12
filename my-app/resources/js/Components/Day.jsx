import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import moment from "moment";

const Day = ({ year, month, day, handleClickOpenRegisterPopup, ...props }) => {
    return (
        <DayWithStyled>
            <DayTextWithStyled>{day}</DayTextWithStyled>
            {day !== null && (
                <AddButtonWithStyled
                    onClick={() =>
                        handleClickOpenRegisterPopup(year, month, day)
                    }
                >
                    +
                </AddButtonWithStyled>
            )}
        </DayWithStyled>
    );
};

const DayWithStyled = styled.div``;

const DayTextWithStyled = styled.div`
    margin: 5px 0 10px 5px;
`;

const AddButtonWithStyled = styled.div`
    background: #808080;
    color: white;
    text-align: center;
    width: 21px;
    border-radius: 100px;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
        transition: transform 300ms cubic-bezier(0.15, 0.85, 0.45, 1.75);
    }
`;

export default Day;
