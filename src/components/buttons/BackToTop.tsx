import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';

type BackToTopAnimation = Readonly<{
    isSlideIn: boolean;
}>;

const BackToTop = ({ isScroll }: Readonly<{ isScroll: boolean }>) => {
    const [state, setState] = React.useState({
        isAnimate: isScroll,
        isLoad: isScroll,
    });

    React.useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            isAnimate: isScroll,
        }));
        setTimeout(
            () =>
                setState((prevState) => ({
                    ...prevState,
                    isLoad: isScroll,
                })),
            isScroll ? 0 : 350
        );
    }, [isScroll]);

    const { isAnimate, isLoad } = state;

    return !isLoad ? null : (
        <BackToTopContainer>
            <ArrowUpContainer
                isSlideIn={isAnimate}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <ArrowUp />
            </ArrowUpContainer>
        </BackToTopContainer>
    );
};

const BackToTopContainer = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1;
`;

const FadeOut = keyframes`
    0% {
        opacity:1;
        transform: scale(1);
    }
    100% {
        opacity:0;
        transform: scale(0.9);
    }
`;

const FadeIn = keyframes`
    0% {
        opacity:0;
        transform: scale(0.9);
    }
    100% {
        opacity:1;
        transform: scale(1);
    }
`;

const ArrowUpContainer = styled.div`
    border-radius: 50%;
    background-color: ${({ theme }) => theme.secondaryColor};
    padding: 15px;
    margin: 10px;
    animation: ${({ isSlideIn }: BackToTopAnimation) =>
            isSlideIn ? FadeIn : FadeOut}
        ease 0.5s;
    -moz-animation: ${({ isSlideIn }: BackToTopAnimation) =>
            isSlideIn ? FadeIn : FadeOut}
        ease 0.5s;
    -webkit-animation: ${({ isSlideIn }: BackToTopAnimation) =>
            isSlideIn ? FadeIn : FadeOut}
        ease 0.5s;
    -o-animation: ${({ isSlideIn }: BackToTopAnimation) =>
            isSlideIn ? FadeIn : FadeOut}
        ease 0.5s;
    -ms-animation: ${({ isSlideIn }: BackToTopAnimation) =>
            isSlideIn ? FadeIn : FadeOut}
        ease 0.5s;
    &:hover {
        cursor: pointer;
        transition: 0.1s ease all;
    }
    &:active {
        transform: scale(1.25);
    }
    &:focus {
        outline: none;
    }
`;

const ArrowUp = styled(FaArrowUp)`
    font-size: 1.5em !important;
    color: ${({ theme }) => theme.primaryColor} !important;
`;

export default BackToTop;
