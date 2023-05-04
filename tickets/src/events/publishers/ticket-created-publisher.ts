import { Publisher, Subjects, TicketCreatedEvent } from "@mttickets2023/common";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
   readonly subject = Subjects.TicketCreated;
}