import { Board } from "@/components/board";

export default function Home() {
  return (
    <>
      <Board rows={8} columns={8} mines={10} />
    </>
  );
}
