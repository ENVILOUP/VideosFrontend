import { Button } from "../ui/button";

interface VideoCategoryProps {
  name: string;
}

export default function VideoCategory({ name }: VideoCategoryProps) {
  return (
    <>
      <Button className="cursor-pointer" size={"sm"}>{name}</Button>
    </>
  );
}