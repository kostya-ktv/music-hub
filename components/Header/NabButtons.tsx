import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";

const NavButtons = () => {
  const router = useRouter();

  return (
    <>
      <div
        className="hidden
              md:flex
              gap-x-2
              items-center"
      >
        <button
          onClick={() => router.back()}
          className="
          rounded-full
          bg-black
          flex
          items-center
          justify-center
          hover:opacity-75
          transition"
        >
          <RxCaretLeft className="text-white" size={35} />
        </button>
        <button
          onClick={() => router.forward()}
          className="
          rounded-full
          bg-black
          flex
          items-center
          justify-center
          hover:opacity-75
          transition"
        >
          <RxCaretRight className="text-white" size={35} />
        </button>
      </div>
      <div className="flex md:hidden gap-x-2 items-center">
        <button
          className="
          rounded-full
          p-2
          bg-white
          flex
          justify-center
          hover:opacity-75
          transition
          items-center"
        >
          <HiHome className="text-black" size={20} />
        </button>
        <button
          className="
          rounded-full
          p-2
          bg-white
          flex
          justify-center
          hover:opacity-75
          transition
          items-center"
        >
          <BiSearch className="text-black" size={20} />
        </button>
      </div>
    </>
  );
};
export default NavButtons;
