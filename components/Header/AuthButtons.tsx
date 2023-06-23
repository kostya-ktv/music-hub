import Button from "../Button";

const AuthButtons = () => {
  return (
    <div
      className="
              flex
              justify-between
              items-center
              gap-x-4"
    >
      <>
        <div>
          <Button
            onClick={() => {}}
            className="bg-transparent text-neutral-300 font-medium"
          >
            Sign Up
          </Button>
        </div>
        <div>
          <Button onClick={() => {}} className="bg-white px-6 py-2">
            Log in
          </Button>
        </div>
      </>
    </div>
  );
};
export default AuthButtons;
