import { useAppSelector } from "./hooks/redux";

const Status = () => {
  const currentStatus = useAppSelector((state) => state.app.status);

  return (
    <section>
      <p>{currentStatus}</p>
    </section>
  );
};

export default Status;