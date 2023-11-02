import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { FaTimes, FaArrowDown, FaQrcode } from "react-icons/fa";

const QrCodeCard = () => {
  const [url, setUrl] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", variant: "blue" });

  const qrCodeGenerate = () => {
    try {
      if (!url) throw new Error("Enter the URL");
      QRCode.toDataURL(url, { width: 300 }, (err, qrDataUrl) => {
        if (err) throw new Error(err);
        setDataUrl(qrDataUrl);
      });
    } catch (error) {
      setAlert({ show: true, message: error.message, variant: "red" });
    }
  };

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => setAlert({ show: false, message: "", variant: "blue" }), 5000);
    }
  }, [alert]);

  const clear = () => {
    setUrl("");
    setDataUrl("");
  };

  return (
    <div className="container">
      <div className="qr-code">
        {dataUrl ? (
          <img src={dataUrl} alt="qr-code" />
        ) : (
          <div className="qr-code-placeholder">
            <div className="text">
              <span>Your QR</span>
              <h2>Generator</h2>
            </div>
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          type="url"
          placeholder="Enter a valid URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") qrCodeGenerate();
          }}
        />
      </div>
      <div className="buttons">
        {dataUrl ? (
          <div className="clear-and-download">
            <button onClick={clear} className="clear-button">
              Clear
            </button>
            <a download="qrCode.png" href={dataUrl} className="download-button">
              Download
            </a>
          </div>
        ) : (
          <button onClick={qrCodeGenerate} className="generate-button">
            Generate
          </button>
        )}
      </div>
      {alert.show && (
        <div className={`alert ${alert.variant}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <span>{alert.message}</span>
        </div>
      )}
    </div>
  );
};

export default QrCodeCard;
