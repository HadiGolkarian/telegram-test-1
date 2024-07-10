"use client";
import anime from "animejs/lib/anime.es.js";
import { MouseEventHandler, TouchEventHandler, useRef } from "react";

const COIN_ROTATION_THRESHOLD = 50;

export default function Home() {
  const imageRef = useRef(null);

  const handleTouch: React.TouchEventHandler<HTMLImageElement> = (event) => {
    const {
      touches,
      currentTarget: { clientWidth, clientHeight, offsetLeft, offsetTop },
    } = event;

    const { clientX, clientY } = touches[0];
    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;

    const rotateX = +(
      COIN_ROTATION_THRESHOLD / 2 -
      horizontal * COIN_ROTATION_THRESHOLD
    ).toFixed(2);
    const rotateY =
      +(
        vertical * COIN_ROTATION_THRESHOLD -
        COIN_ROTATION_THRESHOLD / 2
      ).toFixed(2) * (vertical < 0.5 ? -1 : 1);

    anime({
      targets: imageRef.current,
      rotateX: `${rotateY}deg`,
      rotateY: `${rotateX}deg`,
      perspective: `${clientWidth}px`,
      duration: 100,
      easing: "easeInOutQuad",
      complete: () => {
        anime({
          targets: imageRef.current,
          rotateX: 0,
          rotateY: 0,
          duration: 100,
          easing: "easeInOutQuad",
        });
      },
    });
  };

  //   const handleClick: MouseEventHandler<HTMLImageElement> = ({
  //     clientX,
  //     clientY,
  //     currentTarget: { clientWidth, clientHeight, offsetLeft, offsetTop },
  //   }) => {
  //     const horizontal = (clientX - offsetLeft) / clientWidth;
  //     const vertical = (clientY - offsetTop) / clientHeight;

  //     const rotateX = +(
  //       COIN_ROTATION_THRESHOLD / 2 -
  //       horizontal * COIN_ROTATION_THRESHOLD
  //     ).toFixed(2);
  //     const rotateY = +(
  //       vertical * COIN_ROTATION_THRESHOLD -
  //       COIN_ROTATION_THRESHOLD / 2
  //     ).toFixed(2);

  //     console.log(
  //       `horizontal: ${horizontal},
  // vertical: ${vertical},
  // rotateX: ${rotateX},
  // rotateY: ${rotateY},`
  //     );

  //     anime({
  //       targets: imageRef.current,
  //       rotateX: `${rotateY}deg`,
  //       rotateY: `${rotateX}deg`,
  //       // perspective: `${clientWidth}px`,
  //       duration: 100,
  //       easing: "easeInOutQuad",
  //       complete: () => {
  //         anime({
  //           targets: imageRef.current,
  //           rotateX: 0,
  //           rotateY: 0,
  //           duration: 100,
  //           easing: "easeInOutQuad",
  //         });
  //       },
  //     });
  //   };

  const handleClick: MouseEventHandler<HTMLImageElement> = ({
    clientX,
    clientY,
    currentTarget: { clientWidth, clientHeight, offsetLeft, offsetTop },
  }) => {
    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;

    const rotateX = (
      COIN_ROTATION_THRESHOLD / 2 -
      horizontal * COIN_ROTATION_THRESHOLD
    ).toFixed(2);
    const rotateY = (
      vertical * COIN_ROTATION_THRESHOLD -
      COIN_ROTATION_THRESHOLD / 2
    ).toFixed(2);

    imageRef.current.style.transform = `perspective(${clientWidth}px) scale3d(1, 1, 1)`;

    anime({
      targets: imageRef.current,
      rotateX: rotateY,
      rotateY: rotateX,
      perspective: clientWidth,
      duration: 100,
      easing: "easeInOutQuad",
      complete: () => {
        anime({
          targets: imageRef.current,
          rotateX: 0,
          rotateY: 0,
          duration: 100,
          easing: "easeInOutQuad",
        });
      },
    });
  };

  const handleTouchStart: TouchEventHandler<HTMLImageElement> = ({
    touches,
    currentTarget: { clientWidth, clientHeight, offsetLeft, offsetTop },
  }) => {
    if (touches.length !== 1) return;

    const { clientX, clientY } = touches[0];

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;

    const rotateX = -(
      COIN_ROTATION_THRESHOLD / 2 -
      horizontal * COIN_ROTATION_THRESHOLD
    ).toFixed(2);
    const rotateY = -(
      vertical * COIN_ROTATION_THRESHOLD -
      COIN_ROTATION_THRESHOLD / 2
    ).toFixed(2);

    imageRef.current.style.transform = `perspective(${clientWidth}px) scale3d(1, 1, 1)`;

    anime({
      targets: imageRef.current,
      rotateX: rotateY,
      rotateY: rotateX,
      perspective: clientWidth,
      duration: 100,
      easing: "easeInOutQuad",
      complete: () => {
        anime({
          targets: imageRef.current,
          rotateX: 0,
          rotateY: 0,
          duration: 100,
          easing: "easeInOutQuad",
        });
      },
    });
  };

  return (
    <>
      <div
        className="h-full"
        onTouchStart={handleTouchStart}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      >
        <div className="max-w-96 mx-auto mt-40">
          <img
            src="/images/coin.png"
            alt="coin"
            className="select-none coin"
            ref={imageRef}
            style={{
              transform: "scale3d(1,1,1)",
            }}
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}
