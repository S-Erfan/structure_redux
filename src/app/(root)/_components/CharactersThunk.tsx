"use client";

import CardCharacter from "@/components/card/CardCharacter";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ICharacter, getListCharacters } from "@/redux/slices/characterSlice";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const CharactersThunk: FC = () => {
  const intObserver = useRef<IntersectionObserver | null>(null);

  const isError = useAppSelector((state) => state.characters.isError);
  const error = useAppSelector((state) => state.characters.error);
  const info = useAppSelector((state) => state.characters.info);
  const results = useAppSelector((state) => state.characters.results);
  const isLoading = useAppSelector((state) => state.characters.isLoading);
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  // const charactersMemoized = useMemo(() => results, [results]);

  const lastOrderRef = useCallback(
    (order: HTMLDivElement) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && info && !!info?.next) {
          setCurrentPage((prev) => prev + 1);
        }
      });

      if (order) intObserver.current.observe(order);
    },
    [isLoading, info]
  );

  // async function renderListController(page: number) {
  //   const data = await dispatch(getListCharacters({ page }));
  //   console.log(data, "data fetched");
  // }

  useEffect(() => {
    if (currentPage) {
      // renderListController(currentPage);

      dispatch(getListCharacters({ page: currentPage }));
    }
  }, [currentPage]);

  if (isError) {
    return (
      <>
        <div className="w-screen h-screen grid place-items-center text-2xl">
          Error: {JSON.stringify(error)}
        </div>
      </>
    );
  }

  if (!results.length && isLoading) {
    return (
      <>
        <div className="w-screen h-screen grid place-items-center text-2xl">
          Loading...
        </div>
      </>
    );
  }

  return (
    <section className="container mx-auto h-[70vh] overflow-hidden overflow-y-scroll">
      <div className="grid grid-cols-3 gap-4 ">
        {results && Array.isArray(results) && results.length !== 0
          ? results.map((character: any, index: number) =>
              index + 1 === results.length ? (
                <div key={character.id} ref={lastOrderRef} >
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

export default CharactersThunk;
