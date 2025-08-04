import { createContext, useContext } from "react"

export type Card = {
  id: number;
  title: string;
  details: string;
} 

type CardContextType = {
  cards: Card[];
}

export const CardContext = createContext<CardContextType | null>(null);

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) throw new Error("Error");
  return context;
}
