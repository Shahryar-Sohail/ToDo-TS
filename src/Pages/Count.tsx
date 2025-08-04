import { useCardContext } from "./CardContext";

const Count = () => {
  const { cards } = useCardContext();
  return (
    <div className="text-xl text-center text-black my-2">
      Total Todos: {cards.length}
    </div>
  );
};

export default Count;
