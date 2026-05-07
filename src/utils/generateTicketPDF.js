import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import transitlyLogo from '../assets/transitly.png';

const generateTicketPDF = async (booking, userDetails) => {
    try {
        const doc = new jsPDF({
            compress: true
        });
        const pageWidth  = doc.internal.pageSize.getWidth();
        const margin     = 15;
        const tableWidth = pageWidth - 2 * margin;
        let   y          = 15;

        const logoW = 70;
        const logoH = 20;
        doc.addImage(transitlyLogo, 'PNG', margin, y, logoW, logoH, undefined, 'FAST');

        doc.setFont('lora', 'italic');
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);
        doc.text(
            'Seamless Ticket Booking & Management - Your Bookings Redefined',
            margin, y + logoH + 5
        );

        const rx = pageWidth - margin;
        doc.setFont('lora', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text('contact@transitly.com',               rx, y + 5,  { align: 'right' });
        doc.text('Road 01, Building 123, Banani Dhaka',  rx, y + 11, { align: 'right' });
        doc.text('+880 123456789',                       rx, y + 17, { align: 'right' });

        y += logoH + 14;

        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 10;

        doc.setFont('lora', 'bold');
        doc.setFontSize(15);
        doc.setTextColor(0, 0, 0);
        doc.text('TICKET INVOICE', pageWidth / 2, y, { align: 'center' });
        y += 12;

        const drawRow = (cells, widths, rowH, isHeader = false) => {
            const fill = isHeader ? [245, 245, 245] : [255, 255, 255];
            const lineH = (doc.getLineHeightFactor() * 8) / doc.internal.scaleFactor;

            let x = margin;
            cells.forEach((_, i) => {
                doc.setFillColor(fill[0], fill[1], fill[2]);
                doc.rect(x, y, widths[i], rowH, 'F');
                x += widths[i];
            });

            doc.setDrawColor(180, 180, 180);
            x = margin;
            cells.forEach((_, i) => {
                doc.rect(x, y, widths[i], rowH, 'S');
                x += widths[i];
            });

            doc.setFont('lora', isHeader ? 'bold' : 'normal');
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            x = margin;
            cells.forEach((cell, i) => {
                const w     = widths[i];
                const lines = doc.splitTextToSize(String(cell ?? ''), w - 4);
                const blockH = lineH * lines.length;
                let   ty    = y + (rowH - blockH) / 2 + lineH * 0.72;
                lines.forEach(line => {
                    if (ty < y + rowH - 1) doc.text(line, x + 2, ty);
                    ty += lineH;
                });
                x += w;
            });

            y += rowH;
        };

        doc.setFont('lora', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('CUSTOMER DETAILS', margin, y);
        y += 6;

        const col1W = 65;
        const col2W = tableWidth - col1W;
        const rowH  = 8;

        const customerRows = [
            ['Name',     userDetails?.name  || 'N/A'],
            ['Email',    userDetails?.email || booking?.userEmail || 'N/A'],
            ['Phone No', userDetails?.phone || 'N/A'],
        ];

        customerRows.forEach(([label, value]) => {
            doc.setFillColor(255, 255, 255);
            doc.rect(margin,        y, col1W, rowH, 'F');
            doc.setFillColor(255, 255, 255);
            doc.rect(margin + col1W, y, col2W, rowH, 'F');

            doc.setDrawColor(180, 180, 180);
            doc.rect(margin,        y, col1W, rowH, 'S');
            doc.rect(margin + col1W, y, col2W, rowH, 'S');

            doc.setFont('lora', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(label, margin + 3,        y + rowH / 2 + 1);
            doc.setFont('lora', 'normal');
            doc.text(value, margin + col1W + 3, y + rowH / 2 + 1);

            y += rowH;
        });

        y += 9;

        doc.setFont('lora', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('JOURNEY DETAILS', margin, y);
        y += 6;

        const ticket  = booking.ticket;
        const depDT   = new Date(ticket.departureDateTime);
        const depDate = !isNaN(depDT.getTime()) ? depDT.toISOString().split('T')[0] : 'N/A';
        const depTime = !isNaN(depDT.getTime()) ? depDT.toTimeString().substring(0, 5) : 'N/A';

        const tktW = [35, 22, 22, 28, 20, 20, 20, 13];

        drawRow(
            ['Ticket Name','Departure','Destination','Dep. Date & Time',
             'Bus Name','Bus Type','Bus Brand','Qty'],
            tktW, 9, true
        );
        drawRow([
            ticket.ticketTitle   || 'N/A',
            ticket.from          || 'N/A',
            ticket.to            || 'N/A',
            `${depDate} ${depTime}`,
            ticket.busCompany    || 'N/A',
            ticket.transportType || 'N/A',
            ticket.busBrand      || 'N/A',
            String(booking.quantity || 1),
        ], tktW, 14);

        y += 9;

        doc.setFont('lora', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('PAYMENT DETAILS', margin, y);
        y += 6;

        const payDate    = new Date(booking.paymentDate || booking.updatedAt);
        const payDateStr = !isNaN(payDate.getTime()) ? payDate.toISOString().split('T')[0] : 'N/A';
        const payTimeStr = !isNaN(payDate.getTime()) ? payDate.toTimeString().substring(0, 5) : 'N/A';

        const payW = [25, 27, 27, 25, 27, 27, 22];

        drawRow(
            ['Ticket ID','Ticket Price','Processing Fee','Discount',
             'Total Fee','Payment Method','Payment Date'],
            payW, 9, true
        );
        drawRow([
            booking._id.toString().substring(0, 8),
            `BDT ${ticket.price       || 0}`,
            'BDT 0',
            'BDT 0',
            `BDT ${booking.totalPrice || 0}`,
            'Stripe',
            `${payDateStr}\n${payTimeStr}`,
        ], payW, 12);

        y += 12;

        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 7;

        
        const qrData = `Ticket ID: ${booking._id}\nUser: ${userDetails?.email || booking?.userEmail}\nPayment: ${payDateStr} ${payTimeStr}\nJourney: ${ticket.from} to ${ticket.to}\nDate: ${depDate} ${depTime}`;
        const qrCodeDataUrl = await QRCode.toDataURL(qrData, { margin: 1 });
        
        const qrSize = 35;
        doc.addImage(qrCodeDataUrl, 'PNG', (pageWidth - qrSize) / 2, y + 2, qrSize, qrSize);
        y += qrSize + 8;

        doc.setFont('lora', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        [
            'Transitly. All rights reserved.',
            'Ticket cancellation available up to 24 hours before departure.',
            'Refunds are subjected to individual bus vendor policies.',
            'Must show this ticket during check in.',
        ].forEach(line => {
            doc.text(line, pageWidth / 2, y, { align: 'center' });
            y += 5;
        });

        const fileName = `Ticket_${booking._id.toString().substring(0, 8)}.pdf`;
        doc.save(fileName);
        window.open(URL.createObjectURL(doc.output('blob')), '_blank');

    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};

export default generateTicketPDF;