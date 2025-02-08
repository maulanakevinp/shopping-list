import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./Components/Modal";
import DarkModeIcon from "./Components/Icons/DarkModeIcon";
import LightModeIcon from "./Components/Icons/LightModeIcon";
import { ItemType } from "./Types/ItemType";
import AddIcon from "./Components/Icons/AddIcon";
import EditIcon from "./Components/Icons/EditIcon";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<ItemType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [IsEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsDarkMode(localStorage.getItem("theme") === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "+") {
        setOpenModal(true);
        setIsEdit(false);
        setEditIndex(null);
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);

  function handleDarkMode() {
    const darkMode = !isDarkMode;
    setIsDarkMode(darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) setItems(JSON.parse(storedItems));
  }, []);

  useEffect(() => {
    setTotal(items.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }, [items]);

  function handleIncreaseQuantity (key: number) {
    const newItems = items.map((item, index) => {
      if (index === key) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };

  function handleDecreaseQuantity (key: number) {
    const newItems = items.map((item, index) =>
      index === key ? { ...item, quantity: item.quantity - 1 } : item
    );

    const filteredItems = newItems.filter((item) => item.quantity > 0);
    setItems(filteredItems);
    localStorage.setItem("items", JSON.stringify(filteredItems));
  };

  function handleButtonAddItem () {
    setIsEdit(false);
    setOpenModal(true);
    setEditIndex(null);
  }

  function handleButtonEditItem (key: number) {
    setIsEdit(true);
    setOpenModal(true);
    setEditIndex(key);
  }

  return (
    <div className="mb-40">
      <div className="max-w-lg mx-auto p-5">
        <h1 className="text-xl font-bold uppercase text-center">
          Kalkulator Daftar Belanja
        </h1>
        <div className="mt-5">
          <ul className="">
            {items.map((item: ItemType, key) => (
              <li key={key} className="flex justify-between py-2 border-b">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleButtonEditItem(key)}
                    className="mr-3 cursor-pointer hover:text-blue-500"
                  >
                    <EditIcon />
                  </button>
                  <div>
                    <span>{item.name}</span>
                    <div>
                      <span>
                        {Intl.NumberFormat("id-ID", {
                          minimumFractionDigits: 0,
                        }).format(item.price)}
                      </span>
                      <span className="mx-5">x</span>
                      <button
                        type="button"
                        onClick={() => handleDecreaseQuantity(key)}
                        className="px-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleIncreaseQuantity(key)}
                        className="px-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-lg">
                  {Intl.NumberFormat("id-ID", {
                    minimumFractionDigits: 0,
                  }).format(item.price * item.quantity)}
                </div>
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold text-end">
            Total:{" "}
            {Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(
              total
            )}
          </p>
        </div>
      </div>
      <button
        className="fixed bottom-25 right-5 w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
        type="button"
        onClick={handleDarkMode}
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </button>
      <button
        className="fixed bottom-5 right-5 w-16 h-16 bg-blue-900 dark:bg-blue-600 text-white rounded-full cursor-pointer flex items-center justify-center hover:bg-blue-800"
        type="button"
        onClick={handleButtonAddItem}
      >
        <AddIcon />
      </button>
      <Modal
        open={openModal}
        isEdit={IsEdit}
        editIndex={editIndex}
        items={items}
        setItems={setItems}
        setOpen={() => setOpenModal(!openModal)}
      />
    </div>
  );
}

export default App;

