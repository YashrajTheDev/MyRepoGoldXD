import React from 'react';
import jsPDF from 'jspdf';

function Invoice({ ownerId }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Invoice', 20, 20);
    doc.text(`Owner ID: ${ownerId}`, 20, 30);
    // Add more details
    doc.save('invoice.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF}>Download Invoice</button>
    </div>
  );
}

export default Invoice;
