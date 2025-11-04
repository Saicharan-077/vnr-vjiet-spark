import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface CertificateProps {
  eventTitle: string;
  eventDate: string;
  club: string;
  participantName?: string;
}

const CertificateGenerator = ({ eventTitle, eventDate, club, participantName = "Participant" }: CertificateProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 800;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#1a1f2e");
    gradient.addColorStop(0.5, "#2d3748");
    gradient.addColorStop(1, "#1a365d");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Inner border
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 3;
    ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 60px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFICATE OF PARTICIPATION", canvas.width / 2, 150);

    // College name
    ctx.font = "32px Poppins, sans-serif";
    ctx.fillStyle = "#3b82f6";
    ctx.fillText("VNR VIGNANA JYOTHI INSTITUTE OF ENGINEERING & TECHNOLOGY", canvas.width / 2, 210);

    // Decorative line
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, 240);
    ctx.lineTo(900, 240);
    ctx.stroke();

    // This certifies text
    ctx.fillStyle = "#e5e7eb";
    ctx.font = "28px Poppins, sans-serif";
    ctx.fillText("This certificate is proudly presented to", canvas.width / 2, 320);

    // Participant name
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px Poppins, sans-serif";
    ctx.fillText(participantName, canvas.width / 2, 400);

    // Underline for name
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const nameWidth = ctx.measureText(participantName).width;
    ctx.moveTo((canvas.width - nameWidth) / 2, 415);
    ctx.lineTo((canvas.width + nameWidth) / 2, 415);
    ctx.stroke();

    // For participating text
    ctx.fillStyle = "#e5e7eb";
    ctx.font = "26px Poppins, sans-serif";
    ctx.fillText("for participating in", canvas.width / 2, 470);

    // Event title
    ctx.fillStyle = "#f97316";
    ctx.font = "bold 38px Poppins, sans-serif";
    ctx.fillText(eventTitle, canvas.width / 2, 530);

    // Event details
    ctx.fillStyle = "#e5e7eb";
    ctx.font = "24px Poppins, sans-serif";
    ctx.fillText(`Organized by ${club}`, canvas.width / 2, 580);
    ctx.fillText(`Date: ${eventDate}`, canvas.width / 2, 620);

    // Signature lines
    ctx.strokeStyle = "#6b7280";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(200, 720);
    ctx.lineTo(400, 720);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(800, 720);
    ctx.lineTo(1000, 720);
    ctx.stroke();

    ctx.fillStyle = "#9ca3af";
    ctx.font = "18px Poppins, sans-serif";
    ctx.fillText("Coordinator", 300, 750);
    ctx.fillText("Director", 900, 750);

    // Download the certificate
    const link = document.createElement("a");
    link.download = `${eventTitle.replace(/\s+/g, "_")}_Certificate.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Button
        onClick={generateCertificate}
        className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary"
        size="lg"
      >
        <Download className="mr-2 h-5 w-5" />
        Download Certificate
      </Button>
    </>
  );
};

export default CertificateGenerator;
