import mongoose, {Schema} from 'mongoose'

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
{
    title: String,
    description: String,
    priority: Number,
    progress: Number,
    status: String,
    receiveNotifications: Boolean,
}
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;