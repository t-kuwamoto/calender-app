import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import moment from "moment";

import Day from "./Day";
import RegisterPopup from "./RegisterPopup";

const Calendar = () => {
    const [year, setYear] = useState(moment().year()); // 年
    const [month, setMonth] = useState(moment().month() + 1); // 月

    // 月初
    const startDate = useMemo(() => {
        return moment(year + "-" + month + "-" + "01");
    }, [year, month]);

    // 月初の曜日
    const startDay = useMemo(() => {
        return startDate.day();
    }, [startDate]);

    // 月末
    const endDate = useMemo(() => {
        return moment(year + "-" + month + "-" + "01", "YYYY-MM").endOf(
            "month"
        );
    }, [year, month]);

    // 月末の日にち
    const endDayCount = useMemo(() => {
        return endDate.date();
    }, [endDate]);

    // この月の1日〜最終日までの配列
    const daysOfMonthArray = useMemo(() => {
        return [...Array(endDayCount).keys()].map((i) => ++i);
    });

    // 週ごとの二次元配列を生成
    const data = useMemo(() => {
        return [...Array(6)].map((empty, weekIndex) =>
            [...Array(7)].map((empty, dayIndex) => {
                const i = 7 * weekIndex + dayIndex - startDay;

                if (i < 0 || daysOfMonthArray[i] === undefined) {
                    return null;
                }
                return daysOfMonthArray[i];
            })
        );
    });

    // 全てnullの配列があれば除去する
    const filteredData = useMemo(() => {
        return data.filter(
            (week) => week.filter((day) => day != null).length > 0
        );
    }, [data]);

    const week = ["日", "月", "火", "水", "木", "金", "土"];

    const handleClickPrev = () => {
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleClickNext = () => {
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const [isOpenRegisterPopup, setIsOpenRegisterPopup] = useState(false);

    const [popupYear, setPopupYear] = useState(null);
    const [popupMonth, setPopupMonth] = useState(null);
    const [popupDay, setPopupDay] = useState(null);

    const handleClickOpenRegisterPopup = (year, month, day) => {
        setIsOpenRegisterPopup(true);

        setPopupYear(year);
        setPopupMonth(month);
        setPopupDay(day);
    };

    const handleClickCloseRegisterPopup = () => {
        setIsOpenRegisterPopup(false);
    };

    return (
        <>
            <CalendarWithStyled>
                <YearMonthBlockWithStyled>
                    <PrevMonthWithStyled onClick={() => handleClickPrev()}>
                        {"<"}
                    </PrevMonthWithStyled>
                    <YearMonthWithStyled>
                        {year}年{month}月
                    </YearMonthWithStyled>
                    <NextMonthWithStyled onClick={() => handleClickNext()}>
                        {">"}
                    </NextMonthWithStyled>
                </YearMonthBlockWithStyled>

                <CalendarBlockWithStyled>
                    <TableWithStyled>
                        <HeaderWithStyled>
                            <HeaderRowWithStyled>
                                {week.map((value, index) => (
                                    <HeaderColumnWithStyled
                                        key={`${index}-calendar-header`}
                                        day={value}
                                    >
                                        {value}
                                    </HeaderColumnWithStyled>
                                ))}
                            </HeaderRowWithStyled>
                        </HeaderWithStyled>
                        <BodyWithStyled>
                            {filteredData.map((week, i) => (
                                <BodyRowWithStyled
                                    key={`${i}-calendar-body-row`}
                                >
                                    {week.map((day, j) => (
                                        <BodyColumnWithStyled
                                            key={`${j}-calendar-body-column`}
                                        >
                                            <Day
                                                year={year}
                                                month={month}
                                                day={day}
                                                handleClickOpenRegisterPopup={
                                                    handleClickOpenRegisterPopup
                                                }
                                            />
                                        </BodyColumnWithStyled>
                                    ))}
                                </BodyRowWithStyled>
                            ))}
                        </BodyWithStyled>
                    </TableWithStyled>
                </CalendarBlockWithStyled>
            </CalendarWithStyled>

            {isOpenRegisterPopup && (
                <RegisterPopup
                    year={popupYear}
                    month={popupMonth}
                    day={popupDay}
                    handleClickCloseRegisterPopup={
                        handleClickCloseRegisterPopup
                    }
                />
            )}
        </>
    );
};

const CalendarWithStyled = styled.div``;

const YearMonthBlockWithStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-bottom: 20px;
`;

const YearMonthWithStyled = styled.div`
    margin: 0 20px;
    font-weight: bold;
`;

const PrevMonthWithStyled = styled.div`
    background: #808080;
    border-radius: 5px;
    color: white;
    width: 40px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
        transition: transform 300ms cubic-bezier(0.15, 0.85, 0.45, 1.75);
    }
`;

const NextMonthWithStyled = styled.div`
    background: #808080;
    border-radius: 5px;
    color: white;
    width: 40px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
        transition: transform 300ms cubic-bezier(0.15, 0.85, 0.45, 1.75);
    }
`;

const CalendarBlockWithStyled = styled.div``;

const TableWithStyled = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const HeaderWithStyled = styled.thead``;

const HeaderRowWithStyled = styled.tr``;

const HeaderColumnWithStyled = styled.th`
    width: 14%;
    border: 1px solid #808080;
    color: ${({ day }) =>
        day === "土" ? "blue" : day === "日" ? "red" : "black"};
`;

const BodyWithStyled = styled.tbody``;

const BodyRowWithStyled = styled.tr`
    height: 120px;
`;

const BodyColumnWithStyled = styled.td`
    width: 14%;
    border: 1px solid #808080;
    vertical-align: top;
    position: relative;
`;

export default Calendar;
