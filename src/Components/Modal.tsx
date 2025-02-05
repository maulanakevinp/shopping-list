"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import TextInput from "./TextInput";
import { useEffect, useRef, useState } from "react";
import { ItemType } from "../Types/ItemType";
import Cleave from "cleave.js/react";

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEdit: boolean;
  editIndex?: number | null;
  items: ItemType[];
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
};

export default function Modal(props: ModalProps) {
  const { open, setOpen, isEdit, editIndex, items, setItems } = props;
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        nameRef.current?.focus();
        if (isEdit && editIndex != null) {
          setTitle(items[editIndex].name);
          setPrice(items[editIndex].price);
        } else {
          setTitle("");
          setPrice(0);
        }
      }, 100);
    } else {
      setTitle("");
      setPrice(0);
      nameRef.current?.blur();
    }
  }, [open, isEdit, editIndex, items]);

  function handleSubmit() {
    const updatedItems = isEdit
      ? items.map((item, index) =>
          index === editIndex ? { ...item, name: title, price } : item
        )
      : [...items, { name: title, price, quantity: 1 }];

    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setOpen(false);
  }

  function handleRemoveItem() {
    const updatedItems = items.filter((_, index) => index !== editIndex);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel
            transition
            className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white dark:bg-gray-800 p-4">
              <DialogTitle
                as="h3"
                className="text-lg font-semibold text-gray-900 dark:text-white"
              >
                {isEdit ? "Ubah" : "Tambah"} Item
              </DialogTitle>
              <form className="mt-2">
                <input type="hidden" name="id" />
                <TextInput
                  ref={nameRef}
                  title="Item Belanja"
                  id="name"
                  className="mt-5"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Cleave
                  options={{ numeral: true, numeralThousandsGroupStyle: "thousand", numeralDecimalScale: 0, delimiter: ".", numeralDecimalMark: "," }}
                  title="Harga"
                  id="price"
                  className="mt-1 w-full text-end text-slate-900 dark:text-white rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-500 dark:bg-gray-700 py-2 px-3"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.rawValue))}
                />
              </form>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 py-3 flex flex-row-reverse px-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex justify-center rounded-md bg-blue-600 dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 dark:hover:bg-blue-400 ml-3 w-auto cursor-pointer"
              >
                {isEdit ? "Ubah" : "Tambah"} Item
              </button>
              {isEdit && (
                <button
                  type="button"
                  onClick={handleRemoveItem}
                  className="inline-flex justify-center rounded-md bg-red-600 dark:bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 dark:hover:bg-red-400 ml-3 w-auto cursor-pointer"
                >
                  Hapus Item
                </button>
              )}
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="inline-flex justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white ring-1 shadow-xs ring-gray-300 dark:ring-gray-600 ring-inset hover:bg-gray-50 dark:hover:bg-gray-600 mt-0 w-auto cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

