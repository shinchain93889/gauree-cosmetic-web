'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Service } from "@/lib/data";

interface AppointmentFormProps {
    service?: Service;
    onSubmit: (appointment: {
        service: Service;
        date: Date;
        time: string;
        name: string;
        email: string;
        phone: string;
    }) => void;
}

const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
    "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
];

export function AppointmentForm({ service, onSubmit }: AppointmentFormProps) {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState<string>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Show a different view when no service is selected
    if (!service) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Book Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Please select a service first to book an appointment.</p>
                </CardContent>
            </Card>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!service || !selectedDate || !selectedTime || !name || !email || !phone) {
            return;
        }

        onSubmit({
            service,
            date: selectedDate,
            time: selectedTime,
            name,
            email,
            phone
        });

        // Reset form
        setSelectedDate(undefined);
        setSelectedTime(undefined);
        setName("");
        setEmail("");
        setPhone("");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Book Appointment</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) =>
                                date < new Date() || // Can't select past dates
                                date.getDay() === 0 // Sunday closed
                            }
                            className="rounded-md border"
                        />
                    </div>

                    {selectedDate && (
                        <div className="space-y-2">
                            <Select value={selectedTime} onValueChange={setSelectedTime}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Input
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!service || !selectedDate || !selectedTime || !name || !email || !phone}
                    >
                        Book Appointment
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}