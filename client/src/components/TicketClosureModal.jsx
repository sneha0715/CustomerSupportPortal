const TicketClosureModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4 text-foreground">
          Confirm Ticket Closure
        </h2>
        <p className="text-sm font-medium font-mono text-muted-foreground mb-6">
          Are you sure you want to close this ticket? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded-md text-sm bg-card hover:bg-accent  transition cursor-pointer "
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md text-sm font-semibold bg-rose-400 text-black hover:bg-rose-600 transition cursor-pointer"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketClosureModal;
