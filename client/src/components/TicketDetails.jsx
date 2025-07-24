import {
  Calendar,
  ChartNoAxesGantt,
  FlagTriangleRight,
  ListCollapse,
  LoaderCircle,
  LoaderPinwheel,
  PackageSearch,
  Timer,
  User,
  UserCircle,
} from "lucide-react";
import React from "react";

const TicketDetails = ({ ticket }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "text-emerald-500";
      case "closed":
        return "text-red-500";
      case "in-progress":
        return "text-yellow-500";
      default:
        return "text-blue-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return <LoaderCircle strokeWidth={5} className="text-emerald-500" />;
      case "closed":
        return <LoaderPinwheel strokeWidth={3} className="text-rose-500" />;
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="mb-6">
        <h1 className="text-2xl flex items-center sm:text-3xl font-bold text-foreground leading-tight">
          <ChartNoAxesGantt strokeWidth={3} className="w-5 h-5" />
          {ticket?.title}
        </h1>
        <span className="text-[10px] px-1 text-muted-foreground font-semibold">
          • {ticket?._id}
        </span>

        <div className="flex flex-wrap mt-4 font-medium items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center  gap-1">
            <Calendar className="w-4 h-4" stroke="teal" strokeWidth={3} />

            <span>
              Created: {new Date(ticket?.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Timer className="w-4 h-4" stroke="teal" strokeWidth={3} />
            <span>{new Date(ticket?.createdAt).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Ticket Information */}
      <div className="space-y-6">
        {/* Status and Product */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="font-medium text-muted-foreground font-Futura">
                <span>{getStatusIcon(ticket?.status)}</span>
                Status
              </span>
            </div>
            <p
              className={`text-lg font-semibold capitalize mt-1 font-mono ${getStatusColor(
                ticket?.status
              )}`}
            >
              {ticket?.status}
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="font-medium text-muted-foreground font-Futura">
                <PackageSearch strokeWidth={3} />
                Product
              </span>
            </div>
            <p className="text-lg font-mono font-semibold mt-1">
              {ticket?.product}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ListCollapse
              strokeWidth={3}
              className="text-muted-foreground w-5 h-5"
            />
            <span className="font-semibold font-Futura text-muted-foreground">
              Description
            </span>
          </div>
          <div className="bg-muted text-foreground p-5 rounded-xl border border-border">
            <p className="font-mono leading-relaxed whitespace-pre-wrap">
              {ticket?.description}
            </p>
          </div>
        </div>

        {/* Submitted By */}
        <div className="px-1">
          <div className="flex  items-center gap-2 ">
            <span className="font-semibold font-Futura text-muted-foreground">
              <UserCircle
                strokeWidth={3}
                className="text-muted-foreground w-6 h-6"
              />
              User
            </span>
          </div>
          <div>
            <p className="font-bold font-mono text-foreground">
              {ticket?.userId?.fullname}
            </p>
            <p className="text-muted-foreground text-[10px]">
              {ticket?.userId?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
