import Image from "next/image";
import Link from "next/link";

export default function EnviloupLink() {
  return (
    <>
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="enviloup" width={50} height={50} />
        <div className="text-2xl">Enviloup</div>
      </Link>
    </>
  );
}
