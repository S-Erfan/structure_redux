import Image from "next/image";
import React, { FC } from "react";

interface ICardComponent {
  name: string;
  src: string;
  gender: string;
}

const CardCharacter: FC<ICardComponent> = ({ gender, name, src }) => {
  return (
    <>
      <div className="w-full overflow-hidden flex flex-col rounded-md shadow-lg ">
        <Image
          alt={name}
          src={src}
          width={1000}
          height={1000}
          className="object-cover w-full aspect-square"
        />
        <div className="px-2 py-4 flex flex-col gap-1">
          <div>{name}</div>
          <div>gender : {gender}</div>
        </div>
      </div>
    </>
  );
};

export default CardCharacter;
