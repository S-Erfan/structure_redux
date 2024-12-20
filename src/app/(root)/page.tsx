"use client";
import CharactersApiQuery from "./_components/CharactersApiQuery";
// import CharactersThunk from "./_components/CharactersThunk";

export default function Home() {
  return (
    <>
      <CharactersApiQuery />
      {/* <CharactersThunk /> */}
    </>
  );
}
