import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTicketServices } from "../services/api/useTicketServices";
import { validateTicketFormData } from "../utils/validations";
import { Ticket } from "lucide-react";
import BackButton from "@/components/BackButton";
import { infoToast } from "@/services/Toast";
const INITIAL_FORM_DATA = {
  title: "",
  product: "",
  description: "",
};
const CreateTicket = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [error, setError] = useState("");

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { createTicket } = useTicketServices();
  const submitHandler = async (e) => {
    e.preventDefault();

    const validationError = validateTicketFormData(formData);
    if (validationError) return setError(validationError);
    setError("");

    const response = await createTicket(formData);

    const ticketId = response?.data?.ticket?._id;
    if (ticketId) copyToClipboard(ticketId);

    setFormData(INITIAL_FORM_DATA);
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("Ticket ID copied to clipboard!");
        })
        .then(() => {
          infoToast("Ticket ID copied to clipboard!");
        });
    }
  };

  return (
    <div className="w-full min-h-[90vh] flex pb-4 md:pb-4 items-end md:items-center  justify-center">
      <div className="p-4 md:p-8 w-full md:w-[70%] rounded-xl">
        <BackButton redirectTo={"/"} />
        <h2 className="text-3xl px-3 md:text-4xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <Ticket className="w-10 h-10 " />
          Create a Ticket
        </h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChanges}
            className="input-field"
          />

          <select
            name="product"
            value={formData.product}
            onChange={handleChanges}
            className="input-field"
          >
            <option className="bg-background rounded-full" value="">
              Select a Product
            </option>
            <option className="bg-background rounded-full" value="AirBook">
              AirBook
            </option>
            <option className="bg-background rounded-full" value="Mac M4">
              Mac M4
            </option>
            <option className="bg-background rounded-full" value="iPhone 14">
              iPhone 14
            </option>
            <option className="bg-background rounded-full" value="iPhone 15">
              iPhone 15
            </option>
            <option className="bg-background rounded-full" value="iPhone 16">
              iPhone 16
            </option>
          </select>

          <textarea
            name="description"
            placeholder="Description of the issue"
            value={formData.description}
            onChange={handleChanges}
            className="input-field"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            type="submit"
            className="auth-button"
          >
            Create Ticket →
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
