import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import moment from "moment";

import {
    Default as DefaultButton,
    Primary as PrimaryButton,
} from "@atoms/Buttons";

const RegisterPopup = ({
    year,
    month,
    day,
    handleClickCloseRegisterPopup,
    ...props
}) => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputMemo, setInputMemo] = useState("");

    const handleInputTitle = (e) => {
        setInputTitle(e);
    };

    const handleInputMemo = (e) => {
        setInputMemo(e);
    };

    return (
        <RegisterPopupWithStyled>
            <PopupWithStyled>
                <PopupTitleWithStyled>スケジュール登録</PopupTitleWithStyled>
                <PopupBodyWithStyled>
                    <RowWithStyled>
                        <LeftWithStyled>予定日</LeftWithStyled>
                        <RightWithStyled>
                            {year + "年" + month + "月" + day + "日"}
                        </RightWithStyled>
                    </RowWithStyled>

                    <RowWithStyled>
                        <LeftWithStyled>タイトル</LeftWithStyled>
                        <RightWithStyled>
                            <TextWithStyled
                                value={inputTitle}
                                onChange={(value) => handleInputTitle(value)}
                            />
                        </RightWithStyled>
                    </RowWithStyled>

                    <RowWithStyled>
                        <LeftWithStyled>メモ</LeftWithStyled>
                        <RightWithStyled>
                            <TextareaWithStyled
                                value={inputMemo}
                                onChange={({ target: { value } }) =>
                                    handleInputMemo(value)
                                }
                            />
                        </RightWithStyled>
                    </RowWithStyled>

                    <ButtonBlockWithStyled>
                        <PrimaryButtonWithStyled>
                            登録する
                        </PrimaryButtonWithStyled>
                        <DefaultButtonWithStyled
                            onClick={() => handleClickCloseRegisterPopup()}
                        >
                            閉じる
                        </DefaultButtonWithStyled>
                    </ButtonBlockWithStyled>
                </PopupBodyWithStyled>
            </PopupWithStyled>
        </RegisterPopupWithStyled>
    );
};

const RegisterPopupWithStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;
`;

const PopupWithStyled = styled.div`
    z-index: 2;
    width: 50%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.08);
    width: 480px;
`;

const PopupTitleWithStyled = styled.div`
    background: #808080;
    text-align: center;
    padding: 10px 0;
    color: white;
    font-weight: bold;
    font-size: 20px;
`;

const PopupBodyWithStyled = styled.div`
    padding: 40px;
    font-size: 16px;
`;

const ButtonBlockWithStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PrimaryButtonWithStyled = styled(PrimaryButton)`
    width: 150px;
    margin: 0 10px;
`;

const DefaultButtonWithStyled = styled(DefaultButton)`
    width: 150px;
    margin: 0 10px;
`;

const RowWithStyled = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`;

const LeftWithStyled = styled.div`
    width: 100px;
    font-weight: bold;
`;

const RightWithStyled = styled.div`
    font-weight: bold;
`;

const TextWithStyled = styled.div`
    display: inline-block;
    width: 300px;
    margin: 0px;
`;

const TextareaWithStyled = styled.textarea`
    display: inline-block;
    width: 300px;
    margin: 0px;
    border: solid 2px #424242;
    border-radius: 20px;
    background-color: #ffffff;
    padding: 5px 35px 5px 15px;
    font-size: 110%;
    font-weight: 600;
    resize: none;
`;

export default RegisterPopup;
