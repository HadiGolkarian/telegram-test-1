"use client";
import anime from "animejs/lib/anime.es.js";
import { MouseEventHandler, TouchEventHandler, useRef, useState } from "react";

const COIN_ROTATION_THRESHOLD = 50;

export default function Home() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [numberPosition, setNumberPosition] = useState<
    {
      x: number;
      y: number;
      id: number;
    }[]
  >([]);

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

    imageRef.current!.style.transform = `perspective(${clientWidth}px) scale3d(1, 1, 1)`;

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
    const newTouches: {
      x: number;
      y: number;
      id: number;
    }[] = [];

    for (let i = 0; i < touches.length; i++) {
      const { clientX, clientY } = touches[i];

      newTouches.push({
        id: numberPosition.length + 1 + i,
        x: clientX,
        y: clientY,
      });

      setTimeout(() => {
        anime({
          targets: `#reward-${numberPosition.length + 1 + i}`,
          translateY: -150,
          opacity: 0,
          duration: 1000,
          easing: "easeInOutQuad",
          complete: function (anim) {
            anim.animatables.forEach((animatable) => {
              animatable.target.remove();
            });
          },
        });
      }, 0);
    }

    setNumberPosition([...numberPosition, ...newTouches]);

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

    imageRef.current!.style.transform = `perspective(${clientWidth}px) scale3d(1, 1, 1)`;

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
        className="h-full lg:p-40 p-10 md:p-20 relative"
        onTouchStart={handleTouchStart}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      >
        <img
          src="/images/coin.png"
          alt="coin"
          className="select-none coin w-full"
          ref={imageRef}
          style={{
            transform: "scale3d(1,1,1)",
          }}
          draggable={false}
        />
        {numberPosition.map((position) => (
          <div
            key={position.id}
            id={`reward-${position.id}`}
            className="number-animation"
            style={{
              position: "absolute",
              fontSize: 40,
              color: "white",
              left: position.x,
              top: position.y,
              backgroundColor: "transparent",
              zIndex: 10, // Ensure it's above other content
            }}
          >
            +1
          </div>
        ))}
      </div>
    </>
  );
}
