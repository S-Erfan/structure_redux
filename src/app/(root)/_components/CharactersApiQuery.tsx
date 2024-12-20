"use client";

import CardCharacter from "@/components/card/CardCharacter";
import { useGetCharactersQuery } from "@/redux/apiSlices/characterApi";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";

interface IProps {
  // any props
}

const CharactersApiQuery: FC<IProps> = () => {
  const intObserver = useRef<IntersectionObserver | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isFetching } = useGetCharactersQuery({
    page: currentPage,
  });

  // Handle scroll event
  const lastOrderRef = useCallback(
    (order: HTMLDivElement) => {
      if (isFetching) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !!data?.info?.next) {
          setCurrentPage((prev) => prev + 1);
        }
      });

      if (order) intObserver.current.observe(order);
    },
    [isFetching, data?.info?.next]
  );

  if (isFetching && !data)
    return (
      <div className="w-screen h-screen grid place-items-center text-2xl">
        Loading...
      </div>
    );

  return (
    <section className="container mx-auto h-[70vh] overflow-hidden overflow-y-scroll">
      <div className="grid grid-cols-3 gap-4 ">
        {data && Array.isArray(data?.results) && data.results.length
          ? data.results.map((character: any, index: number) =>
              index + 1 === data.results.length ? (
                <div key={character.id} ref={lastOrderRef}>
                  <CardCharacter
                    gender={character.gender}
                    name={character.name}
                    src={character.image}
                  />
                </div>
              ) : (
                <div key={character.id}>
                  <CardCharacter
                    gender={character.gender}
                    name={character.name}
                    src={character.image}
                  />
                </div>
              )
            )
          : "No characters found"}
      </div>
    </section>
  );
};

export default CharactersApiQuery;
