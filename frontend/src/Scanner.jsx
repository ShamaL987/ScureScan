import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

const QRScanner = (props) => {
  const videoElementRef = useRef(null);
  const [scanned, setScannedText] = useState('');

  useEffect(() => {
    const video = videoElementRef.current;
    const qrScanner = new QrScanner(video, result => {
      console.log('decoded qr code:', result);
      setScannedText(result.data);
    }, {
      returnDetailedScanResult: true,
      highlightScanRegion: true,
      highlightCodeOutline: true,
    });
    qrScanner.start();
    console.log('start');

    return () => {
      console.log(qrScanner);
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  return (
    <div>
      <div className="videoWrapper">
        <video className="qrVideo" ref={videoElementRef} />
      </div>
      <p className="scannedText">SCANNED: {scanned}</p>
    </div>
  );
};

export default QRScanner;
