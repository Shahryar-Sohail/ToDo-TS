
import { useState } from "react"

const Home = () => {

  type Card = {
    id: number;
    title: string;
    details: string;
  }

  const [cards, setCards] = useState<Card[]>([])
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [search, setSearch] = useState('')
  const [sortAsc, setSortAsc] = useState(false)


  const handleNew = () => {
    if (title === '' || details === '') {
      alert('Please fill in both fields')
      return
    }
    const newCard: Card = {
      id: Date.now(),
      title: title,
      details: details
    }
    setCards([...cards, newCard])
    setTitle('')
    setDetails('')
  }
  const handleDelete = (id: number) => {
    const updatedCards = cards.filter(card => card.id !== id)
    setCards(updatedCards)
  }
  const handleEdit = (id: number) => {
    const cardToEdit = cards.find(card => card.id === id)
    if (cardToEdit) {
      setTitle(cardToEdit.title)
      setDetails(cardToEdit.details)
      handleDelete(id) 
    }
  }

  const handleMoveUp = (id: number) => {
    const index = cards.findIndex(card => card.id === id)
    if (index <= 0) return

    const updated: Card[] = [...cards];

    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setCards(updated)
  }
  const handleMoveDown = (id: number) => {
    const index = cards.findIndex(card => card.id === id)
    if (index === -1 || index === cards.length - 1) return;

    const updated: Card[] = [...cards];

    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setCards(updated)
  }
  const handleSort = () => {
    const sortedCards = [...cards].sort((a, b) =>
      sortAsc ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
    );
    setCards(sortedCards);
    setSortAsc(!sortAsc);
  };


  return (
    <div className=" w-full sm:w-1/2 mx-auto border-4 border-black rounded-lg shadow-lg bg-teal-300">
      <div className=" bg-teal-300 flex justify-around items-center py-10">
        <h1 className="text-2xl text-teal-800 underline font-bold">TODO List </h1>
        <button onClick={handleNew} className="btn btn-solid btn-primary">+ New</button>
      </div>

      <div className="px-5 bg-teal-300 max-h-[70vh] overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-center py-10">
          <input id="title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-success" />
          <input id="details" type="text" placeholder="Todo Details" value={details} onChange={(e) => setDetails(e.target.value)} className="input input-warning my-5" />
        </div>
        <div className="flex justify-center items-center my-5 py-5">
          <input type="text" placeholder="Search Here" value={search} onChange={(e) => setSearch(e.target.value)} className="input input-lg w-4/5 mx-auto" />
          <button className="btn btn-solid btn-warning mx-2" onClick={handleSort}>
            Sort Cards</button>
        </div>
        {cards.filter((card) =>
          card.title.toLowerCase().includes(search.toLowerCase()) ||
          card.details.toLowerCase().includes(search.toLowerCase())
        ).map((card) => (
          <div key={card.id} className="card bg-black text-primary-content w-auto sm:w-96 my-5 mx-auto ">
            <div className="card-body">
              <h2 className="card-title">{card.title}</h2>
              <p>{card.details}</p>
              <div className="card-actions justify-end">
                <button className="btn" onClick={() => handleEdit(card.id)}>Edit</button>
                <button className="btn" onClick={() => handleDelete(card.id)}>Delete</button>
              </div>
            </div>
            <div className="flex justify-around items-center p-2">
              <button className="btn btn-success" onClick={() => handleMoveUp(card.id)}>Move Up /\</button>
              <button className="btn btn-error" onClick={() => handleMoveDown(card.id)}>Move Down \/</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}


export default Home
