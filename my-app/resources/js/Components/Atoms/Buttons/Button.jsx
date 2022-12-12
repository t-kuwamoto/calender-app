import React, { useCallback } from "react";
import { Icon, Spinner } from "@blueprintjs/core";
import styled from "styled-components";
import { withRouter } from "react-router";

const Button = ({
    children,
    text,
    icon,
    rightIcon,
    fill,
    loading,
    disabled,
    to,
    onClick,
    history,
    ...props
}) => {
    const handleClick = useCallback(
        (e) => {
            if (!disabled) {
                if (onClick) {
                    onClick(e);
                } else if (to) {
                    history.push(to);
                }
            }
        },
        [to, onClick, disabled]
    );

    const buttonProps = {
        isLoading: loading,
        isDisabled: disabled,
        isFillable: fill,
        onClick: handleClick,
    };

    return (
        <ButtonWithStyled {...props} {...buttonProps}>
            {icon && <Icon icon={icon} style={styles.leftIcon} />}
            <span>{text ?? children}</span>
            {rightIcon && <Icon icon={rightIcon} style={styles.rightIcon} />}
            {loading && (
                <LoadingWithStyled>
                    <Spinner intent={"success"} size={25} />
                </LoadingWithStyled>
            )}
        </ButtonWithStyled>
    );
};

const ButtonWithStyled = styled.button`
    width: ${({ isFillable }) => (isFillable ? "100%" : "auto")};
    user-select: none;
    position: relative;
    font-weight: bold;
    line-height : initial;
    box-sizing: border-box;
    border-radius : 22px;
    border-width : 0px;
    padding : 10px 20px;
    cursor: pointer;

    opacity : ${({ isDisabled, isLoading }) =>
        isDisabled || isLoading ? ".5" : "1"};
    color : ${({ textColor }) => {
        let { h, s, l } = textColor || { h: 0, s: 0, l: 1 };
        return `hsl(${h}, ${s * 100}%, ${l * 100}%);`;
    }}
    background-color : ${({ backgroundColor }) => {
        const { h, s, l, a } = {
            ...{ ...{ h: 0, s: 0, l: 0.25, a: 1 }, ...backgroundColor },
        };
        return `hsla(${h}, ${s * 100}%, ${l * 100}%, ${a});`;
    }}
    & .bp3-icon {
        vertical-align: middle;
        margin-right: 5px;
    }

    transform : scale(1);
    transition: transform 200ms;

    ${({ isDisabled, isLoading }) =>
        !isDisabled &&
        !isLoading &&
        `
        &:hover {
            transform : scale(1.1);
            transition: transform 300ms cubic-bezier(.15, .85, .45, 1.75);
        }
    `}
`;

const LoadingWithStyled = styled.div`
    position: absolute;
    left: calc(50% - 12.5px);
    top: calc(50% - 12.5px);
`;

const styles = {
    leftIcon: {
        marginRight: "10px",
    },
    rightIcon: {
        position: "absolute",
        right: "10px",
    },
};

export default Button;
