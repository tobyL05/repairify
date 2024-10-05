import React, { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { MdOutlineFileUpload } from "react-icons/md";

interface props {
    className: string
}

const FileUploadButton = ({ className } : props) => {
  // Create a reference for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file change event
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Safely access files
    if (file) {
      console.log('Selected file:', file);
      // You can handle the file (e.g., upload it to a server) here
    }
  };

  // Trigger the file input click when the button is clicked
  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger the hidden file input's click
  };

  return (
    <div className={twMerge('',className)}>
      {/* Hidden file input element */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Button to trigger file input */}
      <button onClick={handleButtonClick}>
        <MdOutlineFileUpload size={25} />
      </button>
    </div>
  );
};

export default FileUploadButton;
