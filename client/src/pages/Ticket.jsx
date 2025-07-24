import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useTicketServices } from "../services/api/useTicketServices";
import { useNoteServices } from "../services/api/useNoteServices";
import TicketDetails from "../components/TicketDetails";
import NoteSection from "../components/note/NoteSection";
import BackButton from "../components/BackButton";
import NoteForm from "@/components/note/NoteForm";
import { BetweenHorizontalStart, LogOutIcon, X } from "lucide-react";
import TicketClosureModal from "@/components/TicketClosureModal";

const Ticket = () => {
  const { ticketId } = useParams();
  const {
    viewTicket,
    updateTicketStatus,
    loading: ticketLoading,
  } = useTicketServices();
  const { createNote, viewNote, loading: noteLoading } = useNoteServices();

  const [ticket, setTicket] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showNoteForm, setShowNoteForm] = useState(false);

  // Memoized fetch functions to prevent infinite re-renders
  const fetchTicket = useCallback(async () => {
    if (!ticketId) return;

    const data = await viewTicket(ticketId);
    setTicket(data?.ticket || null);
  }, [ticketId, viewTicket]);

  const fetchNotes = useCallback(async () => {
    if (!ticketId) return;

    const data = await viewNote(ticketId);
    setNotes(data?.note || []);
  }, [ticketId, viewNote]);

  // Fetch ticket details - only depends on ticketId
  useEffect(() => {
    fetchTicket();
    fetchNotes();
  }, []);

  const handleNoteSubmit = async (noteContent) => {
    const formData = { content: noteContent };
    await createNote(formData, ticketId);
    await fetchNotes();
    setShowNoteForm(false);
  };

  const updateTicketStatusHandler = async () => {
    if (!ticketId) return;
    await updateTicketStatus(ticketId);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (ticketLoading || !ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading ticket details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showConfirmModal && (
        <TicketClosureModal
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={updateTicketStatusHandler}
        />
      )}
      <div className="min-h-screen pb-10">
        <div className="container mx-auto px-4 md:px-0 max-w-6xl">
          <BackButton />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TicketDetails ticket={ticket} />

              {/* Note Form */}
              {showNoteForm && (
                <div className="mt-4">
                  <NoteForm
                    onSubmit={handleNoteSubmit}
                    loading={noteLoading}
                    onCancel={() => setShowNoteForm(false)}
                  />
                </div>
              )}

              {ticket.status !== "closed" && (
                <div className="mt-3">
                  <button
                    onClick={() => setShowNoteForm(!showNoteForm)}
                    className="flex items-center gap-2 text-xs cursor-pointer font-Futura px-4 py-2 bg-rose-400 text-background rounded-md hover:bg-rose-500  transition-colors disabled:opacity-50 "
                  >
                    {showNoteForm ? (
                      <X strokeWidth={3} className="w-5 h-5" />
                    ) : (
                      <BetweenHorizontalStart
                        strokeWidth={3}
                        className="w-5 h-5"
                      />
                    )}
                    {showNoteForm ? "Cancel" : "Add Note"}
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <NoteSection notes={notes} loading={noteLoading} />
              <div className="flex flex-col items-center  justify-center mt-4 w-full">
                {ticket.status !== "closed" && (
                  <button
                    className="mb-6 px-3  py-2.5 shadow-2xl border border-border flex gap-2 items-center justify-center font-semibold  w-full rounded-lg text-xs bg-card   text-foreground hover:bg-rose-500 hover:text-black transition cursor-pointer"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    <LogOutIcon strokeWidth={3} size={16} />
                    Close ticket
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
