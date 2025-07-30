import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTicketServices } from "../services/api/useTicketServices";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Calendar, Package, UserCircle } from "lucide-react";
import BackButton from "@/components/BackButton";

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);
  const { viewTickets,loading } = useTicketServices();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await viewTickets();
      setTickets(data?.tickets || []);
    };
    fetchTickets();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: {
        variant: "default",
        className: "bg-green-100 text-green-800 hover:bg-green-200",
      },
      closed: {
        variant: "default",
        className: "bg-rose-500 text-black hover:bg-rose-600",
      },
    };

    const config = statusConfig[status] || statusConfig.open;

    return (
      <Badge variant={config.variant} className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleViewTicket = (id) => {
    navigate(`/ticket/${id}`);
  };
  if(loading){
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading tickets</p>
        </div>
      </div>
    )
  }

  return (
    <div className=" min-h-screen px-4 md:px-6  mt-2 pb-8 lg:px-15 ">
      <div className="">
        <BackButton redirectTo={"/"} />
      </div>
      <Card className={"bg-background text-foreground  border-none"}>
        <CardHeader className={"px-2 md:px-4"}>
          <CardTitle className="text-4xl font-bold">TICKETS</CardTitle>
          <CardDescription className={"px-1 text-xs"}>
            Total Tickets:{" "}
            <span className="text-green-600 font-Futura">{tickets.length}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className={" px-3 md:px-4  rounded-sm"}>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Title</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Description
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4" />
                      User
                    </div>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Product
                    </div>
                  </TableHead>
                  <TableHead className="hidden xl:table-cell">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Created
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket._id} className="hover:bg-muted/50  ">
                    <TableCell className="font-medium">
                      <div className="space-y-5">
                        <div className="font-semibold">{ticket.title}</div>
                        <div className="text-xs font-DMSans text-muted-foreground">
                          ID: {ticket._id.slice(-8)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="max-w-[300px]">
                        <p className="text-sm font-DMSans text-muted-foreground">
                          {truncateText(ticket.description)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="space-y-1">
                        <div className="font-medium text-sm">
                          {ticket.userId.fullname}
                        </div>
                        <div className="text-[10px] font-DMSans text-muted-foreground">
                          {ticket.userId.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant="outline" className="font-mono text-xs">
                        {ticket.product}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="text-xs font-semibold font-DMSans text-muted-foreground">
                        {formatDate(ticket.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-4 ">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewTicket(ticket._id)}
                          className="h-8 w-8 cursor-pointer"
                        >
                          {/* <Eye className="h-4 w-4" /> */}
                          <Badge
                            variant="outline"
                            className="font-mono text-xs px-2 py-1"
                          >
                            View
                          </Badge>
                          <span className="sr-only">View</span>
                        </Button>
                        {/* <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditTicket(ticket._id)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button> */}
                        {/* <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTicket(ticket._id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {tickets.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">No tickets found</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewTickets;
